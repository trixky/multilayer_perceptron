<!-- ======================================== SCRIPT -->
<script lang="ts">
	import TrainTest from './train_test.svelte'
</script>

<!-- ======================================== CONTENT -->
<div class="inputs-container">
    <h2>Hyper parameters</h2>
    <TrainTest />
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
    h2 {
        @apply text-right mb-2;
    }
</style>
