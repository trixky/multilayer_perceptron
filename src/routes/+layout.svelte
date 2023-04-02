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
        @apply flex flex-col justify-center py-3 px-6 w-fit mx-auto;
    }
</style>