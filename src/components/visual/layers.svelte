<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Config from '../../config';
	import HiddenLayerStore from '../../stores/hidden_layer';
	import type { LayerCaracteristics as LayerCaracteristicsModel } from '../../models/layer';

	let ctx: any = undefined;

	$: neurons_nbr = $HiddenLayerStore.reduce((sum, hidden_layer) => sum + hidden_layer.size, 0) + Config.inputs.input_layer.size.default + Config.inputs.output_layer.size.default;

	const input_layer = <LayerCaracteristicsModel>{
		size: Config.inputs.input_layer.size.default
	};

	const output_layer = <LayerCaracteristicsModel>{
		size: Config.inputs.output_layer.size.default
	};

	$: if ($HiddenLayerStore) {
		if (ctx != undefined) {
			// Clear the canva
			ctx.clearRect(
				0,
				0,
				Config.visuals.layers.dimensions.width,
				Config.visuals.layers.dimensions.height
			);

			// Add the input and output layer to the hidden layers
			const layers = [input_layer, ...$HiddenLayerStore, output_layer];

			// Compute the x informations
			const hidden_layer_nbr = layers.length;
			const x_gap = Config.visuals.layers.dimensions.width / (hidden_layer_nbr - 1);
			const max_hidden_layer_size = Math.max(...layers.map((hidden_layer) => hidden_layer.size));

			layers.forEach((hidden_layer, x) => {
				// For each layer
				if (x < hidden_layer_nbr - 1) {
					// Compute the neuron x positions of the current layer
					const x_start = x_gap * x;
					// Compute the neuron x positions of the next layer
					const x_end = x_gap * (x + 1);

					// Compute the y spatial informations of the current layer
					const y_max_ratio = hidden_layer.size / max_hidden_layer_size;
					const y_dimension_with_ratio = Config.visuals.layers.dimensions.height * y_max_ratio;
					const y_gap = y_dimension_with_ratio / (hidden_layer.size - 1);
					const y_off = (Config.visuals.layers.dimensions.height - y_dimension_with_ratio) / 2;

					// Compute the y spatial informations of the next layer
					const next_hidden_layer = layers[x + 1];
					const next_y_max_ratio = next_hidden_layer.size / max_hidden_layer_size;
					const next_y_dimension_with_ratio =
						Config.visuals.layers.dimensions.height * next_y_max_ratio;
					const next_y_gap = next_y_dimension_with_ratio / (next_hidden_layer.size - 1);
					const next_y_off =
						(Config.visuals.layers.dimensions.height - next_y_dimension_with_ratio) / 2;

					for (let y = 0; y < hidden_layer.size; y++) {
						// For each neuron of the current layer

						// Compute the neuron y position of the current layer
						const y_start = y_gap * y + y_off;

						for (let yy = 0; yy < next_hidden_layer.size; yy++) {
							// For each neuron of the next layer

							// Compute the neuron y position of the next layer
							const y_end = next_y_gap * yy + next_y_off;

							// Draw the line between the neurons of the current and the next layer
							ctx.beginPath();
							ctx.moveTo(x_start, y_start);
							ctx.lineTo(x_end, y_end);
							ctx.stroke();
						}
					}
				}
			});
		}
	}

	onMount(() => {
		if (browser) {
			var c: any = document.getElementById('network-canva');

			ctx = c.getContext('2d');
			ctx.lineWidth = Config.visuals.layers.line_width;
		}
	});
</script>

<!-- ======================================== CONTENT -->
<div class="visual-container">
	<p class="neurons-counter">{neurons_nbr} neurons</p>
	<canvas
		id="network-canva"
		width={Config.visuals.layers.dimensions.width}
		height={Config.visuals.layers.dimensions.height}
	/>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.visual-container {
		@apply relative my-2;
	}

	.neurons-counter {
		@apply absolute top-0 right-0 p-2 text-sm opacity-40;
	}

	#network-canva {
		@apply my-5;
	}
</style>
