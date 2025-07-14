<script lang="ts">
  import { KANA_ROWS, type CompletedWordInfo, type KanaRowName } from "$lib";
  import FinalResults from "./FinalResults.svelte";
  import KanaRowChecklist from "./KanaRowChecklist.svelte";
  import kanaWords from "../../data/kana_words.json";
  import WordChallenge from "./WordChallenge.svelte";
  import WordResults from "./WordResults.svelte";

  import { SvelteSet } from "svelte/reactivity";
  
  let currentView:
    | "GAME_SETUP"
    | "WORD_CHALLENGE"
    | "WORD_RESULTS"
    | "FINAL_RESULTS" = $state("GAME_SETUP");

  const trueEntries = (obj: Object) =>
    Object.entries(obj)
      .filter(([_k, v]) => v)
      .map(([k, _v]) => k);

  let isRowSelected = $state({
    katakana: {},
    hiragana: {},
  });
  let kanaSelected: string[] = $derived([
    ...trueEntries(isRowSelected.katakana).flatMap(
      (kanaRowName) => KANA_ROWS.katakana[kanaRowName as KanaRowName],
    ),
    ...trueEntries(isRowSelected.hiragana).flatMap(
      (kanaRowName) => KANA_ROWS.hiragana[kanaRowName as KanaRowName],
    ),
  ]);
  let charsEnabled = $derived(new SvelteSet([...kanaSelected, "・", "ー"]));

  const getValidWords = () =>
    (kanaWords as string[])
      .filter((word) => [...word].every((c) => charsEnabled.has(c)))
      .map((word): [number, string] => [Math.random(), word])
      .sort((a, b) => a[0] - b[0])
      .map(([_, word]) => word);

  let validWords: string[] = $state([]);
  let currentWord = $derived(validWords[validWords.length - 1]);
  let lastAnswer = $state("");
  let lastComputedAnswer = $state("");
  let lastAnswerCorrect: boolean | undefined = $state();
  let completedWords: CompletedWordInfo[] = $state([]);
  let completedRounds = $derived(completedWords.length);
  let score = $state(0);

  const advanceRound = () => {
    completedWords.push({
      word: validWords.pop()!,
      computedAnswer: lastComputedAnswer,
      markedCorrect: lastAnswerCorrect!,
    });
    score += +lastAnswerCorrect!;
  };
</script>

<header>
  <h1>Practice the Kana by Reading Words</h1>
</header>
<hr />

<main>
  {#if currentView === "GAME_SETUP"}
    <h2>Pick which rows of kana to enable!</h2>
    <form
      onsubmit={(ev) => {
        ev.preventDefault();
        validWords = getValidWords();
        currentView = "WORD_CHALLENGE";
      }}
    >
      <div class="rowSelectorContainer">
        <KanaRowChecklist
          kind="katakana"
          bind:isRowSelected={
            isRowSelected.katakana as Record<KanaRowName, boolean>
          }
        ></KanaRowChecklist>
        <KanaRowChecklist
          kind="hiragana"
          bind:isRowSelected={
            isRowSelected.hiragana as Record<KanaRowName, boolean>
          }
        ></KanaRowChecklist>
      </div>

      <noscript><div>JavaScript is required to use this site.</div></noscript>

      <input
        type="submit"
        value="Start!"
        disabled={kanaSelected.length === 0}
      />
    </form>
  {:else if currentView === "WORD_CHALLENGE"}
    <div>
      <WordChallenge
        word={currentWord}
        onsubmit={(userAnswer) => {
          lastAnswer = userAnswer;
          currentView = "WORD_RESULTS";
        }}
      ></WordChallenge>
    </div>
  {:else if currentView === "WORD_RESULTS"}
    <div class="wordResultsContainer">
      <WordResults
        word={currentWord}
        userAnswer={lastAnswer}
        bind:computedAnswer={lastComputedAnswer}
        bind:correct={lastAnswerCorrect}
        onsubmit={() => {
          advanceRound();
          if (validWords.length) {
            currentView = "WORD_CHALLENGE";
          } else {
            currentView = "FINAL_RESULTS";
          }
        }}
      ></WordResults>
    </div>
  {:else if currentView === "FINAL_RESULTS"}
    <div class="finalResultsContainer">
      <FinalResults
        {score}
        rounds={completedRounds}
        words={completedWords}
        onbacktostart={() => {
          completedWords = [];
          score = 0;
          currentView = "GAME_SETUP";
        }}
      ></FinalResults>
    </div>
  {/if}
  {#if currentView === "WORD_CHALLENGE" || currentView === "WORD_RESULTS"}
    <input
      type="button"
      value="End Game"
      onclick={() => {
        if (currentView === "WORD_RESULTS") {
          advanceRound();
        }
        currentView = "FINAL_RESULTS";
      }}
    /><br />
    {@const displayedRounds =
      completedRounds + (currentView === "WORD_RESULTS" ? 1 : 0)}
    Completed {displayedRounds} round{displayedRounds === 1 ? "" : "s"}<br />
    <small>
      Since there are <a
        href="https://www.japanesewithanime.com/2017/12/romaji-systems-hepburn-nihon-kunrei.html"
        class="uilink">several different romanization systems</a
      >, you can score your own answer if the system doesn't know it's right.
    </small>
  {/if}
</main>
<hr />

<style>
  main {
    text-align: center;
  }

  .rowSelectorContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    column-gap: 5rem;
    text-align: initial;
  }

  .finalResultsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
  }
</style>
