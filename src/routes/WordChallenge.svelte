<script lang="ts">
    import { onMount } from "svelte";

    let {
        word,
        onsubmit,
    }: { word: string; onsubmit: (enteredRomaji: string) => void } = $props();

    let romajiInputElement: HTMLInputElement;
    let enteredRomaji = $state("");

    onMount(() => romajiInputElement.focus());
</script>

<div class="container">
    <span class="word" lang="ja">{word}</span>
    <form
        onsubmit={(ev) => {
            ev.preventDefault();
            onsubmit(enteredRomaji);
            enteredRomaji = "";
        }}
    >
        <label
            >Enter the word in romaji:<br />
            <input
                type="text"
                bind:this={romajiInputElement}
                bind:value={enteredRomaji}
            />
        </label>
        <input type="submit" value="Submit" disabled={!enteredRomaji} />
    </form>
</div>

<style>
    .word {
        font-size: var(--font-size-prominent);
    }
</style>
