<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Config from '../../config';
	import ProgressStore from '../../stores/progress';
	import ModelStore from '../../stores/model';
	import type BackupModel from '../../models/backup';
	import Model from '../../logic/model';
	import PatientStore from '../../stores/patient';
	import TrainTestRatioStore from '../../stores/train_test_ratio';
	import PredictionStore from '../../stores/prediction';
	import Parser from '../../logic/parser';

	const INPUT_FILE_ID = 'input-file-id';

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

	async function import_file(e: any) {
		// https://stackoverflow.com/questions/74139459/how-to-use-filereader-in-svelte

		const file = e.target.files[0];

		if (file == null) return; // If user cancels file selection

		try {
			const backup_file: string = await file.text();
			const backup_model: BackupModel = JSON.parse(backup_file) as BackupModel;

			if ($ModelStore == null) $ModelStore = new Model(backup_model.hidden_layer_caracteristics);
			$ModelStore?.import(backup_model);

			handle_predict();
		} catch (e) {
			alert('backup file corrupted');
		}
	}

	function handle_import() {
		document?.getElementById(INPUT_FILE_ID)?.click();
	}
</script>

<!-- ======================================== CONTENT -->
<div class="export-container">
	<input
		id={INPUT_FILE_ID}
		class="hidden"
		type="file"
		accept={Config.backup.file.extension}
		on:change={import_file}
	/>
	<button class="classic-button" on:click={handle_import} disabled={$ProgressStore}>import</button>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.export-container {
		@apply relative flex flex-col m-auto w-full;
	}
</style>
