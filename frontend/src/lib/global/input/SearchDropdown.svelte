<script lang="ts">
	import UserPreview from "./UserPreview.svelte";

	export let active: boolean;
	export let data: any[];
</script>

{#if active}
	<div class="dropdown">
		<div class="option">
			{#if data && data?.length == 0}
				<span>No matches found - Try using their email insted</span>
			{:else}
				{#each data as user}
					<UserPreview username={user.username} />
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.dropdown {
		width: 105%;
		height: auto;
		background-color: #27292b;
		border-radius: 7px;
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -8px);
		padding: 13px 0;
	}

	.option {
		padding: 0 20px;

		&:hover {
			background-color: var(--color-blue);
		}
	}
</style>
