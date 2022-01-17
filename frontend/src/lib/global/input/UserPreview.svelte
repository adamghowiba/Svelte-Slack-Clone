<script lang="ts">
	export let username: string;
	export let status: string = null;
</script>

<div class="user">
	<img src="https://avatars.dicebear.com/api/identicon/a.svg?size=1" alt="User avatar" />
	<h6>{username}</h6>
	{#if status}
		<span>{status}</span>
	{/if}
</div>

<style lang="scss">
	.user {
		width: 100%;
		padding: 5px 0;
		display: flex;
		align-items: center;
		gap: 13px;

		h6 {
			color: var(--color-gray-s3);
		}

		span {
			margin-left: auto;
			font-size: var(--fs-xs);
		}
	}
	img {
		width: 10px;
		height: 10px;
	}
</style>
