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
<button class="run" on:click={handle_run}>run</button>

<!-- ======================================== STYLE -->
<style lang="postcss">
	button.run {
		@apply mt-2 w-fit px-3 m-auto hover:bg-neutral-100 transition-all duration-150;
		border: solid 1px black;
	}
</style>
