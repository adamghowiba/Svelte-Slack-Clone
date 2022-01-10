<svelte:options immutable />

<script lang="ts">
	import { session } from "$app/stores";
	import { channelStore, groupChannels, privateChannels } from "$lib/store/channel";
import type { Channel } from "$lib/types";
import { groupByKey } from "$lib/utils/dateUtils";
	import { fetchUsersList } from "$lib/utils/requestUtils";
	import ChannelGroup from "./ChannelGroup.svelte";
	import ChannelPreview from "./ChannelPreview.svelte";
	import GroupChannel from "./GroupChannel.svelte";
	import Popup from "./Popup.svelte";
	import Search from "./Search.svelte";
	import SidebarGroup from "./SidebarGroup.svelte";
	import UserChannel from "./UserChannel.svelte";

	let directMessagePopup = false;

	let searchValue: string;

	//@ts-ignore
	$: groupedChannels = groupByKey<Channel>($privateChannels, 'section')

	// $: groupedChannel = groupByKey($privateChannels, '');
</script>

<section>
	<Search bind:value={searchValue} />
	<!-- Group Chats -->
	<SidebarGroup title="Group Chats">
		<ChannelGroup groupName="Staff">
			<GroupChannel channelName={"projects"} channelId={0} notifications={0} />
		</ChannelGroup>

		<ChannelGroup groupName="Staff">
			<GroupChannel channelName={"projects"} channelId={0} notifications={0} />
			<GroupChannel channelName={"projects"} channelId={0} notifications={0} />
		</ChannelGroup>

		<GroupChannel channelName={"projects"} channelId={0} notifications={0} />
		<GroupChannel channelName={"projects"} channelId={0} notifications={0} />

		{#if $channelStore.status == "loading"}
			<h3>Loading...</h3>
		{:else if $channelStore.status == "available"}
			{#each groupedChannels as channel}
				<GroupChannel channelName={channel.name} channelId={channel.id} notifications={0} />
			{/each}
		{/if}
	</SidebarGroup>

	<!-- All Users -->
	<SidebarGroup title="Direct Messages" on:click={() => (directMessagePopup = true)}>
		<Popup bind:active={directMessagePopup} on:clickOutside={() => (directMessagePopup = false)} />

		{#if $channelStore.status == "loading"}
			<h3>Loading...</h3>
		{:else if $channelStore.status == "available"}
			{#each $privateChannels as channel}
				<UserChannel username={channel.users.username} channelId={channel.id} notifications={0} />
			{/each}
		{/if}
	</SidebarGroup>

	<!-- All Users -->
	<SidebarGroup title="All users" addable={false}>
		{#await fetchUsersList(true)}
			<h3>Loading...</h3>
		{:then users}
			{#each users as user}
				<UserChannel username={user.username} notifications={0} />
			{/each}
		{/await}
	</SidebarGroup>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 1.9rem;
		padding: 1.5em 1.2em;
		width: 265px;
		height: 100%;
		background-color: var(--color-black-s3);
	}
</style>
