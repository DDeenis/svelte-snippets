<script lang="ts">
	import type { Snippet } from '../../query/snippets';

	export let snippet: Snippet;
</script>

<div class="snippet-wrapper">
	<div class="space-between">
		<span class="snippet__info-text">{snippet.Language.name}</span>
		<a class="snippet__info-text" href="/user/{snippet.User.id}"
			>{`${snippet.User.firstName} ${snippet.User.lastName ?? ''}`}</a
		>
	</div>
	<div class="snippet-title">
		<a class="snippet-title__text" href="/snippets/{snippet.id}">{snippet.name}</a>
	</div>
</div>

<style>
	a {
		text-decoration: none;
	}

	.snippet-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 600px;
		padding: 1rem 2rem;
		margin: 0 auto;
		background-color: #f6e05e;
		border-radius: 0.75rem;
		font-family: Arial, Helvetica, sans-serif;
	}

	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.snippet__info-text {
		font-size: 1rem;
		background-color: #ecc94b;
		padding: 5px 10px;
		border-radius: 1.75rem;
		color: #000;
	}

	.snippet-title {
		background-color: #975a16;
		width: 100%;
		padding: 10px 0;
		border-radius: 0.75rem;
		text-align: center;
	}

	.snippet-title__text {
		font-size: 1.125rem;
		font-weight: 500;
		color: #feebc8;
	}
</style>
