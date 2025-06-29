<script lang="ts">
    let {
        score,
        rounds,
        words,
        onbacktostart,
    }: {
        score: number;
        rounds: number;
        words: [string, string, boolean][];
        onbacktostart: () => void;
    } = $props();

    let copied = $state(false);
</script>

<span class="finalScore">You scored {score} / {rounds}</span>
{#if score >= 3 && score === rounds}
    <span
        ><a href="https://ichigoproduction.com/talent/arima.html">Arima Kana</a>
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
<table>
    <thead>
        <tr>
            <th>Word</th>
            <th>You Answered</th>
            <th>Score</th>
        </tr></thead
    >
    <tbody>
        {#each words as [word, answer, correct]}
            <tr>
                <td lang="ja">{word}</td>
                <td>{answer}</td>
                <td>{(correct && "✅") || "❌"}</td></tr
            >
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th>Total</th>
            <td></td>
            <td>{score} / {rounds}</td>
        </tr>
    </tfoot>
</table>

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
