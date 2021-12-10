<script lang="ts">
	import { query, setClient } from 'svelte-apollo';
	import { client } from '../libs/apollo';
	import Counter from '../components/Counter.svelte';
	import { GetSnippets, GetSnippetsResponse } from '../query/snippets';
	import 'chota';

	setClient(client);

	const snippets = query<GetSnippetsResponse>(GetSnippets);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#if $snippets.loading}
	Loading...
{:else if $snippets.error}
	Error: {$snippets.error}
{:else}
	<ul>
		{#each $snippets.data.querySnippet as snippet}
			<li>{snippet.name}</li>
		{/each}
	</ul>
{/if}
<Counter initialValue={10} />
