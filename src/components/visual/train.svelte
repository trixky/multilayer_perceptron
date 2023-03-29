<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement
	} from 'chart.js';
	import AccuracyStore from '../../stores/accuracy';
	import Config from '../../config';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement
	);



	function reset_datasets() {
		return [
			{
				label: 'valid malignant',
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.valid.malignant,
				backgroundColor: Config.visuals.colors.diagnosis.valid.malignant,
				yAxisID: 'y'
			},
			{
				label: 'valid benign',
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.valid.benign,
				backgroundColor: Config.visuals.colors.diagnosis.valid.benign,
				yAxisID: 'y'
			},
			{
				label: 'invalid malignant',
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.invalid.malignant,
				backgroundColor: Config.visuals.colors.diagnosis.invalid.malignant,
				yAxisID: 'y'
			},
			{
				label: 'invalid benign',
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.invalid.benign,
				backgroundColor: Config.visuals.colors.diagnosis.invalid.benign,
				yAxisID: 'y'
			},
			{
				label: 'global accuracy',
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.global_accuracy,
				backgroundColor: Config.visuals.colors.global_accuracy,
				yAxisID: 'y1',
				borderDash: [5, 5]
			}
		];
	}

	let data = {
		labels: <Array<number>>Array(800)
			.fill(null)
			.map((_, index) => index + 1),
		datasets: reset_datasets()
	};

	let previous_accuracy_store_length = -1;

	$: if ($AccuracyStore.length != previous_accuracy_store_length && $AccuracyStore.length > 0) {
		if ($AccuracyStore.length < previous_accuracy_store_length) {
			// If it's a new training

			// Reset the datasets
			data.datasets.forEach((_, dataset_index) => {
				data.datasets[dataset_index].data = [];
			});
		}

		// Update the tracker
		previous_accuracy_store_length = $AccuracyStore.length;

		// Get the last accuracy from the last training
		const new_dataset = $AccuracyStore[$AccuracyStore.length - 1];

		// Update each line
		data.datasets[0].data = [...data.datasets[0].data, new_dataset.net.valid.malignant]; // Valid malignant
		data.datasets[1].data = [...data.datasets[1].data, new_dataset.net.valid.benign]; // Valid benign
		data.datasets[2].data = [...data.datasets[2].data, new_dataset.net.invalid.malignant]; // Invalid malignant
		data.datasets[3].data = [...data.datasets[3].data, new_dataset.net.invalid.benign]; // Invalid benign
		data.datasets[4].data = [...data.datasets[4].data, new_dataset.mean * 100]; 

		
	}
</script>

<!-- ======================================== CONTENT -->
<div class="visual-pie-container">
	<Line
		height={200}
		{data}
		options={{
			responsive: true,
			animation: false,
			elements: {
				point: {
					radius: 0
				},
				line: {
					borderWidth: 2
				}
			},
			scales: {
				x: {
					type: 'linear',
					// position: 'left',
					min: 0,
					max: 1000,
					ticks: {
						stepSize: 100,
						showLabelBackdrop: false,
						display: true,
						autoSkip: true,
						maxTicksLimit: 1000,
						callback: function (value, index, ticks) {
							return value;
						}
					}
				},
				xAxis: {
					// The axis for this scale is determined from the first letter of the id as `'x'`
					// It is recommended to specify `position` and / or `axis` explicitly.
					// ticks: {
					// 	stepSize: 50
					// }
					type: 'linear',
					display: false,
					// position: 'left',
					min: 0,
					max: 1000,
					// grid: {
					// 	tickWidth: 50
					// }
					ticks: {
						stepSize: 100,
						showLabelBackdrop: false,
						display: true,
						autoSkip: true,
						maxTicksLimit: 1000
					}
				},
				y: {
					type: 'linear',
					display: true,
					position: 'left',
					min: 0,
					max: 500,
					ticks: {
						stepSize: 50
					}
				},
				y1: {
					type: 'linear',
					display: true,
					position: 'right',
					min: 0,
					max: 100,
					ticks: {
						stepSize: 10
					}
				}
			},
			plugins: {
				legend: {
					display: false
				}
			}
		}}
	/>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.visual-pie-container {
		@apply my-4;
	}
</style>
