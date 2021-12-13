import { GetSnippets } from '../../query/snippets';
import type { GetSnippetsResponse } from '../../query/snippets';
import { query } from 'svelte-apollo';
import type { ReadableQuery } from 'svelte-apollo';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

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
