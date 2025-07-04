<script lang="ts">
    let { toName, toUrl }: { toName: string; toUrl: string } = $props();
</script>

<div>
    <a href={toUrl}>&lt; {toName}</a>
</div>

<style>
    div {
        text-align: left;
        width: var(--fullwidth);
        margin: 0 auto;
    }
</style>
