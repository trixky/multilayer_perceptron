<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Parser from '../logic/parser';

	function handle_run() {
		fetch('/data.csv').then((v) => {
			v.text().then((txt) => {
				console.log(Parser(txt));
			});
		});
	}
</script>

<!-- ======================================== CONTENT -->
<div class="runner-container">
	<button on:click={handle_run}>train</button>
	<button on:click={handle_run}>predict</button>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	.runner-container {
		@apply flex m-auto;
	}

	button {
		@apply mt-2 w-20 mx-2 hover:bg-neutral-100 transition-all duration-150;
		border: solid 1px black;
	}
</style>
