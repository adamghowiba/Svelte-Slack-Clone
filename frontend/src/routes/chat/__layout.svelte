<script lang="ts">
	import Sidebar from '$lib/chat/sidebar/Sidebar.svelte';
</script>

<section class="wrapper">
	<Sidebar />

	<slot />
</section>

<style lang="scss">
	.wrapper {
		height: 100%;
		background-color: var(--color-black-s1);
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: 100%;
	}
</style>
