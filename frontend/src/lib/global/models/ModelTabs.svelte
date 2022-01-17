<script lang="ts">
	export let options: readonly any[];
	export let selected: string;
</script>

<header class="head">
	<div class="nav-items">
		{#each options as item}
			<h6 class:selected={item == selected} on:click={() => (selected = item)}>{item}</h6>
		{/each}
	</div>
</header>

<style lang="scss">
	.head {
		background-color: #1a1d21;
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		padding-bottom: 0;
		// border-bottom: 1px solid rgba(228, 226, 226, 0.144);
		position: relative;
	}
	.nav-items {
		display: inline-flex;
		width: max-content;
		margin-top: auto;
		transform: translateY(1px);
		gap: 1.3rem;

		h6 {
			color: #8e9297;
			font-weight: 600;
			padding-bottom: 5px;
			font-size: 14px;
			text-transform: capitalize;
			transition: color 0.15s linear;

			&:hover {
				color: var(--color-gray-s3);
				cursor: pointer;
			}
		}

		.selected {
			color: var(--color-gray-s3);
			border-bottom: 2px solid var(--color-blue);
		}
	}
</style>
