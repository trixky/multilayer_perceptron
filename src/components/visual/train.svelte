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
	import EpochStore from '../../stores/epoch';
	import TrainTestRatioStore from '../../stores/train_test_ratio';
	import AccuracyStore from '../../stores/accuracy';
	import Config from '../../config';
	import { text } from 'svelte/internal';

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

	const NO_LABEL = "without-label"

	let chart: any = undefined;

	function reset_datasets() {
		return [
			{
				label: Config.visuals.labels.valid.benign,
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.valid.benign,
				backgroundColor: Config.visuals.colors.diagnosis.valid.benign,
				yAxisID: 'y'
			},
			{
				label: Config.visuals.labels.valid.malignant,
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.valid.malignant,
				backgroundColor: Config.visuals.colors.diagnosis.valid.malignant,
				yAxisID: 'y'
			},
			{
				label: Config.visuals.labels.invalid.malignant,
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.invalid.malignant,
				backgroundColor: Config.visuals.colors.diagnosis.invalid.malignant,
				yAxisID: 'y'
			},
			{
				label: Config.visuals.labels.invalid.benign,
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.diagnosis.invalid.benign,
				backgroundColor: Config.visuals.colors.diagnosis.invalid.benign,
				yAxisID: 'y'
			},
			{
				label: NO_LABEL,
				data: <Array<number>>[],
				borderColor: Config.visuals.colors.global_accuracy.default,
				backgroundColor: Config.visuals.colors.global_accuracy.background,
				yAxisID: 'y1',
				borderDash: [5, 5]
			}
		];
	}

	let data = {
		labels: <Array<number>>Array($EpochStore)
			.fill(null)
			.map((_, index) => index + 1),
		datasets: reset_datasets()
	};

	// ---------------------------------------------- Update epoch
	let previous_epoch = -1;
	$: if ($EpochStore != previous_epoch) {
		previous_epoch = $EpochStore;

		const new_labels = <Array<number>>Array($EpochStore)
			.fill(null)
			.map((_, index) => index + 1);
		data.labels = new_labels;

		if (chart != undefined) {
			chart.update();
		}
	}

	// ---------------------------------------------- Update train/test ratio
	let previous_train_test_ratio = -1;
	$: if ($TrainTestRatioStore != previous_train_test_ratio) {
		previous_train_test_ratio = $TrainTestRatioStore;

		if (chart != undefined) {
			chart.update();
		}
	}

	// ---------------------------------------------- Update accuracy
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
		bind:chart
		style="margin-left: -30px; margin-right: -30px;"
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
					title: {
						text: "epochs",
						display: true,
					},
					type: 'linear',
					min: 0,
					max: $EpochStore,
					ticks: {
						stepSize: 50,
						showLabelBackdrop: true,
						display: true,
						autoSkip: true,
						maxTicksLimit: $EpochStore,
						callback: function (value, index, ticks) {
							return value;
						}
					}
				},
				xAxis: {
					type: 'linear',
					display: false,
					min: 0,
					max: $EpochStore,
					ticks: {
						showLabelBackdrop: false,
						display: true,
						autoSkip: true,
						maxTicksLimit: $EpochStore
					}
				},
				y: {
					title: {
						text: "patients",
						display: true,
						padding: 10,
					},
					type: 'linear',
					display: true,
					position: 'left',
					min: 0,
					max: $TrainTestRatioStore > 50 ? 500 : 250,
					ticks: {
						stepSize: 50
					}
				},
				y1: {
					title: {
						text: "global accuracy (%)",
						display: true,
						padding: 10,
					},
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
					display: true,
					labels: {
						boxWidth: 13,
						boxHeight: 13,
						padding: 20,
						filter: function (item) {
							// Remove the "no label" labels
							return !item.text.includes(NO_LABEL);
						},
					},
					position: "top",
					title: {
						font: {
							size: 15
						}
					}
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
