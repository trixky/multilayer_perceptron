<!-- ======================================== SCRIPT -->
<script lang="ts">
	import { Doughnut } from 'svelte-chartjs';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
	import PredictionStore from '../../stores/prediction';
	import Config from '../../config';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	function generate_default_data(): Array<number> {
		return [0, 0, 0, 0, 1];
	}

	let data = {
		labels: [
			Config.visuals.labels.valid.benign,
			Config.visuals.labels.valid.malignant,
			Config.visuals.labels.invalid.benign,
			Config.visuals.labels.invalid.malignant
		],
		datasets: [
			{
				data: generate_default_data(),
				backgroundColor: [
					Config.visuals.colors.diagnosis.valid.benign,
					Config.visuals.colors.diagnosis.valid.malignant,
					Config.visuals.colors.diagnosis.invalid.benign,
					Config.visuals.colors.diagnosis.invalid.malignant,
					Config.visuals.colors.default,
				],
				hoverOffset: 4
			}
		]
	};
	let previous_prediction: any = -1;

	$: if ($PredictionStore != previous_prediction) {
		previous_prediction = $PredictionStore;

		if ($PredictionStore != null) {
			data.datasets[0].data = [
				$PredictionStore.net.valid.benign,
				$PredictionStore.net.valid.malignant,
				$PredictionStore.net.invalid.benign,
				$PredictionStore.net.invalid.malignant,
				0
			];
		} else {
			data.datasets[0].data = generate_default_data();
		}
	}
</script>

<!-- ======================================== CONTENT -->
<div class="visual-pie-container">
		<!-- style="width: 260px; margin-top: -30px; margin-bottom: -30px;" -->
		<Doughnut
		{data}
		style="width: 260px;"
		options={{
			responsive: false,
			animation: {
				duration: 1000
			},
			plugins: {
				legend: {
					display: true,
					labels: {
						boxWidth: 18,
						boxHeight: 18,
						padding: 20
					},
					position: 'bottom',
					title: {
						font: {
							size: 15
						}
					}
				},
			}
		}}
	/>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.visual-pie-container {
		@apply my-2 mx-auto;
		overflow: hidden;
	}
</style>
