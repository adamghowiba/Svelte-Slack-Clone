<script lang="ts">
	type Style = "text" | "rect" | "circle";
	type AnimationStyle = "pulse" | "wave";

	export let style: Style;
	export let width: number = 200;
	export let height: number = 100;
	export let animation: AnimationStyle = "wave";
</script>

<div class="skeleton style--{style} animation--{animation}" style="--width:{width}px; --height:{height}px;" />

<style lang="scss">
	.skeleton {
		position: relative;
		width: var(--width, 100px);
		height: var(--height, 50px);
		background-color: #293644;
		border-radius: 4px;
		overflow: hidden;

		background: rgb(73, 73, 73);
	}
	.style {
		&--circle {
			border-radius: 50%;
		}
	}

	.animation--pulse {
		background: rgb(73, 73, 73);
		animation: pulse 1.35s infinite;
	}
	.animation--wave::before {
		content: "";
		display: block;
		height: 100%;
		position: absolute;
		left: 0;
		height: 100%;
		width: 80%;
		border-radius: inherit;
		background: rgb(73, 73, 73);
		background: linear-gradient(
			90deg,
			rgba(82, 82, 82, 0.164) 0%,
			rgba(165, 165, 165, 0.187) 50%,
			rgba(82, 82, 82, 0.164) 100%
		);
		animation: wave 1.6s infinite;
	}

	@keyframes pulse {
		0% {
			background: rgb(73, 73, 73);
		}
		50% {
			background: rgba(73, 73, 73, 0.432);
		}
		100% {
			background: rgb(73, 73, 73);
		}
	}

	@keyframes wave {
		0% {
			left: -100%;
		}
		100% {
			left: var(--width);
		}
	}
</style>
