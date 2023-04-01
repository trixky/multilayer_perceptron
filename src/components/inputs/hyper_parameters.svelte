<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Config from '../../config';
	import LearningRateStartStore from '../../stores/learning_rate_start';
	import LearningRateEndStore from '../../stores/learning_rate_end';
	import EpochStore from '../../stores/epoch';
	import TrainTestRatio from '../../stores/train_test_ratio';
	import ProgressStore from '../../stores/progress';

	function handle_range_learning_rate(e: any) {
		LearningRateStartStore.set(+e.target.value);
	}

	function handle_range_final_learning_rate(e: any) {
		LearningRateEndStore.set(+e.target.value);
	}

	function handle_range_epochs(e: any) {
		EpochStore.set(+e.target.value);
	}

	function handle_range_dataset_ratio(e: any) {
		TrainTestRatio.set(+e.target.value);
	}
</script>

<!-- ======================================== CONTENT -->
<div class="hyper-parameters">
	<h2>Hyper parameters</h2>
	<div class="inputs-container">
		<div class="input-container">
			<input
				type="range"
				min={Config.inputs.learning_rate.start.min}
				max={Config.inputs.learning_rate.start.max}
				step={Config.inputs.learning_rate.start.step}
				on:input={handle_range_learning_rate}
				value={$LearningRateStartStore}
				disabled={$ProgressStore}
			/>
			<p class="value">x {$LearningRateStartStore.toFixed(2)}</p>
			<p class="label">learning rate</p>
		</div>
		<div class="input-container">
			<input
				type="range"
				min={Config.inputs.learning_rate.end.min}
				max={Config.inputs.learning_rate.end.max}
				step={Config.inputs.learning_rate.end.step}
				on:input={handle_range_final_learning_rate}
				value={$LearningRateEndStore}
				disabled={$ProgressStore}
			/>
			<p class="value">x {$LearningRateEndStore.toFixed(2)}</p>
			<p class="label">final learning rate</p>
		</div>
		<div class="input-container">
			<input
				type="range"
				min={Config.inputs.epochs.min}
				max={Config.inputs.epochs.max}
				step={Config.inputs.epochs.step}
				on:input={handle_range_epochs}
				value={$EpochStore}
				disabled={$ProgressStore}
			/>
			<p class="value">{$EpochStore}</p>
			<p class="label">epochs</p>
		</div>
		<div class="input-container">
			<input
				type="range"
				min={Config.inputs.dataset.train_test_ratio.min}
				max={Config.inputs.dataset.train_test_ratio.max}
				step={Config.inputs.dataset.train_test_ratio.step}
				on:input={handle_range_dataset_ratio}
				value={$TrainTestRatio}
				disabled={$ProgressStore}
			/>
			<p class="value">{$TrainTestRatio} %</p>
			<p class="label">train/test dataset ratio</p>
		</div>
	</div>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.hyper-parameters {
		@apply mt-0 mb-6;
	}

	h2 {
		@apply text-right mb-6;
	}

	.inputs-container {
		@apply w-fit m-auto;
	}

	.input-container {
		@apply flex my-2 text-sm;
	}

	.input-container > p {
		@apply mx-1 h-fit;
	}

	.input-container > p.label {
		@apply opacity-40;
	}

	.input-container > p.value {
		@apply w-10 h-fit text-center;
	}

	input[type='range'] {
		@apply w-40 mx-3 my-3 -translate-y-[2px] transition-all duration-150 opacity-40;
		-webkit-appearance: none;
		background-color: black;
		height: 1px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: black;
		width: 1px;
		height: 16px;
	}

    input[type='range']:disabled {
		@apply cursor-not-allowed opacity-10;
	}
</style>
