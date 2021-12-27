<script>
	import { goto } from '$app/navigation';

	import { isAuthenticated, user } from '$lib/auth';
	import { updateUser } from '$lib/helpers/user';
	import { mdiCancel, mdiCheckCircleOutline, mdiPencil } from '@mdi/js';
	import { onMount } from 'svelte';
	import Button from '../components/Common/Button.svelte';
	import ButtonsGroup from '../components/Common/ButtonsGroup.svelte';

	let isEditing = false;
	const initialUserData = { ...$user };
	let formElem;

	const editProfile = () => (isEditing = true);
	const discardChanges = () => {
		isEditing = false;
		$user = initialUserData;
	};
	const handleUpdateUser = () => {
		updateUser({
			firstName: $user.name,
			lastName: $user.middle_name,
		});
	};
	const dispatchSubmitEvent = () => {
		const event = new SubmitEvent('submit');
		formElem.dispatchEvent(event);
	};

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/');
		}
	});
</script>

<div class="wrapper">
	<span class="title">Edit your site profile</span>
	{#if !isEditing}
		<div class="info-wrapper">
			<div class="basic-info-wrapper">
				<img src={$user.picture} alt="avatar" class="avatar" />
				<div class="basic-info">
					<div class="info-entry">
						<span class="subtile">First name</span>
						<span class="info">{$user.name}</span>
					</div>
					<div class="info-entry">
						<span class="subtile">Last name</span>
						<span class="info">{$user.middle_name}</span>
					</div>
				</div>
			</div>
			<div class="info-entry">
				<span class="subtile">Email ({$user.email_verified ? 'verified' : 'not verified'})</span>
				<span class="info">{$user.email}</span>
			</div>
			<div class="info-entry">
				<span class="subtile">User id</span>
				<span class="info">{$user.sub}</span>
			</div>
		</div>
	{:else}
		<form class="info-wrapper" bind:this={formElem} on:submit|preventDefault={handleUpdateUser}>
			<div class="basic-info-wrapper">
				<img src={$user.picture} alt="avatar" class="avatar" />
				<div class="basic-info">
					<div class="info-entry">
						<span class="subtile">First name</span>
						<input type="text" bind:value={$user.name} />
					</div>
					<div class="info-entry">
						<span class="subtile">Last name</span>
						<input type="text" bind:value={$user.middle_name} />
					</div>
				</div>
			</div>
			<div class="info-entry">
				<span class="subtile">Email ({$user.email_verified ? 'verified' : 'not verified'})</span>
				<input type="email" bind:value={$user.email} />
			</div>
			<div class="info-entry">
				<span class="subtile">User id</span>
				<span class="info">{$user.sub}</span>
			</div>
		</form>
	{/if}
	<ButtonsGroup>
		{#if isEditing}
			<Button
				label="Submit"
				type="submit"
				icon={mdiCheckCircleOutline}
				on:click={dispatchSubmitEvent}
			/>
		{/if}
		<Button
			label={isEditing ? 'Cancel' : 'Edit'}
			icon={isEditing ? mdiCancel : mdiPencil}
			type="button"
			on:click={isEditing ? discardChanges : editProfile}
		/>
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
		font-family: Arial, Helvetica, sans-serif;
	}

	.info-wrapper {
		margin: 15px 0;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.info-entry {
		display: flex;
		flex-direction: column;
		gap: 7px;
	}

	.title {
		font-size: 1.5rem;
		font-weight: 500;
	}

	.subtile {
		font-size: 1.1rem;
		font-weight: 500;
	}

	.info {
		font-size: 1rem;
	}

	.basic-info-wrapper {
		display: grid;
		grid-template-columns: 120px minmax(max-content, 100%);
		gap: min(9rem, 12vw);
	}

	.basic-info {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
	}

	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	input {
		border: 1.5px solid #975a16;
		border-radius: 0.25rem;
		background: transparent;
		max-width: 250px;
		width: 100%;
		box-sizing: border-box;
		padding: 5px 10px;
		font-size: 1rem;
		transition: border-color 0.3s ease-in;
	}

	input:hover,
	input:focus {
		border-color: #22543d;
		outline: none;
	}

	@media (max-width: 600px) {
		.basic-info-wrapper {
			grid-template-columns: none;
			grid-auto-flow: row;
		}
	}
</style>
