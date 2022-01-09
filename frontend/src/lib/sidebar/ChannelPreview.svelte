<script lang="ts">
import type { ChannelType } from "$lib/types";

	import Icon from "@iconify/svelte";

	export let name: string;
	export let type: ChannelType;
	export let channelId: number = 0;
	export let notifications: number = 0;
</script>

<a href="/chat/{channelId || name}?{type}={name}&type={type}" class="wrap" data--id={channelId}>
	{#if type == "user"}
		<img src="https://avatars.dicebear.com/api/initials/{name}.svg?r=50&fontSize=40" alt="User Avatar" />
	{:else}
		<Icon icon="fontisto:hashtag" color="inherit" />
	{/if}
	<h6>{name}</h6>

	{#if notifications > 0}
		<div class="notifcation" class:expand={notifications.toString().length > 2}>
			{notifications}
		</div>
	{/if}
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
	img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.notifcation {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		background-color: #5865f27e;
		color: #bec1e4dc;
		border-radius: 50px;
		width: 26px;
		height: 22px;
		font-size: 12px;
		font-weight: bold;

		&.expand {
			border-radius: 50px;
			padding: 6px;
			width: auto;
		}
	}
</style>
