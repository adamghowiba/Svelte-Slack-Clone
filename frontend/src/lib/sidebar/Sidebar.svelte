<!-- <svelte:options immutable /> -->
<script lang="ts">
	import Button from "$lib/global/buttons/Button.svelte";
	import Loader from "$lib/global/loaders/Loader.svelte";
	import { privateChannels, publicChannels } from "$lib/store/channel";
	import { allUsers } from "$lib/store/users";
	import ChannelGroup from "./ChannelGroup.svelte";
	import GroupChannel from "./GroupChannel.svelte";
	import Popup from "./Popup.svelte";
	import Search from "$lib/global/Search.svelte";
	import SidebarGroup from "./SidebarGroup.svelte";
	import UserChannel from "./UserChannel.svelte";

	let directMessagePopup = false;
	let searchValue: string;

	// TODO - Remove
	function testFunction() {
		console.log("adam");
	}
</script>

<section>
	<Search bind:value={searchValue} />
	<!-- Group Chats -->
	<SidebarGroup title="Group Chats">
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

	<div class="adam__world" />

	<Button on:click={testFunction} type="button">Test Function</Button>
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
