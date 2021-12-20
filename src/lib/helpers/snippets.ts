import { CreateSnippet, GetSnippets } from '../../query/snippets';
import { mutation, query } from 'svelte-apollo';
import { writable } from 'svelte/store';
import type {
	GetSnippetsResponse,
	CreateSnippetRequest,
	CreateSnippetResponse,
} from '../../query/snippets';
import type { ReadableQuery } from 'svelte-apollo';
import type { Writable } from 'svelte/store';
import type { GQLAddSnippetInput } from 'src/graphql.schema';

interface PagedSnippetsOptions {
	first?: number;
	offset?: number;
}

interface PagedSnippetsResponse {
	snippets: ReadableQuery<GetSnippetsResponse>;
	hasMore: Writable<boolean>;
	fetchMore: (offset: number) => () => void;
}

const defaultFirst = 10;
const defaultOffset = 0;
const hasMore = writable(true);

export const pagedSnippets = (options?: PagedSnippetsOptions): PagedSnippetsResponse => {
	const first = options?.first ?? defaultFirst;
	const offset = options?.offset ?? defaultOffset;
	const snippets = query<GetSnippetsResponse>(GetSnippets, {
		variables: {
			first,
			offset,
		},
	});

	const fetchMore = (offset: number) => () => {
		snippets
			.fetchMore({
				variables: {
					first,
					offset,
				},
			})
			.then((response) => {
				const chunk = response.data.querySnippet;

				if (chunk?.length < first) {
					hasMore.set(false);
				}
			});
	};

	return {
		snippets,
		hasMore,
		fetchMore,
	};
};

export const createSnippet = () => {
	const create = mutation<CreateSnippetResponse, CreateSnippetRequest>(CreateSnippet);

	return async (snippet: GQLAddSnippetInput) => {
		const createdSnippet = await create({
			variables: {
				input: [snippet],
			},
		});

		return createdSnippet;
	};
};
