<script lang="ts">
	export let name: string;
	export let desc: string;
	export let imgSrc: string;
</script>

<div class="blurb">
	<img src={imgSrc} alt="Workspace" />
	<div class="blurb__content">
		<h6>{name}</h6>
		<span>{desc}</span>
	</div>
</div>

<style lang="scss">
	.blurb {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 7px 0;

		img {
			width: 36px;
			border-radius: 3px;
			height: 36px;
		}
		h6 {
			font-size: 15px;
		}
		span {
			font-size: 13px;
		}
	}
</style>
