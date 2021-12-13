<script lang="ts">
	import { onMount } from 'svelte';
	import { pagedSnippets } from '$lib/helpers/snippets';
	import SnippetsList from '../components/Snippet/SnippetsList.svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-typescript';

	const { snippets, fetchMore, hasMore } = pagedSnippets();

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

<svelte:head>
	<title>Snippets app</title>
</svelte:head>

<SnippetsList
	{snippets}
	fetchMore={fetchMore($snippets.data?.querySnippet?.length)}
	hasMore={$hasMore}
/>
