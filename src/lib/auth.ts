import createAuth0Client from '@auth0/auth0-spa-js';
import type { Auth0Client, Auth0ClientOptions, User } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';
import secrets from './secrets';

export const isAuthenticated = writable<boolean>(false);
export const popupOpen = writable<boolean>(false);
export const user = writable<User>({});
export const error = writable<string>();

async function createClient(): Promise<Auth0Client> {
	const auth0Client = await createAuth0Client({
		domain: secrets.AUTH0_DOMAIN,
		client_id: secrets.AUTH0_CLIENT_ID,
	});

	return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options?: Auth0ClientOptions): Promise<void> {
	popupOpen.set(true);
	try {
		await client.loginWithPopup(options);

		user.set(await client.getUser());
		isAuthenticated.set(true);
	} catch (e) {
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

function logout(client: Auth0Client): void | Promise<void> {
	return client.logout();
}

export const auth = {
	createClient,
	loginWithPopup,
	logout,
};
