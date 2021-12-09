<script>
	import { setClient } from 'svelte-apollo';
	import { client } from '../libs/apollo';
	import Counter from '../components/Counter.svelte';
	import { SnippetsQuery, Snippet } from '../query/snippets';

	setClient(client);

	const snippets = client.query({
		query: SnippetsQuery,
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#await snippets then data}
	{#each data.data.querySnippet as snippet}
		<span>{snippet.name}</span>
	{/each}
{/await}
<Counter initialValue={10} />
