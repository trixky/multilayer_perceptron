<!-- ======================================== SCRIPT -->
<script lang="ts">
    import ModelStore from "../stores/model";
	import PredictVisual from './visual/predict.svelte'
	import ProgressStore from '../stores/progress'
	import PredictionStore from '../stores/prediction'
	import PatientStore from '../stores/patient'
	import TrainTestRatioStore from '../stores/train_test_ratio'

	function handle_run() {
		if ($ModelStore != null) {
			const prediction_patients = $PatientStore.slice(0, Math.floor($PatientStore.length * $TrainTestRatioStore / 100));
			
			const prediction = $ModelStore.get_accuracy(prediction_patients)
			PredictionStore.set(prediction)
		}
	}
</script>

<!-- ======================================== CONTENT -->
<div class="predict-container">
	<h2>Prediction</h2>
	<div class="text-container">
		<p class="left">
			The training phase use the trained model.<br>The model is tested (fowrward pass)
			on the shuffled patients of the testing dataset. By comparaing the results of each patients with the
			expected ones.
		</p>
	</div>
	<button class="classic-button" on:click={handle_run} disabled={$ModelStore == null || $ProgressStore}>predict</button>
	<div class="text-container">
		<p class="right">
			The training phase use the trained model.<br>The model is tested (fowrward pass)
			on the shuffled patients of the testing dataset. By comparaing the results of each patients with the
			expected ones.
		</p>
	</div>
	<PredictVisual />
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.predict-container {
		@apply flex flex-col items-center w-full m-auto my-3;
	}

	h2 {
		@apply self-start;
	}

	.text-container {
		@apply text-sm my-3;
		width: 400px;
	}
</style>
