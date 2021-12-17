<script lang="ts">
	import { languages } from '$lib/helpers/language';
	import { createSnippet } from '$lib/helpers/snippets';
	import { createUser, currentUser } from '$lib/helpers/user';
	import { goto } from '$app/navigation';
	import { mdiCheckBold } from '@mdi/js';
	import { writable } from 'svelte/store';
	import Button from '../../components/Common/Button.svelte';
	import ButtonsGroup from '../../components/Common/ButtonsGroup.svelte';
	import MonacoEditor from '../../components/Monaco/MonacoEditor.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/auth';
	import { snippetSchema } from '$lib/schema/snippets';

	let name: string;
	let language = writable<string>('JavaScript');
	let code = writable<string>('');
	let formError = writable<string>('');

	const langs = languages();
	const curUser = currentUser();
	const create = createSnippet();
	const tryCreateUser = createUser();

	const handleSubmit = () => {
		const snippetObj = {
			Language: {
				id: $langs.data.queryLanguage.find((l) => l.name === $language).id,
			},
			User: {
				id: $curUser.data.getUser.id,
			},
			name,
			code: $code,
		};

		const formData = {
			name,
			language: $language,
			code: $code,
		};

		try {
			snippetSchema.validateSync(formData);
			create(snippetObj).then(() => goto('/'));
		} catch (error) {
			const errorMessage = error.message[0].toUpperCase() + error.message.substring(1);
			formError.set(errorMessage);
		}
	};

	onMount(() => {
		if (!$curUser) {
			tryCreateUser({
				firstName: $user.name,
				lastName: $user.nickname,
				userId: $user.sub,
			});
		}
	});
</script>

<form class="wrapper" on:submit|preventDefault={handleSubmit}>
	<input class="input" type="text" placeholder="Name" bind:value={name} />
	{#if $langs.data?.queryLanguage}
		<select class="input" bind:value={$language}>
			{#each $langs.data.queryLanguage as lang}
				<option value={lang.name}>{lang.name}</option>
			{/each}
		</select>
	{/if}
	<MonacoEditor language={$language.toLowerCase()} value={code} />
	<span class="error-message">{$formError}</span>
	<ButtonsGroup>
		<Button label="Submit" type="submit" icon={mdiCheckBold} />
	</ButtonsGroup>
</form>

<style>
	.wrapper {
		min-height: 60vh;
		max-width: 800px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 2rem;
		padding: min(1.75rem, 3vw) min(2.5rem, 4vw);
		box-sizing: border-box;
		border-radius: 0.75rem;
		background-color: #f6e05e;
		box-shadow: var(--box-shadow-md);
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

	.input option {
		background-color: #ecc94b;
	}

	.error-message {
		font-size: 1rem;
		color: #e53e3e;
		font-weight: 600;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
