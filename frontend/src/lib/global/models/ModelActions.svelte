<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import Button from "../buttons/Button.svelte";
	import Loader from "../loaders/Loader.svelte";

	const dispatch = createEventDispatcher();

	export let loading: boolean = false;
</script>

<div class="actions">
	<slot>
		<Button type="button" on:click={() => dispatch("cancel")}>Cancel</Button>
		<Button type="button" on:click={() => dispatch("save")}>
			{#if loading}
				<Loader color="white" />
			{:else}
				Save Changes
			{/if}
		</Button>
	</slot>
</div>

<style lang="scss">
	.actions {
		margin-top: auto;
		margin-left: auto;
		display: flex;
		justify-content: flex-end;
		gap: 0.8rem;
		padding: 1.5rem 0;
	}
</style>
