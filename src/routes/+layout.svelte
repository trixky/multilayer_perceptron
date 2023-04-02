<!-- ======================================== SCRIPT -->
<script lang="ts">
    import '../app.css'
    import Header from '../components/layout/header.svelte'
</script>

<!-- ======================================== CONTENT -->
<Header />
<main>
    <slot />
</main>

<!-- ======================================== STYLE -->
<style lang="postcss">
    main {
        @apply flex flex-col justify-center p-3 w-fit m-auto;
    }
</style>