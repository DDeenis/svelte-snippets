<script lang="ts">
	import { writable } from 'svelte/store';

	import MonacoEditor from '../../components/Monaco/MonacoEditor.svelte';

	let name: string;
	let language = writable<string>('javascript');
	let code: string;
</script>

<form class="wrapper" on:submit|preventDefault={() => {}}>
	<input type="text" placeholder="Name" bind:value={name} />
	<input type="text" placeholder="Language" bind:value={$language} />
	<MonacoEditor language={$language} value={code} />
</form>

<style>
	.wrapper {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
