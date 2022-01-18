<script lang="ts">
	import { emoji } from "$lib/emoji_v2";
	import EmojiTopbar from "./EmojiTopbar.svelte";

	const handleMouseEnter = (event: Event) => {
		const target = event.target as HTMLElement;

		target.style.backgroundColor = "coral";
	};
	const handleMouseLeave = (event: Event) => {
		let timeout: NodeJS.Timeout;
		const target = event.target as HTMLElement;
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => {
			target.style.backgroundColor = "transparent";
		}, 80);
	};

	function getEmojiByGroup(emoji: any[], seperator): [string, any][] {
		const result = emoji.reduce((acc, obj) => {
			const key = obj[seperator];
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
			return acc;
		}, {});

		return Object.entries(result);
	}

	const groupedEmojis = getEmojiByGroup(emoji.emojis, "category");
</script>

<div class="picker">
	<EmojiTopbar />
	<div class="emojis">
		{#each groupedEmojis as [cat, obj]}
			<h6>{cat}</h6>
			{#each obj as emojiObj}
				<div class="emoji" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
					<span>
						{emojiObj.emoji}
					</span>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style lang="scss">
	.picker {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: 280px;
		border-radius: 7px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #1a1d21;
		border: 1px solid var(--color-tran);
		z-index: 100;
	}

	.emojis {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		padding: 0 10px;
		justify-content: space-between;
		overflow-y: auto;
		width: 100%;
		height: 309px;

		h6 {
			position: sticky;
			width: 100%;
			color: #d1d2d3;
			font-size: 14px;
			font-weight: bold;
			text-transform: capitalize;
			padding: 5px 0;
		}
	}

	.emoji {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		width: 35px;
		height: 32px;
		padding: 6px;
		border-radius: 7px;

		&:hover {
			cursor: pointer;
		}
	}
</style>
