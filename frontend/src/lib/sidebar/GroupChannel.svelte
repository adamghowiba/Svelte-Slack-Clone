<script lang="ts">
	import Icon from "@iconify/svelte";
	import NotifcationBadge from "./NotifcationBadge.svelte";

	export let channelName: string;
	export let channelId: number = 0;
	export let notifications: number = 0;
</script>

<a href="/chat/{channelId}?group={channelName}&type=group" class="wrap" data--id={channelId}>
	<Icon icon="fontisto:hashtag" color="inherit" width={12} height={12} />
	<h6>{channelName}</h6>

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
		font-size: inherit;
	}
</style>
