<script lang="ts">
	import FeildGroup from "$lib/global/FieldItem.svelte";
	import FieldWrapper from "$lib/global/FieldGroup.svelte";
	import InputModel from "$lib/global/models/InputModel.svelte";
	import type { Channel } from "$lib/types";
	import { updateChannel } from "$lib/api/channel-api";
	import { log } from "@utils/logger";
	import { parseDate } from "@utils/dateUtils";

	export let channelData: Channel;

	type PopupOptions = keyof Pick<Channel, "name" | "topic" | "description">;
	type MappedPopupOptions = {
		[Propery in PopupOptions]: PopupData;
	};

	interface PopupData {
		type: PopupOptions;
		title: string;
		desc: string;
		inputType: "text" | "textarea";
		value: string;
		loading: boolean;
	}

	let loading: boolean = false;
	let popupOpen = false;
	let activePopup: PopupData = null;

	const handleAction = async (type: PopupOptions, value: any) => {
		loading = true;
		log.debug("Updateing channel data", value);
		await updateChannel(channelData.id, { [type]: value });

		loading = false;
	};

	const handleOpenPopup = (type: PopupOptions) => {
		activePopup = popupData[type];
		popupOpen = true;
	};

	const popupData: MappedPopupOptions = {
		name: {
			type: "name",
			title: "Rename this channel",
			desc: "Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.",
			inputType: "text",
			value: channelData?.name,
			loading: false
		},
		topic: {
			type: "topic",
			title: "Edit topic",
			desc: "Let people know what the channel is focused on right now (ex. a project milestone). Topics are always visible in the header.",
			inputType: "textarea",
			value: channelData?.topic,
			loading: false
		},
		description: {
			type: "description",
			title: "Edit description",
			desc: "Let people know what this channel is for.",
			inputType: "textarea",
			value: channelData?.description,
			loading: false
		}
	};
</script>

<!-- Overlay Ontop Of Popup -->
{#if popupOpen}
	<div class="overlay" />
{/if}

<div class="about">
	{#if popupOpen}
		<InputModel
			title={activePopup.title}
			desc={activePopup.desc}
			inputType={activePopup.inputType}
			value={activePopup.value}
			{loading}
			on:save={({ detail }) => handleAction(activePopup.type, detail)}
			on:cancel={() => {}}
			on:closeModel={() => (popupOpen = false)} />
	{/if}

	<!-- TODO: Change to object with each statment -->
	<header>
		<FeildGroup
			groupName="Channel Name"
			desc="#{channelData?.name}"
			hasBorder={true}
			on:click={() => handleOpenPopup("name")} />
	</header>

	<FieldWrapper>
		<FeildGroup
			groupName="Topic"
			desc={channelData?.topic ?? "Add a topic"}
			on:click={() => handleOpenPopup("topic")} />
		<hr />
		<FeildGroup
			groupName="Description"
			desc={channelData?.description ?? "Add a description"}
			on:click={() => handleOpenPopup("description")} />
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
