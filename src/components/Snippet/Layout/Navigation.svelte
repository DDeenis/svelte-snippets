<script lang="ts">
	export let isAuthenticated;
	export let login;
	export let logout;
</script>

<nav>
	<h1 class="title">Snippets</h1>
	<ul class="nav-list">
		<li>
			<a href="/">All Snippets</a>
		</li>
		<li>
			<a href="/snippets/personal">My Snippets</a>
		</li>
		<li>
			<a href="/snippets/create">Add Snippet</a>
		</li>
		<li>
			<a href="/profile">My Profile</a>
		</li>
		<li>
			<span class="auth-btn" on:click={$isAuthenticated ? logout : login}
				>{$isAuthenticated ? 'Logout' : 'Login'}</span
			>
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
	}

	.auth-btn {
		color: #fefcbf;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
