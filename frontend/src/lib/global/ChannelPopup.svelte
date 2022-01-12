<script lang="ts">
	export let navItems: string[];
    let selected = 'about';
</script>

<div class="popup">
	<header class="head">
        <div class="head__content">
            <slot name="head" />
        </div>

		<div class="nav-items">
			{#each navItems as item}
            <div class="nav-items__item">
				<h6>{item}</h6>
                <div class="nav-items__underline" class:active={selected == item}></div>
            </div>
			{/each}
		</div>
	</header>

    <div class="body">
        <slot name="body" />
    </div>
</div>

<style lang="scss">
	.popup {
		width: 400px;
		height: 500px;
		background-color: #222529;
	}
	.head {
		background-color: #1a1d21;
        display: flex;
        flex-direction: column;
		width: 100%;
		height: 100px;
    }
    .body {
        padding: 1rem;
    }
    .head {
        padding: 1rem 1rem 0 1rem;
    }
	.nav-items {
		display: inline-flex;
        width: max-content;
		margin-top: auto;
		gap: 1.3rem;

        &__underline {
            width: 10px;
            height: 2px;
            background-color: 1px solid red;
            
            &.active {
                background-color: 1px solid red;
            }
        }
	}
</style>
