<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import Config from '../config'
	import Parser from '../logic/parser';
	import HiddenLayerCaracteristicStore from '../stores/hidden_layer';
	import OutputLayerCaracteristicStore from '../stores/output_layer';
	import TrainTestRatioStore from '../stores/train_test_ratio';
	import ModelClass from '../logic/model';
	import AccuracyStore from '../stores/accuracy';
	import { sleep } from '../utils/time';
	import ModelStore from '../stores/model';
	import PatientStore from '../stores/patient';
	import TrainVisual from './visual/train.svelte';
	import EpochStore from '../stores/epoch';
	import LearningRateStartStore from '../stores/learning_rate_start';
	import LearningRateEndStore from '../stores/learning_rate_end';
	import ProgressStore from '../stores/progress'
	import PredictionStore from '../stores/prediction'
	import Export from './inputs/export.svelte'

	let epoch_index = -1;

	$: progression_percentage = epoch_index >= 0 ? Math.ceil((epoch_index / $EpochStore) * 100) : -1;

	let current_learning_rate = 0

	function handle_run() {
		fetch('/data.csv').then((v) => {
			v.text().then(async (txt) => {
				epoch_index = 0;
				// --------------------------------------------- Initialization
				// Reset prediction
				PredictionStore.reset()

				// Initialize patients
				$ProgressStore = true;
				const patients = Parser(txt);
				PatientStore.set(patients);
				PatientStore.normalize_min_max();
				PatientStore.shuffle();
				const training_patients = $PatientStore.slice(0, Math.floor($PatientStore.length * $TrainTestRatioStore / 100));

				// Initialize model
				ModelStore.reset();
				const model = new ModelClass(
					$HiddenLayerCaracteristicStore,
					$OutputLayerCaracteristicStore
				);

				// Initialize accuracy
				AccuracyStore.reset();

				// --------------------------------------------- Training loop
				for (; epoch_index < $EpochStore; epoch_index++) {
					// For each epoch

					// Compute the current learning rate
					current_learning_rate = $LearningRateStartStore + (($LearningRateEndStore - $LearningRateStartStore) * (progression_percentage / 100))

					// Train the model
					model.train(training_patients);

					// Get and update the accuracy
					const accuracy = model.get_accuracy(training_patients);
					AccuracyStore.push(accuracy);

					// Make a pause for the front
					await sleep(Config.visuals.sleep);
				}

				// Save the model
				ModelStore.set(model);
				$ProgressStore = false;
			});
		});
	}
</script>

<!-- ======================================== CONTENT -->
<div class="train-container">
	<header>
		<h2>Training</h2>
		{#if progression_percentage >= 0}
			<p class="progression-percentage" transition:fade>{progression_percentage} %</p>
		{/if}
	</header>
	<div class="text-container">
		<p class="left">
			The training phase initialize a model with random attributes.<br>The model is tested (fowrward pass)
			on the shuffled patients of the training dataset. By comparaing the results of each patients with the
			expected ones, an error is computed. Attributes of the model are corrected (error
			back-propagation) to fit a little more with these expected results (backward pass) according to these errors. This process repeated x time as an epoch.
		</p>
	</div>
	<button class="classic-button" on:click={handle_run} disabled={$ProgressStore}>train</button>
	<div class="text-container">
		<p class="right">
			The training phase initialize a model with random attributes.<br>The model is tested (fowrward pass)
			on the shuffled patients of the training dataset. By comparaing the results of each patients with the
			expected ones, an error is computed. Attributes of the model are corrected (error
			back-propagation) to fit a little more with these expected results (backward pass) according to these errors. This process repeated x time as an epoch.
		</p>
	</div>
	<TrainVisual />
	<Export />
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.train-container {
		@apply relative flex flex-col m-auto w-full;
	}

	header {
		@apply flex items-end mb-3;
	}

	.progression-percentage {
		@apply w-12 text-sm text-right opacity-25;
	}
</style>
