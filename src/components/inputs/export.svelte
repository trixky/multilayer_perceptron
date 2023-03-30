<!-- ======================================== SCRIPT -->
<script lang="ts">
	import ModelStore from '../../stores/model';
	import ProgressStore from '../../stores/progress';

	function handle_export() {
        // https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server

		if ($ModelStore != undefined) {
			const filename = 'bakcup.json';
			const backup_model = $ModelStore.export();

			const backup_model_data = JSON.stringify(backup_model);

			const blob = new Blob([backup_model_data], { type: 'json' });

			if (window.navigator.msSaveOrOpenBlob) {
				window.navigator.msSaveBlob(blob, filename);
			} else {
				const elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(blob);
				elem.download = filename;
				document.body.appendChild(elem);
				elem.click();
				document.body.removeChild(elem);
			}
		}
	}
</script>

<!-- ======================================== CONTENT -->
<div class="export-container">
	<div class="text-container">
		<p class="left">
			You can export the model with its attributes (layers, weights, bias, hyper-parameters), and
			import it later.
		</p>
	</div>
	<button
		class="classic-button"
		on:click={handle_export}
		disabled={$ModelStore == null || $ProgressStore}>export</button
	>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.export-container {
		@apply relative flex flex-col m-auto w-full;
	}
</style>
