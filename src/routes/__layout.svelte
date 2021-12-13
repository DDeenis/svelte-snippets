<script>
	import { onMount } from 'svelte';
	import { setClient } from 'svelte-apollo';
	import { auth, isAuthenticated, user } from '$lib/auth';
	import { client } from '$lib/apollo';
	import Navigation from '../components/Layout/Navigation.svelte';

	setClient(client);

	let auth0Client;
	onMount(async () => {
		auth0Client = await auth.createClient();

		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<div class="wrapper">
	<Navigation {isAuthenticated} {login} {logout} />
	<slot />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #c53030;
	}

	.wrapper {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 2rem 1rem;
	}
</style>
