<!-- ======================================== SCRIPT -->
<script lang="ts">
	import HiddenLayerStore from '../../../stores/hidden_layer';
	import InputNetworkLayer from './layer.svelte';
	import Config from '../../../config';

	function handle_add_layer() {
		HiddenLayerStore.add_last_copy_layer();
	}

	function handle_randomize() {
		HiddenLayerStore.randomize();
	}
</script>

<!-- ======================================== CONTENT -->
<div class="neuron-network-container">
	<header>
		<h2>Neuron network</h2>
		<button on:click={handle_randomize} class="random-button">Randomize</button>
	</header>
	<div
		class="hidden-layer-container"
		style="transform: translateX(-{$HiddenLayerStore.length * 6}px)"
	>
		<InputNetworkLayer index={-1} input_layer caracterisics={undefined} />
		{#each $HiddenLayerStore as caracterisics, index (index)}
			{@const first = index == 0}
			{@const last = index == $HiddenLayerStore.length - 1}
			<InputNetworkLayer {caracterisics} {index} {first} {last} />
		{/each}
		<InputNetworkLayer
			index={$HiddenLayerStore.length}
			output_layer
			caracterisics={undefined}
		/>
		<button
			on:click={handle_add_layer}
			disabled={$HiddenLayerStore.length >= Config.inputs.hidden_layers.number.max}
			class="add-layer-button"
			style="margin-left: {($HiddenLayerStore.length + 2) * 12}px;">Add layer</button
		>
	</div>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	header {
		@apply text-right;
	}

	.random-button {
		@apply -translate-y-[6px] p-0 !important;
	}

	.hidden-layer-container {
		@apply relative flex flex-col m-1 transition-all duration-150;
	}

	.add-layer-button {
		@apply w-fit pl-[6px] mt-[4px] text-sm opacity-20 transition-opacity duration-150;
	}

	.add-layer-button:disabled {
		@apply opacity-10;
	}

	.add-layer-button:not([disabled]):hover {
		@apply opacity-100;
	}

	.random-button {
		@apply w-fit pr-[6px] mt-[4px] text-sm opacity-20 hover:opacity-100 transition-opacity duration-150;
	}

	button:disabled {
		@apply opacity-30 cursor-not-allowed;
	}
</style>
