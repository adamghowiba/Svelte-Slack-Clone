<script lang="ts">
import { overlay } from "$lib/store/interface";

	import { clickOutside } from "$lib/utils/clickOutside";
	import { createEventDispatcher, onMount } from "svelte";

	// export let active: boolean = false;
	export let top: string = null;
	export let bottom: string = null;
	export let left: string = null;
	export let right: string = null;
	export let width: string = null;

	const dispatch = createEventDispatcher();

	let menuElement: HTMLElement;
	onMount(() => {});
</script>

<div
	class="menu"
	style="--top: {top}; --bottom: {bottom}; --width: {width}; --left: {left}; --right: {right};"
	bind:this={menuElement}
	use:clickOutside={() => {
		// $overlay = false;
		dispatch("closeModal");
	}}>
	<slot />
</div>

<style lang="scss">
	.menu {
		border-radius: 5px;
		position: absolute;
		background-color: #222529;
		box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
		border: 1px solid var(--color-tran);
		color: white;
		z-index: 10;
		top: var(--top);
		left: var(--left);
		bottom: var(--bottom);
		right: var(--right);
		width: var(--width);
		min-width: 250px;
		padding: 9px 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
