<script lang="ts">
	import ModelTabs from "$lib/global/models/ModelTabs.svelte";
	import AboutChannel from "$lib/global/popup/channel/AboutChannel.svelte";
	import MembersList from "$lib/global/popup/channel/MembersList.svelte";
	import { overlay } from "$lib/store/interface";
	import type { Channel } from "$lib/types";
	import { clickOutside } from "$lib/utils/clickOutside";
	import Icon from "@iconify/svelte";

	export let active = true;
	export let channelData: Channel;

	const popupOptions = ["about", "members", "intergrations"] as const;
	let selected: typeof popupOptions[number] = popupOptions[0];

	const closePopup = () => {
		active = false;
		$overlay = false;
		console.log("Closed popup");
	};

	$: popups = {
		membersPopup: false,
		channelPopup: false
	};

</script>

{#if active}
	<div class="popup" use:clickOutside={closePopup}>
		<header class="head">
			<div class="head__content">
				<h5>{channelData?.name}</h5>
				<div class="exit" on:click={closePopup}><Icon icon="bi:x" width={30} height={30} /></div>
			</div>

			<ModelTabs bind:selected options={popupOptions} />
		</header>

		<div class="body">
			{#if selected == "about"}
				<AboutChannel {channelData} />
			{:else if selected == "members"}
				<MembersList bind:active={popups.membersPopup} />
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.popup {
		background-color: #222529;
		min-width: 600px;
		min-height: 700px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 7px;
		z-index: 100;
	}
	.body,
	.head {
		padding: 1.7rem;
	}
	.head {
		background-color: #1a1d21;
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		padding-bottom: 0;
		border-bottom: 1px solid rgba(228, 226, 226, 0.144);
		position: relative;

		.exit {
			position: absolute;
			top: 10px;
			right: 12px;
		}
	}
</style>
