<!-- ======================================== SCRIPT -->
<script lang="ts">
    import ModelStore from "../stores/model";
	import PredictionVisual from './visual/prediction.svelte'

	function handle_run() {
		
	}
</script>

<!-- ======================================== CONTENT -->
<div class="predict-container">
	<button class="classic-button" on:click={handle_run} disabled={$ModelStore == null}>predict</button>
	<PredictionVisual />
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.predict-container {
		@apply flex flex-col items-center w-full m-auto;
	}
</style>
