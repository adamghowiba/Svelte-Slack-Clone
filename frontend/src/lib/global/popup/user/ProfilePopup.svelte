<script lang="ts">
	import { session } from "$app/stores";

	import Select from "$lib/global/input/Select.svelte";
	import TextInput from "$lib/global/input/TextInput.svelte";
	import Model from "$lib/global/models/Model.svelte";
	import ModelActions from "$lib/global/models/ModelActions.svelte";
	import UpdateStatus from "$lib/global/UpdateStatus.svelte";
	import Icon from "@iconify/svelte";
	import MenuBlurb from "../MenuBlurb.svelte";
	import MenuItem from "../MenuItem.svelte";
	import NewMenu from "../NewMenu.svelte";
	import SubMenu from "../SubMenu.svelte";

	export let statusModelOpen: boolean = false;
	export let profilePopupOpen: boolean = false;
	let statusValue: string;
	let selectValue: any;

	const selectOptions = [
		{ name: "Don't clear", value: "null" },
		{ name: "30 Minutes", value: "1031230" },
		{ name: "1 Hour", value: "12312302" },
		{ name: "This week", value: "1231230" }
	];
</script>

{#if statusModelOpen}
	<Model on:closeModel={() => (statusModelOpen = false)}>
		<h4 slot="header">Set your status</h4>
		<div class="status-model" slot="body">
			<TextInput placeholder="What's your status" bind:value={statusValue} />
			{#if statusValue}
				<div class="clear">
					<Select options={selectOptions} defaultValue={selectOptions[0]} bind:selected={selectValue}>
						<div class="clear__time">
							<h6><b>Clear after</b>: {selectValue?.name}</h6>
							<Icon icon="akar-icons:chevron-down" color="white" width={16} height={16} />
						</div>
					</Select>
				</div>
			{:else}
				<div class="status-model__list">
					<h6>For Web Revived</h6>
					<h5><i>📅</i><span>In a meeting</span> - 1 hour</h5>
					<h5><i>🚗</i><span>Commuting</span> - 30 minutes</h5>
					<h5><i>🤒</i><span>Out sick</span> - Today</h5>
					<h5><i>🌴</i><span>Vacationing</span> - Don't clear</h5>
					<h5><i>🔒</i><span>Busy</span> - Today</h5>
				</div>
			{/if}
		</div>
		<ModelActions slot="footer" />
	</Model>
{/if}

{#if profilePopupOpen}
	<NewMenu width="330px" top="105%" right="-3px" on:closeModal={() => (profilePopupOpen = false)}>
		<MenuItem hover={false}>
			<div class="update-status">
				<MenuBlurb name={$session.user.username} desc={"Active"} imgSrc="/images/mock-avatar.jpg" />
				<UpdateStatus on:click={() => (statusModelOpen = true)} status="Active" />
			</div>
		</MenuItem>
		<MenuItem>Clear Status</MenuItem>
		<MenuItem>Set yourself as away</MenuItem>
		<MenuItem seperator submenu>
			<SubMenu side="left" label="Pause notifcations">
				<MenuItem>For 30 minutes</MenuItem>
				<MenuItem>For 1 hour</MenuItem>
				<MenuItem>For 2 Hours</MenuItem>
				<MenuItem>Until tomorrow</MenuItem>
			</SubMenu>
		</MenuItem>
		<MenuItem>Profile</MenuItem>
		<MenuItem seperator>Prefrences</MenuItem>
		<MenuItem danger>Sign out of Web Revived</MenuItem>
	</NewMenu>
{/if}

<style lang="scss">
	.status-model {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h5 {
			padding: 7px 0;
			font-size: 15px;
			color: rgb(148, 148, 148);
		}
		span {
			color: rgb(214, 214, 214);
			font-weight: bold;
		}

		&__list {
			display: flex;
			flex-direction: column;

			h6 {
				font-size: 13px;
				color: rgb(148, 148, 148);
				font-weight: bold;
			}

			i {
				font-size: 18px;
				margin-right: 10px;
			}
		}
	}
	.clear {
		position: relative;

		&__time {
			display: flex;
			align-items: center;
			gap: 13px;
		}

		&__time:hover {
			cursor: pointer;
		}

		h6 {
			color: #d1d2d3;
			font-size: 15px;

			b {
				color: white;
			}
		}
	}

	.update-status {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
