<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Config from '../../config';
	import TrainRatio from '../../stores/train_test_ratio';
</script>

<!-- ======================================== CONTENT -->
<div class="train-test-container">
	<p>train/test dataset ratio</p>
	<div class="range-container">
		<p class="value">{$TrainRatio}</p>
		<input
			type="range"
			min={Config.inputs.dataset.train_test_ratio.min}
			max={Config.inputs.dataset.train_test_ratio.max}
			bind:value={$TrainRatio}
		/>
		<p class="value">{Config.inputs.dataset.size - $TrainRatio}</p>
	</div>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.train-test-container {
		@apply w-fit m-auto text-center mb-5;
	}

	p {
		@apply text-sm mb-1;
	}

	.range-container {
		@apply flex text-sm items-center;
	}

	.range-container > p {
		@apply m-0  opacity-40;
	}

	input[type='range'] {
		@apply w-40 mx-5 my-3;
		-webkit-appearance: none;
		background-color: #ddd;
		height: 6px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: #999;
		width: 8px;
		height: 20px;
	}

	.value {
		@apply w-8 text-center;
	}
</style>
