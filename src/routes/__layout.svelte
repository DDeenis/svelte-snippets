<script>
	import Navigation from '../components/Snippet/Layout/Navigation.svelte';
</script>

<div class="wrapper">
	<Navigation />
	<slot />
</div>

<svelte:head>
	<title>Snippets app</title>
</svelte:head>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.wrapper {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		background-color: #c53030;
		padding: 2rem 1rem;
	}
</style>
