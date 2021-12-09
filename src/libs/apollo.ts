import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
// import { config } from 'dotenv';

// config();

const httpLink = new HttpLink({
	uri: 'https://nameless-brook-310053.eu-central-1.aws.cloud.dgraph.io/graphql',
	headers: {},
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		);
	}

	if (networkError) {
		console.log(`[Network error]: ${networkError}. Backend is unreachable.`);
	}
});

export const client = new ApolloClient({
	ssrMode: typeof window === 'undefined',
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
});
