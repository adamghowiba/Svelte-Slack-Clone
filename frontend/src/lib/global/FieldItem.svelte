<script lang="ts">
	type BorderType = "top" | "bottom" | "left" | "right";

	export let groupName: string;
	export let desc: string;
	export let hasBorder: boolean = false;
	export let hideBorder: [BorderType?, BorderType?, BorderType?, BorderType?] = [];
	export let canEdit: boolean = true;

	function generateHiddenBorderStyle() {
		const styles = [];
		hideBorder.forEach((type) => {
			styles.push(`border-${type}: none;`);
		});

		return styles.join(" ");
	}
</script>

<div class="group" class:hasBorder class:canEdit style={generateHiddenBorderStyle()} on:click>
	<div class="group__data">
		<h6 class="group__groupName">{groupName}</h6>
		<h6 class="group__desc">{desc}</h6>
	</div>

	{#if canEdit}
		<button class="group__edit"> Edit </button>
	{/if}
</div>

<style lang="scss">
	.group {
		display: flex;
		justify-content: space-between;
		background-color: #1a1d21;
		padding: 1rem;
		border-radius: inherit;
		
		&.canEdit:hover {
			background-color: rgba(87, 87, 87, 0.123);
			cursor: pointer;
		}

		&.hasBorder {
			border-radius: 7px;
			border: 1px solid rgba(236, 236, 236, 0.151);
		}

		&__groupName {
			font-weight: bold;
			color: var(--color-gray-s3);
		}

		&__desc {
			font-weight: 400;
			color: #dcdddeb7;
		}

		&__data {
			display: flex;
			flex-direction: column;
		}

		&__edit {
			align-self: flex-start;
			font-weight: bold;
			appearance: none;
			background-color: transparent;
			color: var(--color-blue);
			outline: none;
			border: none;
			padding: 0;

			&:hover {
				border-bottom: 1px solid var(--color-blue);
				filter: brightness(1.4);
				cursor: pointer;
			}
		}
	}
</style>
