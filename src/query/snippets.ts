import { gql } from '@apollo/client/core';

export interface Snippet {
	id: string;
	name: string;
	code?: string;
}

export const SnippetFragment = gql`
	fragment SnippetFragment on Snippet {
		id
		name
		code
	}
`;

export const SnippetsQuery = gql`
	query getSnippets($filter: SnippetFilter, $first: Int, $offset: Int) {
		querySnippet(filter: $filter, first: $first, offset: $offset) {
			...SnippetFragment
		}
	}

	${SnippetFragment}
`;
