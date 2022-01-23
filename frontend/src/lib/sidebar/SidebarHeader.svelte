<script lang="ts">
	import MenuBlurb from "$lib/global/popup/MenuBlurb.svelte";
	import MenuItem from "$lib/global/popup/MenuItem.svelte";
	import NewMenu from "$lib/global/popup/NewMenu.svelte";
	import SubMenu from "$lib/global/popup/SubMenu.svelte";
	import Icon from "@iconify/svelte";
	import { createEventDispatcher } from "svelte";

	export let workspace: string;
	export let url: string;

	const dispatch = createEventDispatcher();

	let active: boolean;
</script>

<header on:click={() => (active = true)}>
	<div class="workspace">
		<h5>{workspace}</h5>
		<Icon icon="akar-icons:chevron-down" color="white" width={16} height={16} />
	</div>

	<div class="compose">
		<Icon icon="fluent:compose-20-filled" width={20} height={20} color="#1A1D21" />
	</div>
	{#if active}
		<NewMenu top="90%" width="400px" on:closeModal={() => (active = false)}>
			<MenuItem seperator hover={false}>
				<MenuBlurb imgSrc="/images/mock-workspace.png" name={workspace} desc={url} />
			</MenuItem>
			<MenuItem>Invite people to {workspace}</MenuItem>
			<MenuItem seperator on:click={() => dispatch("createChannel")}>Create a channel</MenuItem>
			<MenuItem>Prefrences</MenuItem>
			<MenuItem seperator submenu>
				<SubMenu width="300px" label="Settings & administration">
					<MenuItem>Workspace settings</MenuItem>
					<MenuItem>Customize {workspace}</MenuItem>
					<MenuItem>Manage members</MenuItem>
				</SubMenu>
			</MenuItem>
			<MenuItem seperator submenu>
				<SubMenu label="Tools">
					<MenuItem>Workflow builder</MenuItem>
					<MenuItem>Analytics</MenuItem>
				</SubMenu>
			</MenuItem>
			<MenuItem>Add workspace</MenuItem>
			<MenuItem danger>Sign out of {workspace}</MenuItem>
		</NewMenu>
	{/if}
</header>

<style lang="scss">
	header {
		position: relative;
		display: flex;
		align-items: center;
		border-bottom: 1px solid var(--color-tran);
		height: 50px;
		padding: 0 1rem;
		justify-content: space-between;

		&:hover {
			background-color: black;
			cursor: pointer;
		}

		.compose {
			background-color: white;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 32px;
			width: 32px;
		}

		.workspace {
			display: flex;
			align-items: center;
			gap: 10px;
		}

		h5 {
			font-weight: bold;
		}
	}
</style>
