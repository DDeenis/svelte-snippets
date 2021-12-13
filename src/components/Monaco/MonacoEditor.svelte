<script lang="ts">
	import type monaco from 'monaco-editor';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let language: string;
	export let value: Writable<string>;

	let divEl: HTMLDivElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	onMount(async () => {
		Monaco = await import('monaco-editor');

		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker(_, label) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			},
		};

		editor = Monaco.editor.create(divEl, {
			language: language || 'javascript',
			theme: 'vs-dark',
		});

		return () => {
			editor.dispose();
		};
	});

	$: {
		if (Monaco) {
			Monaco.editor.setModelLanguage(editor.getModel(), language);
		}
	}
</script>

<div bind:this={divEl} class="code-editor" on:change={() => value.set(editor.getValue())} />

<style>
	.code-editor {
		width: 100%;
		height: 100%;
		min-height: 50vh;
		max-height: 60vh;
	}
</style>
