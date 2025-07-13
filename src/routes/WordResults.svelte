<script lang="ts">
    import { onMount } from "svelte";
    import { toRomaji } from "wanakana";
    import { writable } from "svelte/store";

    let {
        word,
        userAnswer,
        computedAnswer = $bindable(),
        correct = $bindable(),
        onsubmit,
    }: {
        word: string;
        userAnswer: string;
        computedAnswer: string;
        correct: boolean | undefined;
        onsubmit: () => void;
    } = $props();

    const moreInfoOpenKey = "moreInfoOpen";
    const wiktionaryUrl = `https://en.m.wiktionary.org/wiki/${encodeURIComponent(word)}#Japanese`;

    computedAnswer = toRomaji(word);
    correct = userAnswer.toLowerCase() === computedAnswer;

    const moreInfoOpenInitial: boolean = JSON.parse(
        localStorage.getItem(moreInfoOpenKey) || "true",
    );
    const moreInfoOpen = writable(moreInfoOpenInitial);
    moreInfoOpen.subscribe((value) => {
        localStorage.setItem(moreInfoOpenKey, JSON.stringify(value));
    });

    let submitInput: HTMLInputElement | undefined = $state();
    onMount(() => {
        document.documentElement.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") {
                submitInput?.click();
            }
        });
    });
</script>

<div class="container">
    <span class="word" lang="ja">{word}</span>
    <span>You entered: {userAnswer}</span>
    <span>Our romanization is: {computedAnswer}</span>
    <div class="moreInfoContainer">
        <details bind:open={$moreInfoOpen}>
            <summary>Definition, etymology, and more info</summary>
            <iframe src={wiktionaryUrl} title="Wiktionary page for {word}"
            ></iframe>
        </details>
        <a href={wiktionaryUrl} target="_blank"
            ><span lang="ja">{word}</span> on Wiktionary</a
        >
    </div>
    <form
        onsubmit={(e) => {
            e.preventDefault();
            onsubmit();
        }}
    >
        Were you correct?
        <label>
            <input
                type="radio"
                name="correct"
                value={true}
                required
                bind:group={correct}
            />
            Yes
        </label>
        <label>
            <input
                type="radio"
                name="correct"
                value={false}
                bind:group={correct}
            />
            No
        </label>
        <br />
        <input type="submit" value="Continue" bind:this={submitInput} />
    </form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
    }

    .word {
        font-size: var(--font-size-prominent);
    }

    .moreInfoContainer {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    iframe {
        width: 100%;
        height: 50svh;
        border: 1px solid black;
    }
</style>
