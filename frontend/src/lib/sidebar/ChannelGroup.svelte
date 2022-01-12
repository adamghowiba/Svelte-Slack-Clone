<script lang="ts">
	import Icon from "@iconify/svelte";

	export let groupName: string;
	const iconSize = 8.5;
	let expanded = true;

	const toggleSidebarExpanded = () => {
		expanded = !expanded;
	};
</script>

<div class="wrap">
	<header on:click={toggleSidebarExpanded}>
		<Icon
			icon="akar-icons:triangle-fill"
			color="#8e9297"
			width={iconSize}
			height={iconSize}
			style="transform: rotate({expanded ? '180' : 90}deg); transition: transform 0.15s linear;" />
		<h6>{groupName}</h6>
	</header>
	{#if expanded}
		<div class="channels">
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		position: relative;
		color: #8e9297;

		h6 {
			color: inherit;
		}

		&:hover {
			cursor: pointer;
		}
	}
	.channels {
		display: flex;
		flex-direction: column;
		padding-left: 1rem;
		gap: 0.6rem;
		margin-top: 0.6rem;
	}
</style>
