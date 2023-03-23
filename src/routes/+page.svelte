<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Context from "../components/context.svelte";
	import InputNetwork from "../components/inputs/network/network.svelte";
	import VisualLayers from '../components/visual/layers.svelte';
	import Runner from '../components/runner.svelte';
	import TrainTest from '../components/inputs/train_test.svelte';
</script>

<!-- ======================================== CONTENT -->
<Context />
<InputNetwork />
<VisualLayers />
<TrainTest />
<Runner />
