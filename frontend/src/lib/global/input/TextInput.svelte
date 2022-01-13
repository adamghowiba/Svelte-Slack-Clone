<script lang="ts">
	import Icon from "@iconify/svelte";

	export let placeholder = "Search";
	export let color = "var(--color-black-s1)";
	export let icon = true;
	export let value: string;
	export let label = null;
	export let autoFocus: boolean = false;

	let focused: boolean = autoFocus;
</script>

<div class="wrapper">
	{#if label}
		<label for={label}>{label}</label>
	{/if}
	<div class="input-warp" style="--color: {color}" class:focused-input={focused}>
		{#if icon}
			<div class="icon">
				<Icon icon="akar-icons:search" color="inherit" />
			</div>
		{/if}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			on:blur={() => (focused = false)}
			on:focus={() => (focused = true)}
			{autoFocus}
			type="text"
			name="chat-search"
			{placeholder}
			bind:value />
	</div>
</div>

<style lang="scss">
	.input-warp {
		width: 100%;
		height: min-content;
		position: relative;
		display: flex;
		color: var(--color-gray-s4);
		border: 1px solid rgba(255, 255, 255, 0.247);
		border-radius: 3px;

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			color: inherit;
			padding: 0 8px;
		}
	}
	input {
		position: relative;
		z-index: 30;
		border-radius: inherit;
		padding: 12px 7px;
		appearance: none;
		border: none;
		width: 100%;
		height: 100%;
		outline: none;
		background-color: inherit;
		color: var(--color-gray-s2);
		font-weight: var(--fw-md);
		font-size: 15px;

		&::placeholder {
			color: var(--color-gray-s4);
		}
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
