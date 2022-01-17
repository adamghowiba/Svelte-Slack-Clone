<script lang="ts">
	export let status: string;
	export let emoji = null;
</script>

<div class="status" on:click>
	<div class="status-icon" />
	<span> {status} </span>
</div>

<style lang="scss">
	.status {
		display: flex;
		gap: 1rem;
		align-items: center;
		background-color: #1a1d21;
		padding: 8px;
		border: 1px solid var(--color-tran);
		border-radius: 4px;

		&:hover {
			border: 1px solid rgba(211, 211, 211, 0.521);
		}
	}
	.status-icon {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #00ff00;
	}
</style>
