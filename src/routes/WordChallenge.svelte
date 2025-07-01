<script lang="ts">
    import { onMount } from "svelte";

    let {
        word,
        onsubmit,
    }: { word: string; onsubmit: (userAnswer: string) => void } = $props();

    let romajiInputElement: HTMLInputElement;
    let userAnswer = $state("");

    onMount(() => romajiInputElement.focus());
</script>

<div class="container">
    <span class="word" lang="ja">{word}</span>
    <form
        onsubmit={(ev) => {
            ev.preventDefault();
            onsubmit(userAnswer);
            userAnswer = "";
        }}
    >
        <label
            >Enter the word in romaji:<br />
            <input
                type="text"
                bind:this={romajiInputElement}
                bind:value={userAnswer}
            />
        </label>
        <input type="submit" value="Submit" disabled={!userAnswer} />
    </form>
</div>

<style>
    .word {
        font-size: var(--font-size-prominent);
    }
</style>
