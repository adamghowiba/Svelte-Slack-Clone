<script lang="ts">
	type Type = 'button' | 'link';

	export let type: Type = 'link';
	export let href = '/';
	export let buttonType = 'button';
</script>

{#if type == 'button'}
	<button type={buttonType} on:click><slot /></button>
{/if}

{#if type == 'link'}
	<a on:click {href}><slot /></a>
{/if}

<style lang="scss">
	a,
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--color-blue);
		color: white;
		font-weight: var(--fw-bold);
		padding: 12px 15px;
		border-radius: 3px;
		text-transform: capitalize;
	}
	button {
		appearance: none;
		border: none;
		outline: none;
	}
</style>
