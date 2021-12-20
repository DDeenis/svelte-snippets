<script lang="ts">
	import type { GetSnippetResponse, GetSnippetRequest } from '../../query/snippets';
	import { GetSnippet } from '../../query/snippets';
	import { query } from 'svelte-apollo';
	import { page } from '$app/stores';
	import Button from '../../components/Common/Button.svelte';
	import { mdiArrowLeft } from '@mdi/js';
	import { goto } from '$app/navigation';
	import type { Snippet } from '../../query/snippets';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';

	const { id } = $page.params;
	const snippetQuery = query<GetSnippetResponse, GetSnippetRequest>(GetSnippet, {
		variables: {
			id,
		},
	});

	let snippet: Snippet | undefined;
	let prismLangClassName: string = `language-${snippet?.Language?.name?.toLowerCase()}`;

	let highlightInterval: NodeJS.Timer;
	onMount(() => {
		highlightInterval = setInterval(() => {
			if ($snippetQuery.data?.getSnippet) {
				Prism.highlightAll();
				clearInterval(highlightInterval);
			}
		}, 500);
	});

	$: snippet = $snippetQuery.data?.getSnippet;
	$: prismLangClassName = `language-${snippet?.Language?.name?.toLowerCase()}`;
</script>

<div class="wrapper">
	<div class="snippet-head-info">
		<span class="snippet__info-text">{snippet?.Language?.name}</span>
		<a class="snippet__info-text" href="/user/{snippet?.User?.id}">
			{`${snippet?.User?.firstName} ${snippet?.User?.lastName ?? ''}`}
		</a>
	</div>
	<div class="snippet__title-block">
		<h1>{snippet?.name}</h1>
	</div>
	<section class="code-section">
		<pre style="margin: 0" class={prismLangClassName}>
			<code>{snippet?.code}</code>
		</pre>
	</section>
	<div class="btn-bottom">
		<Button label="Back" icon={mdiArrowLeft} on:click={() => goto('/')} />
	</div>
</div>

<style>
	.wrapper {
		min-height: 80vh;
		max-width: 1000px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
		padding: min(1.75rem, 3vw) min(2.5rem, 4vw);
		box-sizing: border-box;
		border-radius: 0.75rem;
		background-color: #f6e05e;
		box-shadow: var(--box-shadow-md);
	}

	.btn-bottom {
		justify-self: flex-end;
		align-self: flex-end;
	}

	.snippet__info-text {
		font-family: Arial, Helvetica, sans-serif;
		box-sizing: border-box;
		font-size: 1rem;
		background-color: #ecc94b;
		padding: 10px;
		border-radius: 0.45rem;
		color: #000;
		text-decoration: none;
	}

	.snippet__title-block {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;
		background-color: #234e52;
		text-align: center;
		border-radius: 0.75rem;
	}

	.snippet__title-block h1 {
		font-size: 1.5rem;
		font-weight: 500;
		font-family: Arial, Helvetica, sans-serif;
		color: #fff;
		margin: 0;
	}
</style>
