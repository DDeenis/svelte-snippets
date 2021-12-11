<script lang="ts">
	export let isAuthenticated;
	export let login;
	export let logout;

	import { page } from '$app/stores';
	import { routes } from '$lib/routes';

	const linkActive = 'color: #ECC94B;';
	const linkStyles: Record<string, string> = {};

	$: {
		for (const pathName in routes) {
			const path = routes[pathName];
			linkStyles[path] = path === $page.path ? linkActive : '';
		}
	}
</script>

<nav>
	<h1 class="title">Snippets</h1>
	<ul class="nav-list">
		<li>
			<a style={linkStyles[routes.allSnippets]} href="/">All Snippets</a>
		</li>
		{#if $isAuthenticated}
			<li>
				<a style={linkStyles[routes.mySnippets]} href="/snippets/personal">My Snippets</a>
			</li>
		{/if}
		{#if $isAuthenticated}
			<li>
				<a style={linkStyles[routes.createSnippet]} href="/snippets/create">Add Snippet</a>
			</li>
		{/if}
		{#if $isAuthenticated}
			<li>
				<a style={linkStyles[routes.profile]} href="/profile">My Profile</a>
			</li>
		{/if}
		<li>
			<span class="auth-btn" on:click={$isAuthenticated ? logout : login}>
				{$isAuthenticated ? 'Logout' : 'Login'}
			</span>
		</li>
	</ul>
</nav>

<style>
	nav {
		margin: 0 auto;
		width: 100%;
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
	}

	.title {
		margin: 0 0 1rem 0;
		color: #fff;
		font-size: 2.5rem;
		font-weight: 500;
	}

	.nav-list {
		list-style: none;
		margin: 0 auto;
		padding: 5px 10px;
		max-width: 500px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		gap: 15px;
	}

	.nav-list li a {
		color: #fefcbf;
		text-transform: capitalize;
		text-decoration: none;
	}

	.nav-list li a:hover {
		text-decoration: underline;
	}

	.auth-btn {
		color: #fefcbf;
		cursor: pointer;
	}

	.auth-btn:hover {
		text-decoration: underline;
	}
</style>
