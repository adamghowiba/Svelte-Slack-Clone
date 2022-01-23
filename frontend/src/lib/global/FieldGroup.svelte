<script lang="ts">
</script>

<div class="wrapper">
	<div class="field">
		<slot />
	</div>

	<div class="button">
		<slot name="button" />
	</div>
</div>

<style lang="scss">
	.wrapper {
		background-color: #1a1d21;
		border-radius: 7px;
		border: 1px solid rgba(236, 236, 236, 0.151);

		.button {
			padding: 1rem;

			&:hover {
				background-color: rgba(87, 87, 87, 0.123);
				cursor: pointer;
			}
		}
	}
</style>
