<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {
			status: 200
		};
	};
</script> -->
<script lang="ts">
	import Sidebar from "$lib/chat/sidebar/Sidebar.svelte";
	import { socket } from "$lib/socket";
	import { onMount } from "svelte";

	onMount(() => {
		if (!socket.connected) socket.connect();
	});
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
