<script lang="ts">
	import { query, setClient } from 'svelte-apollo';
	import { client } from '../libs/apollo';
	import { GetSnippets, GetSnippetsResponse } from '../query/snippets';
	import Snippet from '../components/Snippet/Snippet.svelte';

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
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		justify-content: center;
		align-items: center;
		padding: 5rem 1rem;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: #c53030;
	}
</style>
