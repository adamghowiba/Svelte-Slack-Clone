<script lang="ts">
	import FeildGroup from "$lib/global/FieldItem.svelte";
	import FieldWrapper from "$lib/global/FieldGroup.svelte";
	import InputModel from "$lib/global/models/InputModel.svelte";
	import type { Channel } from "$lib/types";
	import { updateChannel } from "$lib/api/channel-api";
	import { log } from "@utils/logger";
	import { parseDate } from "@utils/dateUtils";

	type Popups = keyof typeof popups;

	export let channelData: Channel;

	let loading: boolean = false;

	/* TODO: Add loader */
	const handleAction = async (
		popup: Popups,
		key: keyof Pick<Channel, "name" | "topic" | "description">,
		value: any
	) => {
		log.debug("Update channel data", value);
		loading = true;
		await updateChannel(channelData.id, { [key]: value });

		loading = false;
		popups[popup] = false;
	};

	const popups = {
		channel: false,
		topic: false,
		description: false
	};

	let selectedChannel: keyof typeof popup = null;
	let active = false;
	
	const openPopup = (popup: keyof typeof popups) => {
		// popups[popup] = true;
		selectedChannel = popup;
		active = true;
		console.log('opened', popup, channel);
	};
	
	$: channel = popup[selectedChannel];
	$: popupOpen = Object.values(popups).includes(true);

	const popup = {
		channel: {
			title: "Rename this channel",
			desc: "Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.",
			inputType: "text",
			value: "",
			loading: false
		},
		topic: {
			title: "Edit topic",
			desc: "Let people know what the channel is focused on right now (ex. a project milestone). Topics are always visible in the header.",
			inputType: "text",
			value: "",
			loading: false
		},
		description: {
			title: "Edit description",
			desc: "Let people know what this channel is for.",
			inputType: "text",
			value: "",
			loading: false
		}
	};

	// TODO: Create a loader componot.
</script>

<!-- Overlay Ontop Of Popup -->
{#if active}
	<div class="overlay" />
{/if}

<div class="about">
	{#if active}
		<InputModel
			title="{channel.title}"
			desc="{channel.desc}"
			inputType="{channel.inputType}"
			value={channel.value}
			{loading}
			on:save={({ detail }) => handleAction("channel", "name", detail)}
			on:cancel={() => {
				active = false
			}}
			on:closeModel={() => active = false} />
	{/if}
	<!-- Channel Name -->
	<!-- {#if popups.channel}
		<InputModel
			title="Rename this channel"
			desc="Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters."
			inputType="text"
			value={channelData?.name}
			{loading}
			on:save={({ detail }) => handleAction("channel", "name", detail)}
			on:cancel={() => {
				popups.channel = false;
			}}
			on:closeModel={() => (popups.channel = false)} />
	{/if} -->

	<!-- Channel Topic -->
	<!-- {#if popups.topic}
		<InputModel
			title="Edit topic"
			desc="Let people know what the channel is focused on right now (ex. a project milestone). Topics are always visible in the header."
			inputType="textarea"
			placeholder={"Add channel topic"}
			value={channelData?.topic}
			{loading}
			on:save={({ detail }) => handleAction("topic", "topic", detail)}
			on:closeModel={() => (popups.topic = false)} />
	{/if} -->

	<!-- Channel Description -->
	<!-- {#if popups.description}
		<InputModel
			inputType="textarea"
			title="Edit description"
			desc="Let people know what this channel is for."
			placeholder={"Add channel description"}
			value={channelData?.description}
			{loading}
			on:save={({ detail }) => handleAction("description", "description", detail)}
			on:closeModel={() => (popups.description = false)} />
	{/if} -->

	<!-- TODO: Change to object with each statment -->
	<header>
		<FeildGroup
			groupName="Channel Name"
			desc="#{channelData?.name}"
			hasBorder={true}
			on:click={() => openPopup("channel")} />
	</header>

	<FieldWrapper>
		<FeildGroup groupName="Topic" desc={channelData?.topic ?? "Add a topic"} on:click={() => openPopup("topic")} />
		<hr />
		<FeildGroup
			groupName="Description"
			desc={channelData?.description ?? "Add a description"}
			on:click={() => openPopup("description")} />
		<hr />
		<FeildGroup
			canEdit={false}
			groupName="Created by"
			desc="Adam on {parseDate(new Date(channelData?.created_date))}" />
		<hr />
		<button slot="button">Leave Channel</button>
	</FieldWrapper>

	<FeildGroup
		groupName="Files"
		hasBorder={true}
		canEdit={false}
		desc="There aren’t any files to see here right now. But there could be — drag and drop any file into the message pane to add it to this conversation." />

	<span>Channel ID: 10312031</span>
</div>

<style lang="scss">
	.about {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	hr {
		margin: 0;
		background-color: rgba(236, 236, 236, 0.151);
		border: none;
		height: 1px;
	}

	span {
		margin-left: 7px;
		color: var(--color-gray-s4);
	}

	button {
		align-self: flex-start;
		font-weight: bold;
		appearance: none;
		background-color: transparent;
		color: #e01e5a;
		outline: none;
		border: none;
	}
</style>
