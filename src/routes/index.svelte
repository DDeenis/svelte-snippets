<script lang="ts">
	import { query, setClient } from 'svelte-apollo';
	import { client } from '../libs/apollo';
	import { GetSnippets, GetSnippetsResponse } from '../query/snippets';
	import Prism from 'prismjs';
	import Snippet from '../components/Snippet/Snippet.svelte';
	import 'prismjs/themes/prism-tomorrow.css';

	setClient(client);

	const snippets = query<GetSnippetsResponse>(GetSnippets);
</script>

{#if $snippets.loading}
	Loading...
{:else if $snippets.error}
	Error: {$snippets.error}
{:else}
	<div class="snippets-list">
		{#each $snippets.data.querySnippet as snippet}
			<Snippet {snippet} />
		{/each}
	</div>
{/if}

<style>
	.snippets-list {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(2, 530px);
		place-content: center;
		gap: 1.5rem;
		padding: 5rem 1rem;
	}

	@media (max-width: 1200px) {
		.snippets-list {
			grid-template-columns: 1fr;
		}
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #c53030;
	}
</style>
