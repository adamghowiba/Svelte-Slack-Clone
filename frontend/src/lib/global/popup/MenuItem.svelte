<script lang="ts">
	export let danger: boolean = false;
	export let seperator: boolean = false;
	export let hover: boolean = true;
	export let submenu: boolean = false;
</script>

<h6 class:danger class:hover class:submenu on:click>
	<slot />
</h6>
{#if seperator}
	<div class="seperator" />
{/if}

<style lang="scss">
	h6 {
		position: relative;
		padding: 4px 30px;
		font-size: 15px;
		color: #d1d2d3;

		&.submenu {
			padding: 0;
		}

		&.hover:hover {
			color: white;
			cursor: pointer;
			background-color: #0576b9;
		}

		&.danger {
			color: #e01e5a;
		}

		&.danger:hover {
			color: white;
			background-color: #e01e5a;
		}
	}
	.seperator {
		display: inline-block;
		height: 1px;
		width: 100%;
		background-color: rgba(114, 114, 114, 0.747);
	}
</style>
