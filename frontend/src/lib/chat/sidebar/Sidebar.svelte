<script lang="ts">
	import { session } from '$app/stores';

	import ChannelPreview from './ChannelPreview.svelte';
	import Search from './Search.svelte';
	import SidebarGroup from './SidebarGroup.svelte';

	let usersMock = [
		{
			username: 'Adam Ghowiba',
			chanel: 'Projects',
			notifications: 5
		},
		{
			username: 'Nathan Ewuin',
			chanel: 'Developers',
			notifications: 2
		},
		{
			username: 'Elon Musk',
			chanel: 'Designers',
			notifications: 400
		},
		{
			username: 'Zsolt Merwin',
			chanel: 'Admin Chat',
			notifications: 0
		},
		{
			username: 'Mark Raymon',
			chanel: 'UX Designers',
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
	<SidebarGroup title="Direct messages">
		{#each usersMock as user}
			<ChannelPreview name={user.chanel} notifications={user.notifications} type="group" />
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
