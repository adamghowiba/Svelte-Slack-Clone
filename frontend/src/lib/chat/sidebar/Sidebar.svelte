<script lang="ts">
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
</script>

<section>
	<Search />
	<SidebarGroup title="Direct messages">
		{#each usersMock as user}
			<ChannelPreview name={user.username} notifications={user.notifications} type="user" />
		{/each}
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
