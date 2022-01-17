<!-- <svelte:options immutable /> -->
<script lang="ts">
	import { createChannel } from "$lib/api/channel-api";
	import TextInput from "$lib/global/input/TextInput.svelte";
	import Loader from "$lib/global/loaders/Loader.svelte";
	import Model from "$lib/global/models/Model.svelte";
	import ModelActions from "$lib/global/models/ModelActions.svelte";
	import { privateChannels, publicChannels } from "$lib/store/channel";
	import { overlay } from "$lib/store/interface";
	import { allUsers } from "$lib/store/users";
	import { log } from "@utils/logger";
	import ChannelGroup from "./ChannelGroup.svelte";
	import GroupChannel from "./GroupChannel.svelte";
	import Popup from "./Popup.svelte";
	import SidebarGroup from "./SidebarGroup.svelte";
	import SidebarHeader from "./SidebarHeader.svelte";
	import SidebarLink from "./SidebarLink.svelte";
	import UserChannel from "./UserChannel.svelte";

	let directMessagePopup = false;
	let createChannelPopup = false;

	const handleCreateChannel = async () => {
		log.debug("Attempting to create channel", channelName, channelDescription);
		await createChannel({ name: channelName, description: channelDescription });
		createChannelPopup = false;
		$overlay = false;
	};

	let channelName: string;
	let channelDescription: string;
</script>

<section>
	<SidebarHeader
		on:createChannel={() => (createChannelPopup = true)}
		workspace="Web Revived"
		url="webrevived.saber.com" />

	<div class="body">
		<div class="link-group">
			<SidebarLink icon="fluent:list-20-filled" size={17}>All unreads</SidebarLink>
			<SidebarLink icon="ph:chat-circle-text-bold" size={17}>Threads</SidebarLink>
			<SidebarLink icon="eva:people-fill" size={17}>All DMs</SidebarLink>
			<SidebarLink icon="bx:bx-at" size={17}>Mentions</SidebarLink>
			<SidebarLink icon="akar-icons:search" size={17}>Channel browser</SidebarLink>
		</div>
		<!-- Group Chats -->
		<SidebarGroup title="Group Chats" on:click={() => (createChannelPopup = true)}>
			{#if createChannelPopup}
				<Model on:closeModel={() => (createChannelPopup = false)}>
					<header class="create-channel__header" slot="header">
						<h4>Create a channel</h4>
						<p>
							Channels are where your team communicates. They’re best when organized around a topic — #marketing, for
							example.
						</p>
					</header>

					<div class="create-channel__body" slot="body">
						<TextInput
							icon="clarity:hashtag-solid"
							bind:value={channelName}
							label="Name"
							placeholder="eg. plan-budget"
							charcterLimit={30} />
						<TextInput bind:value={channelDescription} label="Description" desc="What's this channel about?" />
					</div>

					<ModelActions slot="footer" on:save={handleCreateChannel} />
				</Model>
			{/if}
			{#if $publicChannels.state == "loading"}
				<Loader />
			{:else if $publicChannels.state == "available"}
				{#each $publicChannels.data || [] as group}
					<ChannelGroup groupName={group.name}>
						{#each group.channel as channel}
							<GroupChannel channelName={channel.name} channelId={channel.id} notifications={0} />
						{/each}
					</ChannelGroup>
				{/each}
			{:else}
				<h6>Error</h6>
			{/if}
		</SidebarGroup>

		<!-- All Users -->
		<SidebarGroup title="Direct Mesasages" on:click={() => (directMessagePopup = true)}>
			<Popup bind:active={directMessagePopup} on:clickOutside={() => (directMessagePopup = false)} />

			{#if $privateChannels.state == "loading"}
				<Loader />
			{:else}
				{#each $privateChannels.data || [] as channel}
					<UserChannel username={channel?.users?.username} channelId={channel?.id} notifications={0} />
				{/each}
			{/if}
		</SidebarGroup>

		<!-- All Users -->
		<SidebarGroup title="All users" addable={false}>
			{#if $allUsers.state == "loading"}
				<Loader />
			{:else}
				{#each $allUsers.data as user}
					<UserChannel username={user.username} notifications={0} />
				{/each}
			{/if}
		</SidebarGroup>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 300px;
		height: 100%;
		background-color: #1a1d21;
		border-right: 1px solid var(--color-tran);
		font-size: 15px;
	}
	.create-channel {
		&__header {
			p {
				margin-top: 1rem;
				color: #ababad;
				font-size: 15px;
			}
		}

		&__body {
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}
	}
	.body {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 0 1rem;
	}
	.link-group {
		color: #8e9297;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		font-weight: bold;
	}
</style>
