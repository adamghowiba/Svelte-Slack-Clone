<script lang="ts">
	import { session } from "$app/stores";
	import { clearUserStatus, uploadUserStatus } from "$lib/api/user-api";
	import { emoji } from "$lib/emoji_v2";
	import Button from "$lib/global/buttons/Button.svelte";

	import Select from "$lib/global/input/Select.svelte";
	import TextInput from "$lib/global/input/TextInput.svelte";
	import Model from "$lib/global/models/Model.svelte";
	import ModelActions from "$lib/global/models/ModelActions.svelte";
	import UpdateStatus from "$lib/global/UpdateStatus.svelte";
	import { overlay } from "$lib/store/interface";
	import { statusStore } from "$lib/store/status";
	import Icon from "@iconify/svelte";
	import { log } from "@utils/logger";
	import MenuBlurb from "../MenuBlurb.svelte";
	import MenuItem from "../MenuItem.svelte";
	import NewMenu from "../NewMenu.svelte";
	import SubMenu from "../SubMenu.svelte";

	export let statusModelOpen: boolean = false;
	export let profilePopupOpen: boolean = false;

	/* Value for clear status */
	let selectValue: any;

	/* Status text input value */
	let statusValue: string;

	/* Emoji status from popup modal 👍 */
	let statusEmoji: string;
	
	const closeStatusModal = () => {
		statusModelOpen = false;
		$overlay = false;
	};

	const saveStatus = async () => {
		$statusStore = { ...$statusStore, emoji: statusEmoji, status: statusValue };
		closeStatusModal();
		const updatedStatus = await uploadUserStatus($session.user.id, statusEmoji, statusValue);

		console.log(updatedStatus);
	};

	const cancelStatusModal = () => {
		closeStatusModal();
		statusEmoji = $statusStore?.emoji;
		statusValue = $statusStore?.status;
	};

	const clearStatus = async () => {
		$statusStore = null;
		closeStatusModal();
		await clearUserStatus($session.user.id);
		log.info("Cleared user status");
	};

	const selectOptions = [
		{ name: "Don't clear", value: "null" },
		{ name: "30 Minutes", value: "1031230" },
		{ name: "1 Hour", value: "12312302" },
		{ name: "This week", value: "1231230" }
	];

	$: hasStatus = statusEmoji || statusValue;
	$: sameStatus = $statusStore?.emoji == statusEmoji && $statusStore?.status == statusValue;

	$: if (statusEmoji == null && $statusStore?.emoji) {
		statusEmoji = $statusStore.emoji;
	}

	$: if (statusValue == null && $statusStore?.status) {
		statusValue = $statusStore.status;
	}
</script>

{#if statusModelOpen}
	<Model on:closeModel={cancelStatusModal}>
		<h4 slot="header">Set your status</h4>
		<div class="status-model" slot="body">
			<TextInput
				emoji={true}
				placeholder="What's your status"
				charcterLimit={10}
				bind:selectedEmoji={statusEmoji}
				bind:value={statusValue} />

			{#if hasStatus}
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
		<ModelActions slot="footer">
			{#if hasStatus && sameStatus}
				<Button on:click={clearStatus}>Clear Status</Button>
			{:else}
				<Button on:click={closeStatusModal}>Cancel</Button>
				<Button on:click={saveStatus}>Save Changes</Button>
			{/if}
		</ModelActions>
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
