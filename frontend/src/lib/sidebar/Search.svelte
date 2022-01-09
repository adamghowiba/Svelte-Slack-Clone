<script lang="ts">
	import Icon from "@iconify/svelte";

	export let placeholder = "Search";
	export let color = "var(--color-black-s1)";
	export let icon = true;
	export let value: string;
</script>

<div class="wrap" style="--color: {color}">
	{#if icon}
		<div class="icon">
			<Icon icon="akar-icons:search" color="inherit" />
		</div>
	{/if}
	<input type="text" name="chat-search" {placeholder} bind:value />
</div>

<style lang="scss">
	.wrap {
		width: 100%;
		height: min-content;
		position: relative;
		display: flex;
		background-color: var(--color, --color-black-s1);
		color: var(--color-gray-s4);
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
		padding: 7px;
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
</style>
