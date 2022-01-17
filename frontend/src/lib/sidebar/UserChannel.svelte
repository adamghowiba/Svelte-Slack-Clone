<script lang="ts">
	import type { ChannelType } from "$lib/types";
	import Icon from "@iconify/svelte";
	import { onlineUsers } from "$lib/store/users";
	import NotifcationBadge from "./NotifcationBadge.svelte";
	import Menu from "$lib/global/popup/Menu.svelte";

	export let username: string;
	export let channelId: number = 0;
	export let notifications: number = 0;

	let contextMenuOpen = false;
	let contextX: number;
	let contextY: number;

	const handleContextMenu = (event: MouseEvent) => {
		contextX = event.pageX;
		contextY = event.pageY;
		contextMenuOpen = true;
		event.preventDefault();
	};
</script>

<div class="wrap" on:contextmenu={handleContextMenu}>
	<Menu xLocation={contextX} yLocation={contextY} bind:active={contextMenuOpen} />
	<a href="/chat/{channelId}?user={username}&type=user" class="wrap" data--id={channelId}>
		<div class="status" class:online={$onlineUsers.find((user) => user.username == username)} />
		<h6>{username}</h6>

		<NotifcationBadge {notifications} />
	</a>
</div>

<style lang="scss">
	a {
		display: flex;
		gap: 0.7rem;
		align-items: center;
		color: #8e9297;
		transition: color 0.15s ease-out;

		&:hover {
			color: var(--color-gray-s2);
		}
	}
	h6 {
		color: inherit;
		font-size: inherit;
		font-weight: 500;
	}
	.status {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: rgba(224, 224, 224, 0.541);

		&.online {
			background-color: #00ff00;
		}
	}
</style>
