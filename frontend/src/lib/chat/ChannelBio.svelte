<script lang="ts">
	import Icon from '@iconify/svelte';

	type ChannelType = 'user' | 'group';

	export let channel: string;
	export let type: ChannelType;
	export let members: number = 0;

	let iconSize = 22;
</script>

<div class="wrap">
	<div class="description">
		<div class="icon">
			{#if type == 'user'}
				<Icon icon="bx:bx-at" color="var(--color-muted)" width={21} height={21} />
			{:else}
				<Icon icon="fontisto:hashtag" color="var(--color-muted)" inline={true} hAlig />
			{/if}
		</div>

		<header>
			<h5>{channel}</h5>

			{#if type == 'group'}
				<div class="members">
					<span class="members__count">{members} member{members > 1 ? 's' : ''}</span>
					<span class="members__add">
						<Icon icon="akar-icons:plus" width="16px" height="16px" color="var(--color-gray-s1)" />
						<span>Add member</span>
					</span>
				</div>
			{/if}
		</header>
	</div>

	<div class="actions">
		<div class="actions__group">
			<div class="icon">
				<Icon icon="bi:pin-angle" width={iconSize} height={iconSize} color="inherit" />
			</div>
			<div class="icon">
				<Icon
					icon="ant-design:info-circle-outlined"
					width={iconSize}
					height={iconSize}
					color="inherit"
				/>
			</div>
		</div>

		<div class="divider" />

		<div class="actions__group">
			<div class="icon">
				<Icon icon="feather:settings" width={iconSize} height={iconSize} color="inherit" />
			</div>
			<div class="icon">
				<Icon icon="bi:three-dots-vertical" width={iconSize} height={iconSize} color="inherit" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.wrap {
		position: sticky;
		top: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 1.5em 3em;
		border-bottom: 1px solid rgba(114, 114, 114, 0.345);
	}

	.actions {
		display: flex;
		gap: 1rem;
		color: var(--color-muted);

		&__group {
			display: flex;
			align-items: center;
			gap: 1rem;
		}
		.icon {
			transition: color 0.15s ease-in-out;
		}

		.icon:hover {
			color: var(--color-gray-s2);
		}

		.divider {
			height: 26px;
			width: 1.6px;
			background-color: rgba(114, 114, 114, 0.521);
		}
	}

	.description {
		display: flex;
		gap: 1rem;

		.icon {
			padding-top: 2px;
		}

		header {
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
		}
	}
	.members {
		display: flex;
		align-items: center;
		gap: 1em;

		&__count {
			color: var(--color-muted);
		}

		&__add {
			display: flex;
			align-items: center;
			gap: 0.3rem;
		}
	}
</style>
