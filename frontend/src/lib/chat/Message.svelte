<script lang="ts">
	import { parseDate } from "@utils/dateUtils";

	export let user: String;
	export let message: string;
	export let attachedMessage: boolean;
	export let date: Date;
</script>

<div class="message">
	{#if !attachedMessage}
		<div class="header">
			<h6>{user}</h6>
			<span>{parseDate(date)}</span>
		</div>
	{/if}
	<p>{message}</p>
</div>

<style lang="scss">
	.message {
		display: flex;
		flex-direction: column;
		gap: 2px;

		h6,
		p {
			font-size: 15px;
		}
	}

	.header {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-top: 1em;

		span {
			font-size: 12px;
			color: #87898d;
		}
	}
</style>
