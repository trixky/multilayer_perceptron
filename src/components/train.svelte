<!-- ======================================== SCRIPT -->
<script lang="ts">
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
	import { fade } from 'svelte/transition';

	const EPOCHS = 800; // HARDCODED

	let in_progress = false;
	let epoch_index = -1;

	$: progression_percentage = epoch_index >= 0 ? Math.ceil((epoch_index / EPOCHS) * 100) : -1;

	function handle_run() {
		fetch('/data.csv').then((v) => {
			v.text().then(async (txt) => {
				epoch_index = 0;
				// --------------------------------------------- Initialization
				// Initialize patients
				in_progress = true;
				const patients = Parser(txt);
				PatientStore.set(patients);
				PatientStore.normalize_min_max();
				PatientStore.shuffle();
				const training_patients = $PatientStore.slice(0, $TrainTestRatioStore);

				// Initialize model
				ModelStore.reset();
				const model = new ModelClass(
					$HiddenLayerCaracteristicStore,
					$OutputLayerCaracteristicStore
				);

				// Initialize accuracy
				AccuracyStore.reset();

				// Initialize the training loop

				// --------------------------------------------- Training loop
				for (; epoch_index < EPOCHS; epoch_index++) {
					// For each epoch

					// Train the model
					model.train(training_patients);

					// Get and update the accuracy
					const accuracy = model.get_accuracy(training_patients);
					AccuracyStore.push(accuracy);

					// Make a pause for the front
					await sleep(10); // HARDCODED
				}

				// Save the model
				ModelStore.set(model);
				in_progress = false;
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
	<button class="classic-button" on:click={handle_run} disabled={in_progress}>train</button>
	<TrainVisual />
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.train-container {
		@apply relative flex flex-col m-auto w-full;
	}

	header {
		@apply flex items-end;
	}

	.progression-percentage {
		@apply w-12 text-sm text-right opacity-25;
	}

	button {
		@apply m-auto;
	}
</style>
