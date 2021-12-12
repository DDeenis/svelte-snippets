<script lang="ts">
	import { onMount } from 'svelte';
	import { usePagedSnippets } from '$lib/helpers/snippets';
	import SnippetsList from '../../components/Snippet/SnippetsList.svelte';
	import Prism from 'prismjs';
	import { user } from '$lib/auth';

	const { snippets, fetchMore, hasMore } = usePagedSnippets();

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
	<title>My Snippets</title>
</svelte:head>

<SnippetsList
	{snippets}
	filterFn={(snippets) => snippets?.filter((s) => s.User.userId == $user.sub)}
	fetchMore={fetchMore($snippets.data?.querySnippet?.length)}
	hasMore={$hasMore}
/>
