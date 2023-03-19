<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Parser from '../logic/parser';
	import HiddenLayerCaracteristicStore from '../stores/hidden_layer_caracteristic';
	import { Functions } from '../models/hidden_layer';
	import config from '../config';

	function handle_run() {
		console.log('*** handle_run');
		fetch('/data.csv').then((v) => {
			v.text().then((txt) => {
				console.log(Parser(txt));
			});
		});
	}

	function handle_remove_layer(index: number) {
		HiddenLayerCaracteristicStore.remove_layer(index);
	}

	function handle_add_layer() {
		HiddenLayerCaracteristicStore.add_last_copy_layer();
	}

	function handle_increase_size(index: number) {
		HiddenLayerCaracteristicStore.increase_layer_size(index);
	}

	function handle_decrease_size(index: number) {
		HiddenLayerCaracteristicStore.decrease_layer_size(index);
	}

	function handle_change_function(index: number) {
		HiddenLayerCaracteristicStore.change_layer_function(index)
	}

	function handle_move_up(index: number) {
		HiddenLayerCaracteristicStore.move_up_layer(index)
	}

	function handle_move_down(index: number) {
		HiddenLayerCaracteristicStore.move_down_layer(index)
	}
</script>

<!-- ======================================== CONTENT -->
<h2>Hidden layers</h2>
<div
	class="hidden-layer-container"
	style="transform: translateX(-{$HiddenLayerCaracteristicStore.length * 6}px)"
>
	{#each $HiddenLayerCaracteristicStore as hidden_layer_caracteristic, hidden_layer_caracteristic_index (hidden_layer_caracteristic_index)}
		{@const first = hidden_layer_caracteristic_index == 0}
		{@const last = hidden_layer_caracteristic_index == $HiddenLayerCaracteristicStore.length - 1}
		<div
			class="hidden-layer"
			style="transform: translateX({hidden_layer_caracteristic_index * 12}px)"
		>
			<div class="hidden-layer-caracteristic">
				<p class="hidden-layer-caracteristic-label">layer {hidden_layer_caracteristic_index + 1}</p>
				<div class="hidden-layer-caracteristic-input">
					<p class="size">{hidden_layer_caracteristic.size}</p>
					<div class="hidden-layer-caracteristic-input-modificator">
						<button
							class="icon-button modificator-button"
							on:click={() => handle_increase_size(hidden_layer_caracteristic_index)}
						>
							<img class="icon" src="/icons/plus.svg" alt="plus" />
						</button>
						<button
							class="icon-button modificator-button"
							on:click={() => handle_decrease_size(hidden_layer_caracteristic_index)}
						>
							<img class="icon" src="/icons/minus.svg" alt="minus" />
						</button>
					</div>
				</div>
				<div class="hidden-layer-caracteristic-input">
					<p class="function">{hidden_layer_caracteristic.function}</p>
					<div class="hidden-layer-caracteristic-input-modificator">
						<button class="icon-button modificator-button" on:click={() => {handle_change_function(hidden_layer_caracteristic_index)}}>
							<img class="icon" src="/icons/refresh.svg" alt="change" />
						</button>
					</div>
				</div>
			</div>
			<div class="hidden-layer-management">
				<button
					class="icon-button"
					disabled={first}
					on:click={() => handle_move_up(hidden_layer_caracteristic_index)}
				>
					<img class="icon" src="/icons/arrow.svg" style="transform: scaleY(-1);" alt="up" />
				</button>
				<button
					class="icon-button"
					disabled={last}
					on:click={() => handle_move_down(hidden_layer_caracteristic_index)}
				>
					<img class="icon" src="/icons/arrow.svg" alt="down" />
				</button>
				<button
					class="icon-button"
					disabled={(first && last) || $HiddenLayerCaracteristicStore.length <= config.inputs.hidden_layer.number.min}
					on:click={() => handle_remove_layer(hidden_layer_caracteristic_index)}
				>
					<img class="icon" src="/icons/remove.svg" alt="remove" />
				</button>
			</div>
		</div>
	{/each}
	<button
		on:click={handle_add_layer}
		disabled={$HiddenLayerCaracteristicStore.length >= config.inputs.hidden_layer.number.max}
		class="add-layer-button"
		style="margin-left: {$HiddenLayerCaracteristicStore.length * 12}px;"
	>
		Add layer
	</button>
</div>
<button class="run" on:click={handle_run}>run</button>

<!-- ======================================== STYLE -->
<style lang="postcss">
	h2 {
		@apply mb-2 text-right opacity-40;
	}

	.hidden-layer-container {
		@apply relative flex flex-col m-1 transition-all duration-150;
	}

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
		@apply pl-2 w-16 py-[1px] mr-1;
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

	.add-layer-button {
		@apply flex w-fit pl-[6px] mt-[4px] text-sm opacity-20 transition-opacity duration-150;
	}

	.add-layer-button:disabled {
		@apply opacity-10;
	}

	.add-layer-button:not([disabled]):hover {
		@apply opacity-100;
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

	button.run {
		@apply mt-4 w-fit px-3 m-auto hover:bg-neutral-100 transition-all duration-150;
		border: solid 1px black;
	}
</style>
