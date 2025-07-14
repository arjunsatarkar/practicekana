<script lang="ts">
    import type { CompletedWordInfo } from "$lib";

    let {
        score,
        rounds,
        words: completedWords,
        onbacktostart,
    }: {
        score: number;
        rounds: number;
        words: CompletedWordInfo[];
        onbacktostart: () => void;
    } = $props();

    let copied = $state(false);
</script>

<span class="finalScore">You scored {score}&nbsp;/&nbsp;{rounds}</span>
{#if score >= 3 && score === rounds}
    <span
        ><a href="https://ichigoproduction.com/talent/arima.html">Kana Arima</a>
        congratulates you.</span
    >
{/if}
<div>
    <input
        type="button"
        value="Share"
        onclick={() => {
            navigator.clipboard
                .writeText(
                    `I scored ${score}/${rounds} at kana reading practice on ${__APP_HOME__} !`,
                )
                .then(() => {
                    copied = true;
                });
        }}
    />
    <input type="button" value="Back to Start" onclick={onbacktostart} />
    {#if copied}
        <br /> <small>Copied to clipboard</small>
    {/if}
</div>
{#if rounds}
    <table>
        <thead>
            <tr>
                <th>Word</th>
                <th>Score</th>
            </tr></thead
        >
        <tbody>
            {#each completedWords as completedWord}
                <tr>
                    <td><span lang="ja">{completedWord.word}</span> ({completedWord.computedAnswer})</td>
                    <td>{(completedWord.markedCorrect && "✅") || "❌"}</td></tr
                >
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <td>{score} / {rounds}</td>
            </tr>
        </tfoot>
    </table>
{/if}

<style>
    .finalScore {
        font-size: var(--font-size-prominent);
    }

    table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 0.5rem;
    }
</style>
