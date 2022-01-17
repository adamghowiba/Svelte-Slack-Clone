<script lang="ts">
	import { notifcations } from "$lib/stores";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

	export let message: string;
	export let username: string;
	export let id: number;

	let active = true;
	const closeNotifcation = () => {};

	const timeout = setTimeout(() => {
		active = false;
		console.log("trying to clear", id, timeout);
		notifcations.update((state) => {
			state.shift();
			return state;
		});
	}, 5000);
</script>

<div class="notifcation" on:click={closeNotifcation}>
	<h5>{username}</h5>
	<p>{message}</p>
</div>

<style lang="scss">
	.notifcation {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		background-color: var(--color-black-s3);
		padding: 1rem 1.5rem;
		min-width: 300px;
		max-width: 300px;
		border-radius: 7px;

		h5 {
			color: var(--color-blue);
		}
	}
</style>
