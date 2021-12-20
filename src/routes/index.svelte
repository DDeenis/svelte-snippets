<script lang="ts">
	import { onMount } from 'svelte';
	import { pagedSnippets } from '$lib/helpers/snippets';
	import SnippetsList from '../components/Snippet/SnippetsList.svelte';
	import Prism from 'prismjs';

	const { snippets, fetchMore, hasMore } = pagedSnippets();

	const handleFetchMore = (offset: number) => {
		return fetchMore(offset);
	};

	let highlightInterval: NodeJS.Timer;
	onMount(() => {
		highlightInterval = setInterval(() => {
			if ($snippets.data?.querySnippet) {
				Prism.highlightAll();
				clearInterval(highlightInterval);
			}
		}, 500);
	});
</script>

<svelte:head>
	<title>Snippets app</title>
</svelte:head>

<SnippetsList
	{snippets}
	fetchMore={handleFetchMore($snippets.data?.querySnippet?.length)}
	hasMore={$hasMore}
/>
