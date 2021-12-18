<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label: string;
	export let icon: string;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const dispatch = createEventDispatcher();

	const handleClick = () => dispatch('click', {});
</script>

<button {type} on:click={handleClick}>
	<svg width="24" height="24">
		<path d={icon} />
	</svg>
	{label}
</button>

<style>
	button {
		box-sizing: border-box;
		padding: 10px 15px;
		background-color: #ecc94b;
		border-radius: 0.75rem;
		font-size: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;
		border: none;
		max-width: 110px;
		height: max-content;
		max-height: 40px;
		cursor: pointer;
	}
</style>
