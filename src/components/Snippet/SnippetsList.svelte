<script lang="ts">
	import InfiniteScroll from 'svelte-infinite-scroll';
	import type { ReadableQuery } from 'svelte-apollo';
	import Snippet from './Snippet.svelte';
	import type { GetSnippetsResponse } from '../../query/snippets';

	export let snippets: ReadableQuery<GetSnippetsResponse>;
	export let fetchMore: () => void;
	export let hasMore: boolean;
</script>

{#if $snippets.loading}
	Loading...
{:else if $snippets.error}
	Error: {$snippets.error}
{:else if $snippets.data?.querySnippet}
	<div class="snippets-list">
		{#each $snippets.data?.querySnippet as snippet}
			<Snippet {snippet} />
		{/each}
		<InfiniteScroll
			on:loadMore={fetchMore}
			{hasMore}
			horizontal={false}
			threshold={0}
			reverse={false}
			window={true}
			elementScroll={null}
		/>
	</div>
{/if}

<style>
	.snippets-list {
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(2, 530px);
		place-content: center;
		gap: 1.5rem;
		padding: 2.5rem 0;
	}

	@media (max-width: 1200px) {
		.snippets-list {
			grid-template-columns: 1fr;
		}
	}
</style>
