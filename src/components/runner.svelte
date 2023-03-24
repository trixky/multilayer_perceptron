<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Parser from '../logic/parser';
	import ModelStore from '../stores/model';
	import HiddenLayerCaracteristicStore from '../stores/hidden_layer';
	import OutputLayerCaracteristicStore from '../stores/output_layer';
	import { predict_patient, predict_mini_batch } from '../logic/prediction';
	import type MiniBatch from '../models/mini_batch';
	import {estimate_patient_output_layer_cost, estimate_mini_batch_output_layer_cost, estimate_total_cost} from '../logic/cost'

	function handle_run() {
		fetch('/data.csv').then((v) => {
			v.text().then((txt) => {
				const patients = Parser(txt);


				ModelStore.initialize($HiddenLayerCaracteristicStore, $OutputLayerCaracteristicStore);
				ModelStore.randomize();


				console.log("--------------------------------------------- patient_0")
				const patient_0 = patients[0]
				const patient_0_prediction = predict_patient($ModelStore, patient_0);
				console.log("---------- prediction:")
				console.log(patient_0_prediction)

				const patient_0_output_cost_result = estimate_patient_output_layer_cost(patient_0, patient_0_prediction)
				console.log("---------- output_cost:")
				console.log(patient_0_output_cost_result)

				const patient_0_total_cost_result = estimate_total_cost(patient_0_output_cost_result)
				console.log("---------- tota_cost:")
				console.log(patient_0_total_cost_result)

				console.log("--------------------------------------------- patient_1")
				const patient_1 = patients[19]
				const patient_1_prediction = predict_patient($ModelStore, patient_1);
				console.log("---------- prediction:")
				console.log(patient_1_prediction)

				const patient_1_output_cost_result = estimate_patient_output_layer_cost(patient_1, patient_1_prediction)
				console.log("---------- output_cost:")
				console.log(patient_1_output_cost_result)

				const patient_1_total_cost_result = estimate_total_cost(patient_1_output_cost_result)
				console.log("---------- tota_cost:")
				console.log(patient_1_total_cost_result)


				console.log("--------------------------------------------- mini_batch")
				const mini_batch = <MiniBatch>{
					patients: [patient_0, patient_1]
				}
				console.log("---------- mini_batch:")
				console.log(mini_batch)

				const mini_batch_prediction = predict_mini_batch($ModelStore, mini_batch);
				console.log("---------- prediction:")
				console.log(mini_batch_prediction)

				const mini_batch_output_cost_result = estimate_mini_batch_output_layer_cost(mini_batch, mini_batch_prediction)
				console.log("---------- output_cost:")
				console.log(mini_batch_output_cost_result)

				const mini_batch_total_cost_result = estimate_total_cost(mini_batch_output_cost_result)
				console.log("---------- tota_cost:")
				console.log(mini_batch_total_cost_result)

			});
		});
	}
</script>

<!-- ======================================== CONTENT -->
<div class="runner-container">
	<button on:click={handle_run}>train</button>
	<button on:click={handle_run}>predict</button>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.runner-container {
		@apply flex m-auto;
	}

	button {
		@apply mt-2 w-20 mx-2 hover:bg-neutral-100 transition-all duration-150;
		border: solid 1px black;
	}
</style>
