<script lang="ts">
	export let color = "#5865F2";
	export let size = "80px";
	export let boxSize = "80px";
	export let borderSize: number = 8;
</script>

<div class="lds-ring" style="--color: {color}; --size: {size}; --borderSize: {borderSize}px; --boxSize: {boxSize};">
	<div />
	<div />
	<div />
	<div />
</div>

<style>
	.lds-ring {
		display: inline-block;
		position: relative;
		width: var(--boxSize, 80px);
		height: var(--boxSize, 80px);
	}
	.lds-ring div {
		display: block;
		position: absolute;
		width: var(--size, 64px);
		height: var(--size, 64px);
		border: var(--borderSize, 8px) solid #fff;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: var(--color, #5865f2) transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
