<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import MenuItem from "./MenuItem.svelte";
	import NewMenu from "./NewMenu.svelte";

	type SubMenuSide = "left" | "right";

	export let label: string;
	export let width: string = "auto";
	export let side: SubMenuSide = "right";
</script>

<div class="submenu">
	<div class="submenu__label">
		{label}
		<Icon icon="akar-icons:chevron-down" color="white" width={16} height={16} />
	</div>
	<div class="submenu__menu" class:side--left={side == "left"}>
		<NewMenu top="0" {width}>
			<slot />
		</NewMenu>
	</div>
</div>

<style lang="scss">
	.submenu {
		position: relative;
		padding: 4px 30px;

		&:hover &__menu {
			display: block;
		}

		&__label {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			position: relative;
		}
		&__menu {
			height: 100%;
			display: none;
			position: absolute;
			left: 100%;
			top: -10px;
		}

		&__menu.side--left {
			left: 0;
		}
	}
</style>
