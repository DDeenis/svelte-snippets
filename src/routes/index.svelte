<script lang="ts">
	import { onMount } from 'svelte';
	import { pagedSnippets, syntaxHighlight } from '$lib/helpers/snippets';
	import SnippetsList from '../components/Snippet/SnippetsList.svelte';

	const { snippets, fetchMore, hasMore } = pagedSnippets();
	const highlight = syntaxHighlight();

	const getCondition = () => !$snippets.loading && !$snippets.error;
	const handleFetchMore = (offset: number) => {
		highlight(getCondition);
		return fetchMore(offset);
	};
	onMount(() => highlight(getCondition));
</script>

<svelte:head>
	<title>Snippets app</title>
</svelte:head>

<SnippetsList
	{snippets}
	fetchMore={handleFetchMore($snippets.data?.querySnippet?.length)}
	hasMore={$hasMore}
/>
