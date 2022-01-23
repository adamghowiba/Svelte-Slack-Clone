<script lang="ts">
	import { createEventDispatcher } from "svelte";

	interface SelectOptions {
		name: string;
		value: any;
	}

	export let options: SelectOptions[] = [];
	export let defaultValue: SelectOptions = null;
	export let selected: any = defaultValue;

	let expanded = false;

	const dispatch = createEventDispatcher();

	const selectOption = (option: SelectOptions) => {
		dispatch("selected", option);
		selected = option;
	};
</script>

<div class="select" on:click={() => (expanded = !expanded)}>
	<slot />

	{#if expanded}
		<div class="options">
			{#each options as option}
				<div class="option" class:selected={option.value == selected.value} on:click={() => selectOption(option)}>
					{option.name}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.select {
		position: relative;
	}
	.options {
		width: 100%;
		z-index: 100;
		border: 1px solid var(--color-tran);
		border-radius: 6px;
		background-color: #222529;
		position: absolute;
		display: flex;
		padding: 12px 0;
		flex-direction: column;
		transform: translate(0px, 4px);
	}

	.option {
		padding: 4px 20px;
		font-size: 15px;
		font-weight: 500;

		&.selected {
			color: #1579c5;
		}
		&.selected:hover {
			color: white;
		}
		&:hover {
			background-color: #1264a3;
		}
	}
</style>
