<script lang="ts">
	import { goto } from "$app/navigation";
	import { session } from "$app/stores";

	import Button from "$lib/global/Button.svelte";
	import TextInput from "$lib/global/TextInput.svelte";

	let value: string;
	let status = {
		error: null,
		success: null
	};
	let querying = false;

	const loginUser = async () => {
		status.error = null;
		status.success = null;
		querying = true;

		const response = await fetch("http://localhost:5000/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username: value })
		});
		const result = await response.json();
		querying = false;

		if (!response.ok) return (status.error = result.message);

		goto("/chat");
		status.success = "Sucessful login. Redirecting...";
	};
</script>

<div class="wrap">
	{#if status.error || status.success}
		<div
			class="status"
			class:error={status.error}
			class:success={status.success}
			on:click={() => (status.error = null)}>
			<p>{status.success || status.error}</p>
		</div>
	{/if}
	<h3>Welcome To SaberChat!</h3>
	<p>Enter your name to begin</p>

	<div class="body">
		<TextInput name="username" bind:value label="username or name" />
		<Button on:click={loginUser} type="button">
			{#if querying}
				Loading...
			{:else}
				Enter Room
			{/if}
		</Button>
	</div>
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		width: 470px;
		height: auto;
		padding: 2.5rem 2rem;
		background-color: var(--color-black-s1);
		border-radius: 4px;
		gap: 4px;

		.body {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
			margin-top: 1.5rem;
		}
	}
	.status {
		color: white;
		padding: 10px;
		margin-bottom: 15px;
		border-radius: 3px;
	}
	.error {
		background-color: rgb(243, 75, 63);
	}
	.success {
		background-color: rgb(25, 197, 82);
	}
</style>
