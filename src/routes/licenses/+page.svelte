<script lang="ts">
    const getLinkableRepo = (repo: string | undefined): string | null => {
        const result = repo
            ?.replace(/^git@(.+)/, "https://$1")
            .replace(/^([^\/]+\/[^\/]+)$/, "https://github.com/$1")
            .match(/^(?:git\+)?(https?:\/\/.+)/);
        return (result && result[1]) || null;
    };

    const LICENSES_JSON_PATH = "/oss-licenses.json";
</script>

<svelte:head>
    <link
        rel="preload"
        href={LICENSES_JSON_PATH}
        type="application/json"
        as="fetch"
        crossorigin="anonymous"
    />
</svelte:head>

<main>
    <p>Get the <a href={LICENSES_JSON_PATH}>license info as JSON</a>.</p>
    {#await fetch(LICENSES_JSON_PATH) then result}
        {#await result.json() then licenses}
            {#each licenses as licenseInfo}
                {@const linkableRepo = getLinkableRepo(licenseInfo.repository)}

                <div>
                    <h2>{licenseInfo.name}</h2>
                    <div style="text-align: center;">
                        <svelte:element
                            this={linkableRepo ? "a" : "span"}
                            href={linkableRepo ? linkableRepo : undefined}
                        >
                            {linkableRepo || licenseInfo.repository}
                        </svelte:element>
                    </div>
                    <pre>{licenseInfo.licenseText}</pre>
                </div>
                <hr />
            {/each}
        {/await}
    {/await}
</main>

<style>
    h2 {
        margin-bottom: 0.5rem;
    }
    pre {
        white-space: pre-wrap;
    }
</style>
