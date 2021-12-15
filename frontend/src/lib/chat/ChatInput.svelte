<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';

	let value: string;

	const dispatch = createEventDispatcher();

	const resizeTextArea = (event: Event) => {
		const target = event.target as HTMLTextAreaElement;

		var offset = target.offsetHeight - target.clientHeight;
		target.style.height = target.scrollHeight + offset + 'px';
	};

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key == 'Enter' && !event.shiftKey) {
			// event.preventDefault();

			if (value) {
				dispatch('submitMessage', value);
				value = '';
			}
		}
	}
</script>

<div class="wrap">
	<textarea
		data-autoresize
		name="comment"
		placeholder="Add to the discussion"
		bind:value
		on:input={resizeTextArea}
		on:keydown={handleKeyDown}
	/>
</div>

<style lang="scss">
	.wrap {
		display: flex;
		position: relative;
		width: 100%;
	}
	textarea {
		width: 100%;
		height: 100%;
		appearance: none;
		border: none;
		padding: 14px 20px;
		font-size: 16px;
		resize: none;
		overflow: hidden;
		background-color: #40444bd2;
		white-space: pre-wrap;
		color: #dcddde;

		&:focus {
			border: none;
			outline: none;
		}
	}
</style>
