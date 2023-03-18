<!-- ======================================== SCRIPT -->
<script lang="ts">
	import Parser from '../logic/parser'
    
    function handle_run() {
		console.log('*** handle_run');
		fetch('/data.csv').then((v) => {
			v.text().then((txt) => {
				console.log(Parser(txt));
			});
			//do something here
		});
	}
</script>

<!-- ======================================== CONTENT -->
<button on:click={handle_run}>run</button>

<!-- ======================================== STYLE -->
<style lang="postcss">
</style>
