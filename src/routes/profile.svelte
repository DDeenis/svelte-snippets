<script>
	import { user } from '$lib/auth';
</script>

<div class="wrapper">
	<span class="title">Edit your site profile</span>
	<div class="info-wrapper">
		<div class="info-entry">
			<span class="subtile">First name</span>
			<span class="info">{$user.name}</span>
		</div>
		<div class="info-entry">
			<span class="subtile">Last name</span>
			<span class="info">{$user.middle_name}</span>
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
</style>
