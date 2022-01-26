<!-- <script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ session }) => {
		if (!session.user) {
			return {
				error: "Not valid session",
				status: 302,
				redirect: "/"
			};
		}
		return {
			status: 200
		};
	};
</script> -->
<script lang="ts">
	import Sidebar from "$lib/sidebar/Sidebar.svelte";
	import { socket } from "$lib/socket";
	import { onDestroy, onMount } from "svelte";
	import type { User } from "$lib/types";
	import { onlineUsers } from "$lib/store/users";
	import { log } from "@utils/logger";
	import Topbar from "$lib/global/Topbar.svelte";

	socket.on("user:active", (users: User[]) => {
		$onlineUsers = users;
	});

	// Maintain online users
	socket.on("user:connected", (user: User) => {
		onlineUsers.update((users) => {
			users.push(user);
			return users;
		});
	});

	socket.on("user:disconnected", (user: User) => {
		onlineUsers.update((users) => {
			return (users = users.filter((onlineUsers) => onlineUsers.username != user.username));
		});
	});

	socket.on("connect", async () => {
		log.info("Established websocket connection");
	});

	onMount(() => {
		if (!socket.connected) socket.connect();
	});

	onDestroy(() => {
		socket.removeAllListeners();
	});
</script>

<section class="wrapper">
	<Topbar />
	<Sidebar />

	<slot />
</section>

<style lang="scss">
	.wrapper {
		height: 100%;
		background-color: var(--color-black-s1);
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto 1fr;
	}
</style>
