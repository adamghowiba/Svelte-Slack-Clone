<script lang="ts">
	import SearchDropdown from "$lib/global/input/SearchDropdown.svelte";
	import InputModel from "$lib/global/models/InputModel.svelte";
	import Model from "$lib/global/models/Model.svelte";
	import Search from "$lib/global/Search.svelte";
	import Icon from "@iconify/svelte";
	import SmallUserPreview from "$lib/global/input/UserPreview.svelte";
	import UserPreview from "$lib/chat/UserPreview.svelte";
	import { allUsers, onlineUsers } from "$lib/store/users";
	import { overlay } from "$lib/store/interface";
	import UserChannel from "$lib/sidebar/UserChannel.svelte";

	export let active: boolean = false;

	let addMemberValue: string;
	let searchMemberValue: string;

	const openPopup = () => {
		active = !active;
	};

	$: filteredAddMember = $allUsers.data.filter((users) => users?.username?.toLowerCase().startsWith(addMemberValue));
</script>

{#if active}
	<div class="overlay" />
{/if}
<div class="members">
	{#if active}
		<InputModel
			bind:value={addMemberValue}
			inputType="text"
			placeholder="Add description"
			on:closeModel={() => (active = false)}>
			<SearchDropdown active={Boolean(addMemberValue)} data={filteredAddMember} slot="dropdown" />
		</InputModel>
	{/if}

	<Search bind:value={searchMemberValue} />

	<button class="members__add" on:click={openPopup}>
		<div class="icon">
			<Icon icon="ant-design:user-add-outlined" color="white" width={19} height={19} />
		</div>
		<span>Add People</span>
	</button>

	<div class="members__list">
		{#each $allUsers.data as user}
			<UserPreview
				username={user.username}
				status={$onlineUsers.find((users) => user.username == users.username) ? "Online" : "Offline"} />
		{/each}
	</div>
</div>

<style lang="scss">
	.members {
		position: relative;
		display: flex;
		flex-direction: column;
	}
	.members__add {
		appearance: none;
		background-color: transparent;
		outline: none;
		border: none;
		color: var(--color-gray-s3);
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;
		padding: 0.6rem 0.3rem;

		&:hover {
			background-color: rgba(79, 84, 92, 0.16);
			cursor: pointer;
		}

		span {
			font-weight: bold;
		}

		.icon {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			background-color: #5865f27a;
			padding: 7px;
			border-radius: 3px;
		}
	}
</style>
