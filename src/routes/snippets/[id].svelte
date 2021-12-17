<script lang="ts">
	import type { GetSnippetResponse, GetSnippetRequest } from '../../query/snippets';
	import { GetSnippet } from '../../query/snippets';
	import { query } from 'svelte-apollo';
	import { page } from '$app/stores';
	import ButtonsGroup from '../../components/Common/ButtonsGroup.svelte';
	import Button from '../../components/Common/Button.svelte';
	import { mdiArrowLeft } from '@mdi/js';
	import { goto } from '$app/navigation';

	const { id } = $page.params;
	const snippetQuery = query<GetSnippetResponse, GetSnippetRequest>(GetSnippet, {
		variables: {
			id,
		},
	});
	let snippet;

	$: snippet = $snippetQuery.data?.getSnippet;
</script>

<div class="wrapper">
	<div class="snippet-head-info">
		<span class="snippet__info-text">{snippet?.Language?.name}</span>
		<a class="snippet__info-text" href="/user/{snippet?.User?.id}">
			{`${snippet?.User?.firstName} ${snippet?.User?.lastName ?? ''}`}
		</a>
	</div>
	<ButtonsGroup>
		<Button label="Back" icon={mdiArrowLeft} click={() => goto('/')} />
	</ButtonsGroup>
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
</style>
