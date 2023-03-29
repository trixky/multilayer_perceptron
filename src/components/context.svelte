<!-- ======================================== SCRIPT -->
<script lang="ts">
</script>

<!-- ======================================== CONTENT -->
<div class="context-container">
	<h2>Context</h2>
	<div class="text-container">
		<p class="left">
			The goal is to train an AI model to predict whether a cancer is malignant or benign on a
			dataset of breast cancer diagnosis in the Wisconsin.
		</p>
		<p class="right">
			Dataset describe the (30) characteristics of a cell nucleus of breast mass extracted with
			fine-needle aspiration (FNA) on 569 patients.
		</p>
		<p class="download">
			<a href="/context.zip" download> download </a>
		</p>
	</div>
</div>

<!-- ======================================== STYLE -->
<style lang="postcss">
	h2 {
		@apply mb-3 opacity-40;
	}

	.text-container {
		@apply text-sm;
		width: 400px;
	}

	.text-container > p {
		@apply mb-3;
	}

	.text-container > .left {
		@apply pr-3 text-left;
	}

	.text-container > .right {
		@apply pl-3 text-right;
	}

    .download {
        @apply opacity-50 hover:opacity-100 transition-all duration-150;
    }
</style>
