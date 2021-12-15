<script lang="ts">
	import ChannelBio from '$lib/chat/ChannelBio.svelte';
	import ChatInput from '$lib/chat/ChatInput.svelte';

	let submitMessage;
</script>

<section>
    <ChannelBio channel="Projects" type="user" members={5} />

    <div class="messages">
	
	</div>

    <ChatInput on:submitMessage={submitMessage} />
</section>
<style lang="scss">
    section {
        height: 100%;
        width :100%;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
</style>
