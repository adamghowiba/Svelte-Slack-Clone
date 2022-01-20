<script lang="ts">
	import Action from "$lib/global/buttons/Action.svelte";
	import SmallAction from "$lib/global/buttons/SmallAction.svelte";
	import { createEventDispatcher, onMount, run } from "svelte/internal";
	import { Editor } from "@tiptap/core";
	import type { Editor as EditorType } from "@tiptap/core";
	import Placeholder from "@tiptap/extension-placeholder";
	import StarterKit from "@tiptap/starter-kit";
	import Icon from "@iconify/svelte";
	import SubmitChatAction from "$lib/global/buttons/SubmitChatAction.svelte";

	let value: string = "";
	let editor: EditorType;
	let textElement: HTMLElement;

	const dispatch = createEventDispatcher();

	const submitMessage = () => {
		dispatch("submitMessage", value);
		value = "";
		editor.commands.clearContent();
	};

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key == "Enter" && !event.shiftKey) {
			if (value) {
				event.preventDefault();
				submitMessage();
			}
		}
	}

	onMount(() => {
		editor = new Editor({
			element: textElement,
			injectCSS: false,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: "Jot something down"
				})
			],
			onUpdate: ({ editor }) => {
				value = editor.getHTML();
			},
			onTransaction: () => {
				editor = editor;
			}
		});

		return () => {
			editor.destroy();
		};
	});
</script>

<div class="wrap">
	<div class="actions">
		<SmallAction on:click={() => editor.chain().focus().toggleBold().run()}><b>B</b></SmallAction>
		<SmallAction on:click={() => editor.chain().focus().toggleItalic().run()}><i>I</i></SmallAction>
		<SmallAction on:click={() => editor.chain().focus().toggleStrike().run()}><strike>S</strike></SmallAction>
		<div class="seperator" />
		<SmallAction on:click={() => editor.chain().focus().toggleBulletList().run()}>
			<Icon icon="bi:list-ol" width={20} height={20} color="inherit" />
		</SmallAction>
		<SmallAction on:click={() => editor.chain().focus().toggleOrderedList().run()}>
			<Icon icon="bi:list-ul" width={20} height={20} color="#inherit" />
		</SmallAction>
		<div class="seperator" />
		<SmallAction on:click={() => editor.chain().focus().toggleCodeBlock().run()}>
			<Icon icon="bx:bx-code-alt" width={20} height={20} color="#inherit" />
		</SmallAction>
	</div>

	<div on:keydown={handleKeyDown} bind:this={textElement} />
	<div class="actions">
		<SmallAction>D</SmallAction>
		<SmallAction>I</SmallAction>
		<SmallAction>B</SmallAction>
		<div class="submit">
			<SubmitChatAction on:click={submitMessage} active={value.trim().length > 1} />
		</div>
	</div>
</div>

<style lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		position: relative;
		margin: 0 1rem;
		margin-bottom: 1rem;
		border-radius: 8px;
		gap: 0.8rem;
		background-color: #222529;
		padding: 4px 12px;
		border: 1px solid var(--color-tran);
	}
	:global(.ProseMirror:focus) {
		outline: none;
	}
	:global(.is-editor-empty)::after {
		content: "Jot something down..";
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: block;
		color: rgb(146, 146, 146);
		z-index: 100;
	}
	.actions {
		display: flex;
		flex-shrink: 1;
		align-items: center;
		color: rgba(158, 158, 158, 0.836);

		.submit {
			position: relative;
			margin-left: auto;
			bottom: 1.5px;
		}
	}
	.seperator {
		display: inline-block;
		margin: 0 5px;
		height: 75%;
		width: 1px;
		background-color: rgba(114, 114, 114, 0.747);
	}
</style>
