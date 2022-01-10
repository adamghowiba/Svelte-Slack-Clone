<svelte:options immutable />

<script lang="ts">
	import { session } from "$app/stores";
	import { channelStore, groupChannels, privateChannels } from "$lib/store/channel";
import { chatStore } from "$lib/store/chatMessages";
	import { fetchPrivateChannels, fetchUsersList } from "$lib/utils/requestUtils";
	import { onMount } from "svelte/internal";
	import ChannelPreview from "./ChannelPreview.svelte";
	import Popup from "./Popup.svelte";
	import Search from "./Search.svelte";
	import SidebarGroup from "./SidebarGroup.svelte";

	/* 
	Better approach to state mangement:

	- Use state mangement to deal with a majority of the internal dynamic state, 
	  such as chat history & channel lists. Stores, MiniRXJ, Akita

	- Use global Websocket handler to update state that the comps use to change
	  their data. 
*/

	/* 
	Better Message Lazy Loading:

	- Load messages like a game. Only save messages within a certain view distance (up & down).
	- Only allow this behavior for a few recent channels, than employ some form of cleanip techinque.

	? Should be done through state mangement. 
*/

	/* 
	Localstorage needs:

	- Local storage should be used to save UI related information for customization options.
	  anything in localstorage shouldn't be highly dynamic data. Things that don't change frequently
*/

	// Initlize channelstore
	// channelStore.init();

	const popupStatus = {
		channels: false,
		dms: false
	};

	const togglePopup = (type: keyof typeof popupStatus) => {
		popupStatus[type] = !popupStatus[type];
	};

	function addChannelState() {
		// channelStore.addPublicChannel({id: 0, users: [], name: 'funstuff'})
	}

	onMount(() => {});

	let searchValue: string;
</script>

<section>
	<Search bind:value={searchValue} />

	<!-- Group Chats -->
	<SidebarGroup title="Group Chats">
		{#if $channelStore.status == "loading"}
			<h3>Loading...</h3>
		{:else if $channelStore.status == "available"}
			{#each $groupChannels as channel}
				<ChannelPreview name={channel?.name} channelId={channel.id} notifications={0} type="group" />
			{/each}
		{/if}
	</SidebarGroup>

	<!-- All Users -->
	<SidebarGroup title="Direct Messages" on:click={() => togglePopup("dms")}>
		<Popup active={popupStatus.dms} on:clickOutside={() => togglePopup("dms")} />

		{#if $channelStore.status == "loading"}
			<h3>Loading...</h3>
		{:else if $channelStore.status == "available"}
			{#each $privateChannels || [] as channel}
				<ChannelPreview name={channel?.username} channelId={channel?.channelId} type="user" />
			{/each}
		{/if}
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

	<button on:click={addChannelState}> Add Channel State </button>
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
