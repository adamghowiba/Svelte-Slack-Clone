<script lang="ts">
	import { session } from "$app/stores";
	import { fetchChannelList, fetchPrivateChannels, fetchUsersList } from "$lib/utils/requestUtils";
	import ChannelPreview from "./ChannelPreview.svelte";
	import Popup from "./Popup.svelte";
	import Search from "./Search.svelte";
	import SidebarGroup from "./SidebarGroup.svelte";

	/* 
	Cache strat
	- Cache the data client side with a last updated time.

	- When the user views there friends use a worker to make a request to the database

	- if the last updated time in the database is the same send the cached results from the backend
	- if different make query & update cahce through web worker. 

	ISSUE: When is it determined when a user views there friends?

	ISSUE: Using websockets doesn't update if they're offline.

	Sol: Add custom que events attached to a user in the database. such as
	- NewFriend
	- NewMessages

	Than when the apap loads use web worker to check if that user has any unseen events. 
	If they do run a task specfic to that event to update the client side cache.  
	*/

	let searchValue: string;
</script>

<section>
	<Search bind:value={searchValue} />

	<!-- Group Chats -->
	<SidebarGroup title="Group Chats">
		{#await fetchChannelList()}
			<h3>Loading...</h3>
		{:then channels}
			{#each channels || [] as channel}
				<ChannelPreview name={channel?.name} channelId={channel.id} notifications={0} type="group" />
			{/each}
		{/await}
	</SidebarGroup>

	<!-- All Users -->
	<SidebarGroup title="Direct Messages">
		<Popup />
		{#await fetchPrivateChannels($session.user.id)}
			<h3>Loading...</h3>
		{:then channels}
			{#each channels || [] as channel}
				<ChannelPreview name={channel.username} channelId={channel.channelId} type="user" />
			{/each}
		{/await}
	</SidebarGroup>

	<!-- All Users -->
	<SidebarGroup title="All users">
		{#await fetchUsersList(true)}
			<h3>Loading...</h3>
		{:then users}
			{#each users || [] as user}
				<ChannelPreview name={user.username} notifications={0} type="user" />
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
		width: 290px;
		height: 100%;
		background-color: var(--color-black-s3);
	}
</style>
