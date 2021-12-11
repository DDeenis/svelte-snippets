<script lang="ts">
	import { query, setClient } from 'svelte-apollo';
	import { client } from '$lib/apollo';
	import { GetSnippets, GetSnippetsResponse } from '../query/snippets';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import Snippet from '../components/Snippet/Snippet.svelte';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-typescript';

	setClient(client);

	const snippets = query<GetSnippetsResponse>(GetSnippets);

	let highlightInterval;
	onMount(() => {
		highlightInterval = setInterval(() => {
			Prism.highlightAll();
			if (!$snippets.loading && !$snippets.error) {
				Prism.highlightAll();
				clearInterval(highlightInterval);
			}
		}, 500);
	});
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
		padding: 5rem 0;
	}

	@media (max-width: 1200px) {
		.snippets-list {
			grid-template-columns: 1fr;
		}
	}
</style>
