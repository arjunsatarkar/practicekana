<script lang="ts">
    import { onMount } from "svelte";
    import NavBack from "../NavBack.svelte";
    import { name as projectName } from "../../../package.json";

    const getLinkableRepo = (repo: string | undefined): string | null => {
        const result = repo
            ?.replace(/^git@(.+)/, "https://$1")
            .replace(/^([^\/]+\/[^\/]+)$/, "https://github.com/$1")
            .match(/^(?:git\+)?(https?:\/\/.+)/);
        return (result && result[1]) || null;
    };

    const LICENSES_JSON_PATH = "/oss-licenses.json";

    type LicensesJson = Record<string, string>[];
    let licensesJson: LicensesJson = $state([]);

    const lexCompare = (a: string, b: string) => {
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    };

    onMount(() =>
        fetch(LICENSES_JSON_PATH)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("failed to fetch licenses");
                }
            })
            .then((json: LicensesJson) => {
                json.sort((a, b) => lexCompare(a.name, b.name));
                json.unshift(
                    ...json.splice(
                        json.findIndex((v) => v.name === projectName),
                        1,
                    ),
                );
                licensesJson = json;
            })
            .catch((error) => console.warn(error)),
    );
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
<header>
    <NavBack toName="home" toUrl="/"></NavBack>
</header>
<main>
    <p>Get the <a href={LICENSES_JSON_PATH}>license info as JSON</a>.</p>
    {#each licensesJson as licenseInfo}
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
</main>

<style>
    h2 {
        margin-bottom: 0.5rem;
    }
    pre {
        white-space: pre-wrap;
    }
</style>
