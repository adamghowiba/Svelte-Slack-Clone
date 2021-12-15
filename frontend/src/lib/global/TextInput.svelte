<script lang="ts">
	export let name;
	export let value;
	export let label = null;
</script>

<div class="wrap">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<input type="text" {name} bind:value />
</div>

<style lang="scss">
    .wrap {
        display: flex;
        gap: 6px;
        flex-direction: column;
        text-align: left;

        label {
            text-transform: uppercase;
            font-size: var(--fs-sm);
            font-weight: var(--fw-bold);
        }
    }

    input {
        appearance: none;
        border: none;
        outline: none;
        padding: 12px;
        border-radius: 3px;
        background-color: #E8F0FE;
        color: var(--color-gray-s4);
        font-weight: var(--fw-md);
        font-size: 15px;
    }
</style>
