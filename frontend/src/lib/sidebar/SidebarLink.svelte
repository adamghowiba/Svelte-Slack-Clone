<script lang="ts">
	import Icon from "@iconify/svelte";
	export let icon: string;
	export let size: number = 10;
	export let width: number = 0;
	export let height: number = 0;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a class="link">
	<Icon {icon} width={width || size} height={height || size} color="inherit" />
	<slot />
</a>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: inherit;
	}
</style>
