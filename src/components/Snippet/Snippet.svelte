<script lang="ts">
	import { Accordion, AccordionItem } from 'svelte-accessible-accordion';
	import { fade } from 'svelte/transition';
	import type { Snippet } from '../../query/snippets';

	export let snippet: Snippet;

	const prismLangClassName = `language-${snippet.Language.name.toLowerCase()}`;
</script>

<div transition:fade class="snippet-wrapper">
	<div class="snippet-head-info">
		<span class="snippet__info-text">{snippet.Language.name}</span>
		<a class="snippet__info-text" href="/user/{snippet.User.id}"
			>{`${snippet.User.firstName} ${snippet.User.lastName ?? ''}`}</a
		>
	</div>
	<div class="snippet-title">
		<a class="snippet-title__text" href="/snippets/{snippet.id}">{snippet.name}</a>
	</div>
	<Accordion>
		<AccordionItem title="Show code">
			<pre style="margin: 0" class={prismLangClassName}>
				<code>{snippet.code}</code>
			</pre>
		</AccordionItem>
	</Accordion>
</div>

<style>
	a {
		text-decoration: none;
	}

	.snippet-wrapper {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
		max-width: 500px;
		padding: min(1rem, 3vw) min(2rem, 4vw);
		margin: 0 auto;
		background-color: #f6e05e;
		border-radius: 0.75rem;
		font-family: Arial, Helvetica, sans-serif;
		box-shadow: var(--box-shadow-sm);
	}

	.snippet-title {
		background-color: #975a16;
		width: 100%;
		padding: 10px 0;
		border-radius: 0.75rem;
		text-align: center;
	}

	.snippet-title__text {
		font-size: 1.125rem;
		font-weight: 500;
		color: #feebc8;
	}

	:global([data-accordion]) {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	:global([data-accordion-item] button) {
		background: #ecc94b;
		border: 0;
		border-radius: 0.375rem 0.375rem 0 0;
		box-sizing: border-box;
		padding: 10px;
		margin-top: 10px;
		cursor: pointer;
		width: 100%;
		text-align: left;
		font-size: 1rem;
		font-weight: 500;
	}

	:global([data-accordion-item] button[disabled]) {
		cursor: not-allowed;
	}
</style>
