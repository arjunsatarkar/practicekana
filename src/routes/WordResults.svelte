<script lang="ts">
    import { onMount } from "svelte";
    import { toRomaji } from "wanakana";

    let {
        word,
        userAnswer,
        computedAnswer = $bindable(),
        correct = $bindable(),
        onsubmit,
    }: {
        word: string;
        userAnswer: string;
        computedAnswer: string,
        correct: boolean | undefined;
        onsubmit: () => void;
    } = $props();

    const wiktionaryUrl = `https://en.m.wiktionary.org/wiki/${encodeURIComponent(word)}#Japanese`;

    computedAnswer = toRomaji(word);

    correct = userAnswer.toLowerCase() === computedAnswer;

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
    <span class="word" lang="ja">{word}</span><br />
    You entered: {userAnswer}<br />
    Our romanization is: {computedAnswer}
    <figure>
        <iframe src={wiktionaryUrl} title="Wiktionary page for {word}"></iframe>
        <figcaption>
            <a href={wiktionaryUrl} target="_blank"><span lang="ja">{word}</span> on Wiktionary</a>
        </figcaption>
    </figure>
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
    .word {
        font-size: var(--font-size-prominent);
    }

    figure {
        margin: 0;
    }

    iframe {
        width: 100%;
        height: 50svh;
        border: 0;
        border-bottom: 1px solid black;
    }
</style>
