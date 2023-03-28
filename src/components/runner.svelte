<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Parser from '../logic/parser';
	import HiddenLayerCaracteristicStore from '../stores/hidden_layer';
	import OutputLayerCaracteristicStore from '../stores/output_layer';
	import { min_max_normalizer } from '../logic/normalizer';
	import ModelClass from '../logic/model';
	import AccuracyStore from '../stores/accuracy';
	import { sleep } from '../utils/time';

	function handle_run() {
		fetch('/data.csv').then((v) => {
			v.text().then(async (txt) => {
				const patients = Parser(txt);

				min_max_normalizer(patients);

				const model = new ModelClass(
					$HiddenLayerCaracteristicStore,
					$OutputLayerCaracteristicStore
				);

				AccuracyStore.reset()

				for (let i = 0; i < 300; i++) {
					console.log('**********************************', i);
					model.train(patients);
					const accuracy = model.get_accuracy(patients);
					console.log(accuracy);
					AccuracyStore.push(accuracy);
					await sleep(50)
				}
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
