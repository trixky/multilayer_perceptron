<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { Pie } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import AccuracyStore from '../../stores/accuracy';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	const COLOR_valid_malignant = 'rgb(153, 204, 255)';
	const COLOR_valid_benign = 'rgb(153, 255, 153)';
	const COLOR_invalid_malignant = 'rgb(255, 153, 153)';
	const COLOR_invalid_benign = 'rgb(255, 204, 153)';

	let data = {
		labels: ['valid malignant', 'valid benign', 'invalid malignant', 'invalid benign'],
		datasets: [
			{
				label: 'My First Dataset',
				data: [0, 0, 0, 0],
				backgroundColor: [
					COLOR_valid_malignant,
					COLOR_valid_benign,
					COLOR_invalid_malignant,
					COLOR_invalid_benign
				],
				hoverOffset: 4
			}
		]
	};

	let previous_accuracy_store_length = -1;

	$: if ($AccuracyStore.length != previous_accuracy_store_length && $AccuracyStore.length > 0) {
		previous_accuracy_store_length = $AccuracyStore.length;

		data.datasets[0].data = [
			$AccuracyStore[previous_accuracy_store_length - 1].net.valid.malignant,
			$AccuracyStore[previous_accuracy_store_length - 1].net.valid.benign,
			$AccuracyStore[previous_accuracy_store_length - 1].net.invalid.malignant,
			$AccuracyStore[previous_accuracy_store_length - 1].net.invalid.benign
		];
	}

	const config = {
		type: 'pie',
		data: data,
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top'
				},
				title: {
					display: true,
					text: 'Chart.js Pie Chart'
				}
			},
			animation: false
		}
	};
</script>

<!-- ======================================== CONTENT -->
<div class="visual-pie-container">
	<Pie
		{data}
		options={{
			responsive: true,
			animation: {
				duration: 30,
			}
		}}
	/>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
    .visual-pie-container {
        @apply my-8;
    }
</style>
