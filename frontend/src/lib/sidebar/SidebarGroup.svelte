<script lang="ts">
	import Icon from "@iconify/svelte";
	import { beforeUpdate } from "svelte";

	export let title: string;
	export let addable = true;

	beforeUpdate(() => {
		console.log("Updated state for", title);
	});
</script>

<div class="wrap">
	<slot name="popup" />
	<header>
		<h6>{title}</h6>
		{#if addable}
			<div class="popup__icon" on:click>
				<Icon icon="akar-icons:plus" width="20px" height="20px" color="var(--color-gray-s2)" />
			</div>
		{/if}
	</header>
	<slot />
</div>

<style lang="scss">
	.wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h6 {
			color: var(--color-gray-s4);
			font-weight: bold;
			letter-spacing: 0.25px;
			font-size: 14px;
			text-transform: uppercase;
		}
	}
</style>
