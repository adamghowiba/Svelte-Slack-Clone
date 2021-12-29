<script lang="ts">
	import { session } from '$app/stores';

	import ChannelPreview from './ChannelPreview.svelte';
	import Search from './Search.svelte';
	import SidebarGroup from './SidebarGroup.svelte';
	let mockChannels = [
		{
			chanel: 'projects',
		},
		{
			chanel: 'developers',
			notifications: 2
		},
		{
			chanel: 'designers',
			notifications: 400
		},
		{
			chanel: 'admin',
			notifications: 0
		},
		{
			chanel: 'ux',
			notifications: 0
		}
	];

	async function loadFriends() {
		const response = await fetch(`http://localhost:5000/user/${$session.user.id}/friends`, {
			method: 'GET',
			credentials: 'include'
		});
		const result = await response.json();

		if (!response.ok) return Promise.reject(result.message);

		return result;
	}
	const promise = loadFriends();
</script>

<section>
	<Search />
	<SidebarGroup title="Direct messages">
		{#await promise}
			<h4>Loading....</h4>
		{:then friends}
			{#each friends as userFriend}
				<ChannelPreview name={userFriend.friend.username} notifications={0} type="user" />
			{/each}
		{:catch error}
			<h4>{error}</h4>
		{/await}
	</SidebarGroup>
	<SidebarGroup title="Group Chats">
		{#each mockChannels as channel}
			<ChannelPreview name={channel.chanel} notifications={channel.notifications} type="group" />
		{/each}
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
