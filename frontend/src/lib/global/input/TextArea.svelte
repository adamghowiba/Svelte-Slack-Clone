<script lang="ts">
	import Icon from "@iconify/svelte";

	export let placeholder = "Search";
	export let value: string;
	export let height = "auto";
	export let label = null;
	export let autoFocus: boolean = false;

	let focused: boolean = autoFocus;
</script>

<div class="wrapper">
	{#if label}
		<label for={label}>{label}</label>
	{/if}
	<div class="input-wrap" class:focused-input={focused}>
		<!-- svelte-ignore a11y-autofocus -->
		<textarea
			{placeholder}
			style="--height: {height};"
			{autoFocus}
			on:focus={() => (focused = true)}
			on:blur={() => (focused = false)}
			bind:value />
	</div>
</div>

<style lang="scss">
	textarea {
		position: relative;
		z-index: 30;
		border-radius: inherit;
		padding: 8px 7px;
		appearance: none;
		min-height: var(--height, auto);
		border: none;
		width: 100%;
		outline: none;
		background-color: inherit;
		color: var(--color-gray-s2);
		font-weight: var(--fw-md);
		font-size: 15px;
		border-radius: 3px;
		resize: none;

		&::placeholder {
			color: var(--color-gray-s4);
		}
	}

	.input-wrap {
		border: 1px solid rgba(255, 255, 255, 0.247);
	}

	label {
		display: block;
		margin-bottom: 0.6rem;
		text-transform: capitalize;
		font-size: 15px;
		color: #d1d2d3;
		font-weight: var(--fw-bold);
	}
</style>
