<script lang="ts">
	import { writable } from 'svelte/store';

	import MonacoEditor from '../../components/Monaco/MonacoEditor.svelte';

	let name: string;
	let language = writable<string>('javascript');
	let code: string;
</script>

<form class="wrapper" on:submit|preventDefault={() => {}}>
	<input class="input" type="text" placeholder="Name" bind:value={name} />
	<input class="input" type="text" placeholder="Language" bind:value={$language} />
	<MonacoEditor language={$language} value={code} />
</form>

<style>
	.wrapper {
		min-height: 60vh;
		max-width: 700px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 2rem;
		padding: min(1.75rem, 3vw) min(2.5rem, 4vw);
		border-radius: 0.75rem;
		background-color: #f6e05e;
	}

	.input {
		padding: 10px;
		background-color: transparent;
		border-radius: 0.35rem;
		border: 1px solid #744210;
		transition: border-color 0.2s ease;
		font-size: 1rem;
	}

	.input:hover {
		border-color: #b7791f;
	}

	.input:focus {
		outline: none;
	}

	.input::placeholder {
		color: rgba(0, 0, 0, 0.5);
	}
</style>
