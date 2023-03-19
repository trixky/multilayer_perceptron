<!-- ======================================== SCRIPT -->
<script lang="ts">
    import '../app.css'
    import Header from '../components/layout/header.svelte'
    import Footer from '../components/layout/footer.svelte'
</script>

<!-- ======================================== CONTENT -->
<Header />
<main>
    <slot />
</main>
<Footer />

<!-- ======================================== STYLE -->
<style lang="postcss">
    main {
        @apply flex flex-col justify-center p-3 w-fit m-auto;
    }
</style>