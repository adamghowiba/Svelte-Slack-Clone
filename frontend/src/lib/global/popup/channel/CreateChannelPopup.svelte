<script lang="ts">
	import { createChannel } from "$lib/api/channel-api";

	import TextInput from "$lib/global/input/TextInput.svelte";
	import Model from "$lib/global/models/Model.svelte";
	import ModelActions from "$lib/global/models/ModelActions.svelte";
	import { publicChannels } from "$lib/store/channel";
	import { overlay } from "$lib/store/interface";
	import { log } from "@utils/logger";
	import { createEventDispatcher } from "svelte";

	const channelData = {
		name: "",
		description: ""
	};

	const dispatch = createEventDispatcher();

	const handleCreateChannel = async () => {
		log.info("Attempting to create channel", { ...channelData });
		dispatch("closeModel");
		$overlay = false;
		
		const createdChannel = await createChannel(channelData);

		publicChannels.update((channels) => {
			channels.data.push(createdChannel);
			return channels;
		});
	};
</script>

<Model on:closeModel>
	<header class="create-channel__header" slot="header">
		<h4>Create a channel</h4>
		<p>
			Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.
		</p>
	</header>

	<div class="create-channel__body" slot="body">
		<TextInput
			icon="clarity:hashtag-solid"
			bind:value={channelData.name}
			label="Name"
			placeholder="eg. plan-budget"
			charcterLimit={30} />
		<TextInput bind:value={channelData.description} label="Description" desc="What's this channel about?" />
	</div>

	<ModelActions slot="footer" on:save={handleCreateChannel} />
</Model>

<style lang="scss">
</style>
