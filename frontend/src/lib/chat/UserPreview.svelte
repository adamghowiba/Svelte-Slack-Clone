<script lang="ts">
	import Action from "$lib/global/buttons/Action.svelte";
	import Icon from "@iconify/svelte";

	export let username: string = "adam";
	export let status: string = "Online";
</script>

<div class="wrap">
	<img src="https://avatars.dicebear.com/api/identicon/{username}.svg?size=1" alt="User avatar" />

	<div class="user-info">
		<h5>{username}</h5>
		<h6>{status}</h6>
	</div>

	<div class="actions">
		<Action>
			<Icon icon="bi:chat-square-fill" color="#B9BBBE" width={13} height={13} />
		</Action>
		<Action>
			<Icon icon="bx:bx-dots-vertical-rounded" color="#B9BBBE" width={20} height={20} />
		</Action>
	</div>
</div>

<style lang="scss">
	.wrap {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.6rem 0.3rem;
		z-index: 100;
		border-radius: 3px;

		&:hover {
			background-color: rgba(79, 84, 92, 0.16);
		}

		img {
			width: 35px;
			height: 35px;
			border-radius: 50%;
		}

		.user-info {
			h6 {
				color: var(--color-gray-s3);
				font-size: var(--fs-sm);
			}
		}

		.actions {
			display: flex;
			gap: 1rem;
			margin-left: auto;
		}
	}
</style>
