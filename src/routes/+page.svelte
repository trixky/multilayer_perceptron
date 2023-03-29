<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Context from "../components/context.svelte";
	import InputNetwork from "../components/inputs/network/network.svelte";
	import NetworkVisual from '../components/visual/network.svelte';
	import Train from '../components/train.svelte';
	import Predict from '../components/predict.svelte';
	import HyperParameters from '../components/inputs/hyper_parameters.svelte';
</script>

<!-- ======================================== CONTENT -->
<Context />
<InputNetwork />
<NetworkVisual />
<HyperParameters />
<Train />
<Predict />
