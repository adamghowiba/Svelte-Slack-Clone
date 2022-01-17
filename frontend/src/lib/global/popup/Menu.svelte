<script lang="ts">
	import { clickOutside } from "$lib/utils/clickOutside";
	import MenuItem from "$lib/global/popup/MenuItem.svelte";

	export let active: boolean = false;
	export let xLocation: number;
	export let yLocation: number;
</script>

{#if active}
	<div
		class="menu"
		style="--xLocation: {xLocation}px; --yLocation: {yLocation}px;"
		use:clickOutside={() => (active = false)}>
		<MenuItem seperator>Open in split view</MenuItem>
		<MenuItem>Change notifications</MenuItem>
		<MenuItem seperator>Mute channel</MenuItem>
		<MenuItem>Copy name</MenuItem>
		<MenuItem seperator>Copy link</MenuItem>
		<MenuItem seperator>Move channel</MenuItem>
		<MenuItem>Open channel details</MenuItem>
		<MenuItem danger seperator>Leave channel</MenuItem>
		<MenuItem>Create new section</MenuItem>
		<MenuItem>Edit sidebar</MenuItem>
	</div>
{/if}

<style lang="scss">
	.menu {
		border-radius: 5px;
		position: fixed;
		background-color: #222529;
		box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
		border: 1px solid var(--color-tran);
		color: white;
		z-index: 10;
		left: var(--xLocation);
		top: var(--yLocation);
		padding: 9px 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
		transform: translateY(-100%);
	}
</style>
