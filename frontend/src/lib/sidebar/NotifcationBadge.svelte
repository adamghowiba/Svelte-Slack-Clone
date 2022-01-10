<script lang="ts">
	export let notifications = 0;
</script>

{#if notifications > 0}
	<div class="notifcation" class:expand={notifications.toString().length > 2}>
		{notifications}
	</div>
{/if}

<style lang="scss">
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
