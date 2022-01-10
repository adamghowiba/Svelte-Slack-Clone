<script lang="ts">
	import type { ChannelType } from "$lib/types";
	import Icon from "@iconify/svelte";
	import { onlineUsers } from "$lib/store/users";
	import NotifcationBadge from "./NotifcationBadge.svelte";

	export let username: string;
	export let channelId: number = 0;
	export let notifications: number = 0;
</script>

<a href="/chat/{channelId}?user={username}&type=user" class="wrap" data--id={channelId}>
	<div class="status" class:online={$onlineUsers.find((user) => user.username == username)} />
	<h6>{username}</h6>

	<NotifcationBadge {notifications} />
</a>

<style lang="scss">
	.wrap {
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
	}
	.status {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: rgba(224, 224, 224, 0.541);

		&.online {
			background-color: #00ff00;
		}
	}
</style>
