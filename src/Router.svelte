<script>
    import { onMount } from 'svelte';

    let content;

    onMount(async () => {
        if (window.location.pathname == '/') 
            content = (await import('./Routes/Home/Home.svelte')).default;
        else 
            content = (await import('./Routes/404/404.svelte')).default;
    });
</script>
<svelte:component this={content}>
</svelte:component>
