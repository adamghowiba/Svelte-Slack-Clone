<script lang="ts">
	import Icon from "@iconify/svelte";
	import Popup from "./Popup.svelte";

	export let title;
	export let addable = true;
</script>

<div class="wrap">
	<slot name="popup" />
	<header>
		<!-- <Popup /> -->
		<h6>{title}</h6>
		{#if addable}
			<Icon icon="akar-icons:plus" width="20px" height="20px" color="var(--color-gray-s2)" />
		{/if}
	</header>
	<slot />
</div>

<style lang="scss">
	.wrap {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
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
