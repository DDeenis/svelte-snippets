<script lang="ts">
	import type { ReadableQuery } from 'svelte-apollo';
	import type { GetSnippetsResponse } from '../../query/snippets';
	import type { Snippet as SnippetType } from '../../query/snippets';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import Snippet from './Snippet.svelte';

	export let snippets: ReadableQuery<GetSnippetsResponse>;
	export let fetchMore: () => void;
	export let hasMore: boolean;
	export let filterFn: (snippets?: SnippetType[]) => SnippetType[] | undefined = undefined;

	let snippetsData: SnippetType[] | undefined;

	$: {
		snippetsData = filterFn ? filterFn($snippets.data?.querySnippet) : $snippets.data?.querySnippet;
	}
</script>

{#if $snippets.loading}
	Loading...
{:else if $snippets.error}
	Error: {$snippets.error}
{:else if snippetsData}
	<div class="snippets-list">
		{#each snippetsData as snippet}
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
