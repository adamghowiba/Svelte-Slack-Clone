<script lang="ts">
	import Icon from "@iconify/svelte";

	interface IconProps {
		width?: number;
		height?: number;
		color?: string;
		rotate?: number;
	}

	export let color = "var(--color-black-s1)";
	export let iconProps: IconProps = {};
	export let charcterLimit: number = 0;
	export let autoFocus: boolean = false;
	export let error: boolean = false;
	export let value: string = "";
	export let icon: string = null;
	export let placeholder: string = null;
	export let label: string = null;
	export let desc: string = null;

	let focused: boolean = autoFocus;
</script>

<div class="wrapper">
	{#if label}
		<label for={label}>{label}</label>
	{/if}
	<div
		class="input-warp"
		style="--color: {color}"
		class:error
		class:focused-input={focused}
		class:input--error={error || (charcterLimit && charcterLimit - value.length < 0)}>
		{#if icon}
			<div class="icon">
				<Icon
					{icon}
					color={iconProps?.color || "inherit"}
					width={iconProps?.width || 20}
					height={iconProps?.height || 20}
					rotate={iconProps?.rotate || 0} />
			</div>
		{/if}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			on:blur={() => (focused = false)}
			on:focus={() => (focused = true)}
			{autoFocus}
			type="text"
			name="chat-search"
			{placeholder}
			bind:value />

		{#if charcterLimit}
			<div class="character-limit">
				<span>{charcterLimit - value.length}</span>
			</div>
		{/if}
	</div>
	{#if desc}
		<span class="desc">{desc}</span>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		.desc {
			display: block;
			margin-top: 4px;
			color: #ababad;
			font-size: 13px;
		}
	}
	.input-warp {
		width: 100%;
		height: min-content;
		position: relative;
		display: flex;
		padding-right: 10px;
		align-items: center;
		color: var(--color-gray-s4);
		border: 1px solid rgba(255, 255, 255, 0.247);
		border-radius: 3px;

		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
			color: inherit;
			padding: 0 8px;
		}
		.character-limit {
			font-weight: bold;
			font-size: 16px;
			color: #ababad;
		}
	}
	input {
		position: relative;
		z-index: 30;
		border-radius: inherit;
		padding: 12px 7px;
		appearance: none;
		border: none;
		width: 100%;
		height: 100%;
		outline: none;
		background-color: inherit;
		color: var(--color-gray-s2);
		font-weight: var(--fw-md);
		font-size: 15px;

		&::placeholder {
			color: var(--color-gray-s4);
		}
	}

	label {
		display: block;
		margin-bottom: 0.6rem;
		text-transform: capitalize;
		font-size: 15px;
		color: #d1d2d3;
		font-weight: var(--fw-bold);
	}
</style>
