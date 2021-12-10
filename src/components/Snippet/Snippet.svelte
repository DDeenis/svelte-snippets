<script lang="ts">
	import { Accordion, AccordionItem } from 'svelte-accessible-accordion';
	import type { Snippet } from '../../query/snippets';

	export let snippet: Snippet;

	const prismLangClassName = `language-${snippet.Language.name.toLowerCase()}`;
</script>

<div class="snippet-wrapper">
	<div class="space-between">
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
	}

	.space-between {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.snippet__info-text {
		box-sizing: border-box;
		font-size: 1rem;
		background-color: #ecc94b;
		padding: 5px 10px;
		border-radius: 1.75rem;
		color: #000;
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
