<script lang="ts">
	export let borderRadius: number = 4;
</script>

<div class="action" style="--borderRadius: {borderRadius}px;" on:click>
	<slot />
</div>

<style lang="scss">
	.action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--borderRadius, 4px);
		padding: 5px 6px;
        min-width: 28px;

		&:hover {
			background-color: rgba(129, 129, 129, 0.267);
			cursor: pointer;
		}
	}
</style>
