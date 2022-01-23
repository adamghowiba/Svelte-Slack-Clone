<script lang="ts">
	import Icon from "@iconify/svelte";

	export let active: boolean = false;

	$: color = active ? "white" : "#56595C";
</script>

<div class="action" on:click class:active>
	<Icon icon="fe:paper-plane" {color} width={21} height={21} />
	<div class="seperator" />
	<Icon icon="akar-icons:chevron-down" {color} width={16} height={16} />
</div>

<style lang="scss">
	.action {
		display: flex;
		align-items: center;
		padding: 4px 10px;
		border-radius: 5px;
		gap: 7px;

		&.active {
			background-color: #007a5a;
		}
	}
	.seperator {
		display: block;
		height: 16px;
		width: 1px;
		background-color: rgba(255, 255, 255, 0.575);
	}
</style>
