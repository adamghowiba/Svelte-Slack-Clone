<script lang="ts">
	import { overlay } from "$lib/store/interface";
	import { clickOutside } from "$lib/utils/clickOutside";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
</script>

<div class="popup" use:clickOutside={() => dispatch("closeModel", true)}>
	<div class="exit" on:click={() => dispatch("closeModel", true)}><Icon icon="bi:x" width={30} height={30} /></div>
	<div class="header">
		<slot name="header" />
	</div>
	<slot name="body" />
	<div class="footer">
		<slot name="footer" />
	</div>
</div>

<style lang="scss">
	.popup {
		background-color: #222529;
		width: 100%;
		max-width: 600px;
		position: absolute;
		display: flex;
		flex-direction: column;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 500;
		border-radius: 7px;
		padding: 0 1.5rem;
	}
	.header {
		padding: 25px 0;
	}
	.footer {
		width: 100%;
	}
	.exit {
		position: absolute;
		top: 20px;
		right: 18px;
	}
</style>
