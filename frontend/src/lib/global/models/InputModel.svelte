<script lang="ts">
	import Search from "$lib/global/Search.svelte";
	import { createEventDispatcher } from "svelte";
	import Button from "$lib/global/buttons/Button.svelte";
	import TextArea from "../input/TextArea.svelte";
	import TextInput from "../input/TextInput.svelte";
	import Model from "./Model.svelte";
	import Loader from "../loaders/Loader.svelte";
	import Spinner from "../loaders/Spinner.svelte";

	type InputType = "textarea" | "text";

	export let desc: string = null;
	export let title: string = "Add people to #invirogen";
	export let inputType: InputType;
	export let placeholder: string = null;
	export let label: string = null;
	export let value: string;
	export let loading: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<Model on:closeModel>
	<h5 slot="header">{title}</h5>

	<div class="wrapper" slot="body">
		<div class="input">
			{#if inputType == "textarea"}
				<TextArea bind:value height="120px" {placeholder} {label} autoFocus={true} />
			{:else if inputType == "text"}
				<TextInput bind:value {label} autoFocus={true} />
			{/if}

			<slot name="dropdown" />
		</div>

		{#if desc}
			<span>{desc}</span>
		{/if}
	</div>

	<div class="actions" slot="footer">
		<slot name="actions">
			<Button type="button" on:click={() => dispatch("cancel", value)}>Cancel</Button>
			<Button type="button" on:click={() => dispatch("save", value)}>
				{#if loading}
					<Loader color="white" />
				{:else}
					Save Changes
				{/if}
			</Button>
		</slot>
	</div>
</Model>

<style lang="scss">
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
		gap: 0.25rem;
		z-index: 500;

		span {
			color: var(--color-gray-s4);
			margin-bottom: 1rem;
		}

		.input {
			position: relative;
		}
	}
	.actions {
		margin-top: auto;
		margin-left: auto;
		display: flex;
		justify-content: flex-end;
		gap: 0.8rem;
		padding: 1.5rem 0;
	}
	h5 {
		color: var(--color-gray-s3);
		font-weight: bold;
	}
</style>
