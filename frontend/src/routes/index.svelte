<script lang="ts">
    import Navbar from '$lib/global/Navbar.svelte';
	import WelcomePopup from '$lib/home/WelcomePopup.svelte';
	import { onDestroy, onMount } from 'svelte';
</script>

<section>
	<Navbar />
	<div class="center">
		<WelcomePopup />
	</div>
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-rows: auto 1fr;
		height: 100%;
	}
	.center {
		display: grid;
		place-items: center;

		width: 100%;
		height: 100%;
	}
</style>
