<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import AccuracyStore from '../../stores/accuracy';
	import Config from '../../config';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	let data = {
		labels: ['valid benign', 'valid malignant', 'invalid benign', 'invalid malignant'],
		datasets: [
			{
				label: 'My First Dataset',
				data: [0, 0, 0, 0],
				backgroundColor: [
					Config.visuals.colors.diagnosis.valid.benign,
					Config.visuals.colors.diagnosis.valid.malignant,
					Config.visuals.colors.diagnosis.invalid.benign,
					Config.visuals.colors.diagnosis.invalid.malignant,
				],
				hoverOffset: 4
			}
		]
	};

	let previous_accuracy_store_length = -1;

	$: if ($AccuracyStore.length != previous_accuracy_store_length && $AccuracyStore.length > 0) {
		previous_accuracy_store_length = $AccuracyStore.length;

		data.datasets[0].data = [
			$AccuracyStore[previous_accuracy_store_length - 1].net.valid.benign,
			$AccuracyStore[previous_accuracy_store_length - 1].net.valid.malignant,
			$AccuracyStore[previous_accuracy_store_length - 1].net.invalid.benign,
			$AccuracyStore[previous_accuracy_store_length - 1].net.invalid.malignant,
		];
	}
</script>

<!-- ======================================== CONTENT -->
<div class="visual-pie-container">
	<Doughnut
	{data}
	style="width: 360px; margin-top: -60px; margin-bottom: -60px; !important"
		options={{
			responsive: false,
			animation: {
				duration: 30
			},
			plugins: {
				legend: {
					// display: false,
					position: "right",
					labels: {
						// boxPadding: 140,
						padding: 20,
					}
				}
			}
		}}
	/>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.visual-pie-container {
		@apply my-2 mx-auto;
		/* height: 400px; */
		/* margin-top: -60px !important;
		margin-bottom: -60px !important; */
		overflow: hidden;
	}
</style>
