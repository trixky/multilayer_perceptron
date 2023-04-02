<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import ModelStore from '../stores/model';
	import PredictVisual from './visual/predict.svelte';
	import ProgressStore from '../stores/progress';
	import PredictionStore from '../stores/prediction';
	import PatientStore from '../stores/patient';
	import TrainTestRatioStore from '../stores/train_test_ratio';
	import Import from '../components/inputs/import.svelte';
	import Parser from '../logic/parser';

	const GLOBAL_ACCURACY_OFF = 0

	const global_accuracy = tweened(GLOBAL_ACCURACY_OFF, {
		duration: 400,
		easing: cubicOut
	});

	$: if ($PredictionStore != null && $PredictionStore.mean != $global_accuracy) {
		global_accuracy.set($PredictionStore.mean)
	} else if ($PredictionStore == null && $global_accuracy != 0) {
		global_accuracy.set(GLOBAL_ACCURACY_OFF)
	}

	function predict() {
		if ($ModelStore != null) {
			const prediction_patients = $PatientStore.slice(
				0,
				Math.floor(($PatientStore.length * $TrainTestRatioStore) / 100)
			);

			const prediction = $ModelStore.get_accuracy(prediction_patients);
			PredictionStore.set(prediction);
		}
	}

	function handle_predict() {
		if ($ModelStore != null) {
			if ($PatientStore.length === 0) {
				fetch('/data.csv').then((v) => {
					v.text().then(async (txt) => {
						// Reset prediction
						PredictionStore.reset();

						// Initialize patients
						const patients = Parser(txt);

						PatientStore.set(patients);
						PatientStore.normalize_min_max();
						PatientStore.shuffle();
						predict();
					});
				});
			} else {
				predict();
			}
		}
	}
</script>

<!-- ======================================== CONTENT -->
<div class="predict-container">
	<h2>Prediction</h2>
	<div class="text-container">
		<p class="right">
			The training phase use the trained model.<br />The model is tested (fowrward pass) on the
			shuffled patients of the testing dataset. By comparaing the results of each patients with the
			expected ones.
		</p>
	</div>
	<div class="button-container">
		<Import />
		<button
		class="classic-button"
		on:click={handle_predict}
		disabled={$ModelStore == null || $ProgressStore || $PredictionStore != null}>predict</button
		>
	</div>
	<div class="global-accuracy-container">
		<p class="global-accuracy-label">Global accuracy:</p>
		<p class="global-accuracy-value" class:opacity-20={$global_accuracy <= 0.01}>{($global_accuracy * 100).toFixed(2)} %</p>
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

	.button-container {
		@apply my-2;
	}

	.global-accuracy-container {
		@apply flex my-5 text-sm;
	}

	.global-accuracy-value {
		@apply w-14 text-right transition-all duration-150;
	}
</style>
