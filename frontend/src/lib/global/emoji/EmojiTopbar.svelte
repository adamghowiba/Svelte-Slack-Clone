<script lang="ts">
	import Search from "../Search.svelte";
	import { emoji } from "$lib/emoji_v2";
	import Icon from "@iconify/svelte";

	let selectedCategory: any;

	const emojiCatagoires = [
		{
			icon: "fe:clock",
			catagory: "all"
		},
		{
			icon: "gg:smile-mouth-open",
			catagory: "faces"
		},
		{
			icon: "bx:bx-leaf",
			catagory: "leaf"
		},
		{
			icon: "akar-icons:plane",
			catagory: "plane"
		},
		{
			icon: "cil:american-football",
			catagory: "sports"
		},
		{
			icon: "octicon:light-bulb-16",
			catagory: "light"
		}
	];
</script>

<div class="top-bar">
	<div class="options">
		{#each emojiCatagoires as icon}
			<div
				class="options__emoji"
				on:click={() => (selectedCategory = icon.catagory)}
				class:active={selectedCategory == icon.catagory}>
				<Icon icon={icon.icon} width={20} height={20} />
			</div>
		{/each}
	</div>

	<div class="search">
		<Search value="" />
	</div>
</div>

<style lang="scss">
	.top-bar {
		display: flex;
		top: 0px;
		z-index: 10;
		position: sticky;
		flex-direction: column;
		background-color: #1a1d21;
		border-radius: inherit;
		width: 100%;

		.search {
			margin: 10px 10px;
			border: 1px solid var(--color-tran);
		}
	}

	.options {
		display: flex;
		gap: 7px;
		border-bottom: 1px solid rgba(167, 167, 167, 0.151);

		&__emoji {
			display: flex;
			padding: 15px 0px;
			margin-left: 5px;
			justify-content: center;
			align-items: center;
			width: 35px;
			height: 29px;
			border-radius: 2px;
			border-bottom: 3px solid transparent;
		}

		&__emoji.active {
			border-bottom: 3px solid #007a5a;
		}
	}
</style>
