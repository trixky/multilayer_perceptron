<!-- ======================================== SCRIPT -->
<script lang="ts">
	import HiddenLayerStore from '../../../stores/hidden_layer';
	import OutputLayerStore from '../../../stores/output_layer';
	import Config from '../../../config';
	import type { LayerCaracteristics as LayerCaracteristicsModel } from '../../../models/layer';

	export let index: number;
	export let first = false;
	export let last = false;

	export let caracterisics: LayerCaracteristicsModel | undefined;

	export let input_layer = false;
	export let output_layer = false;

	$: label = input_layer ? 'input' : output_layer ? 'output' : 'layer ' + (index + 1).toString();

	function handle_remove_layer(index: number) {
		HiddenLayerStore.remove_layer(index);
	}

	function handle_increase_size(index: number) {
		HiddenLayerStore.increase_layer_size(index);
	}

	function handle_decrease_size(index: number) {
		HiddenLayerStore.decrease_layer_size(index);
	}

	function handle_change_function(index: number) {
		if (output_layer) {
			OutputLayerStore.change_layer_function(index);
		} else {
			HiddenLayerStore.change_layer_function(index);
		}
	}

	function handle_move_up(index: number) {
		HiddenLayerStore.move_up_layer(index);
	}

	function handle_move_down(index: number) {
		HiddenLayerStore.move_down_layer(index);
	}
</script>

<!-- ======================================== CONTENT -->
<div class="hidden-layer" style="transform: translateX({(index + 1) * 12}px)">
	<div class="hidden-layer-caracteristic">
		<p class="hidden-layer-caracteristic-label">{label}</p>
		<div class="hidden-layer-caracteristic-input">
			{#if caracterisics != undefined}
				<p class="size">{caracterisics.size}</p>
			{:else if input_layer}
				<p class="size">{Config.inputs.input_layer.size.default}</p>
			{:else if output_layer}
				<p class="size">{Config.inputs.output_layer.size.default}</p>
			{/if}
			{#if !input_layer}
				<div
					class="hidden-layer-caracteristic-input-modificator"
					class:invisible={input_layer || output_layer}
				>
					<button
						class="icon-button modificator-button"
						on:click={() => handle_increase_size(index)}
					>
						<img class="icon" src="/icons/plus.svg" alt="plus" />
					</button>
					<button
						class="icon-button modificator-button"
						on:click={() => handle_decrease_size(index)}
					>
						<img class="icon" src="/icons/minus.svg" alt="minus" />
					</button>
				</div>
			{/if}
		</div>
		<div class="hidden-layer-caracteristic-input">
			{#if caracterisics != undefined || output_layer}
				<p class="function">{caracterisics != undefined ? caracterisics.function : $OutputLayerStore.function}</p>
				<div class="hidden-layer-caracteristic-input-modificator">
					<button
						class="icon-button modificator-button"
						on:click={() => {
							handle_change_function(index);
						}}
					>
						<img class="icon" src="/icons/refresh.svg" alt="change" />
					</button>
				</div>
			{/if}
		</div>
	</div>
	{#if !input_layer && !output_layer}
		<div class="hidden-layer-management">
			<button class="icon-button" disabled={first} on:click={() => handle_move_up(index)}>
				<img class="icon" src="/icons/arrow.svg" style="transform: scaleY(-1);" alt="up" />
			</button>
			<button class="icon-button" disabled={last} on:click={() => handle_move_down(index)}>
				<img class="icon" src="/icons/arrow.svg" alt="down" />
			</button>
			<button
				class="icon-button"
				disabled={(first && last) ||
					$HiddenLayerStore.length <= Config.inputs.hidden_layers.number.min}
				on:click={() => handle_remove_layer(index)}
			>
				<img class="icon" src="/icons/remove.svg" alt="remove" />
			</button>
		</div>
	{/if}
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.hidden-layer {
		@apply relative w-fit mb-[2px];
	}

	.hidden-layer-management {
		@apply absolute -right-20 top-[9px] opacity-0 transition-all duration-150;
	}

	.hidden-layer:hover > .hidden-layer-management {
		@apply opacity-100;
	}

	.hidden-layer-caracteristic {
		@apply flex my-1 w-fit bg-white pt-1;
		border-top: solid 1px black;
		border-left: solid 1px black;
	}

	.hidden-layer-caracteristic-label {
		@apply px-2 w-16 py-[1px] text-center;
		border-bottom: solid 1px black;
		border-right: solid 1px black;
	}

	.hidden-layer-caracteristic-input {
		@apply flex mx-2;
	}

	.hidden-layer-caracteristic-input > p {
		@apply text-right;
	}

	.hidden-layer-caracteristic-input > .size {
		@apply w-10;
	}

	.hidden-layer-caracteristic-input > .function {
		@apply w-[94px];
	}

	.hidden-layer-caracteristic-input-modificator {
		@apply flex ml-2;
	}

	.modificator-button {
		@apply w-fit h-fit;
	}

	.icon {
		width: 20px;
		height: 20px;
	}

	.icon-button {
		transform: translateY(2px) !important;
	}

	.icon-button > .icon {
		@apply opacity-20  transition-all duration-150;
	}

	.icon-button:not([disabled]):hover > .icon {
		@apply opacity-100;
	}

	button:disabled {
		@apply opacity-30 cursor-not-allowed;
	}
</style>
