<script lang="ts">
	export let initialValue = 0;
	let counter = initialValue;

	const incrementCounter = () => ++counter;
	const decrementCounter = () => --counter;
</script>

<div class="counter-wrapper">
	<span class="counter-text">{counter}</span>
	<button class="counter-btn" on:click={incrementCounter}>Increment</button>
	<button class="counter-btn" on:click={decrementCounter}>Decrement</button>
</div>

<style>
	.counter-wrapper {
		padding: 10px 15px;
		background-color: coral;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.counter-btn {
		border: 1px solid darkcyan;
		color: darkcyan;
		background-color: transparent;
		border-radius: 1.25rem;
		padding: 0.25rem;
		font-size: 1rem;
		cursor: pointer;
	}

	.counter-text {
		font-size: 2rem;
		font-weight: 500;
	}
</style>
