<script lang="ts">
  import KanaRowSelector from "./KanaRowSelector.svelte";
  import WordCard from "./WordChallenge.svelte";
  import WordResults from "./WordResults.svelte";
  import FinalResults from "./FinalResults.svelte";

  import { KANA_ROWS, type KanaRowName } from "./lib";
  import kanaWords from "../data/kana_words.json";

  import { SvelteSet } from "svelte/reactivity";

  let currentView:
    | "SELECT_ROWS"
    | "READ_WORD"
    | "WORD_RESULTS"
    | "FINAL_RESULTS" = $state("SELECT_ROWS");

  const trueEntries = (obj: Object) =>
    Object.entries(obj)
      .filter(([_k, v]) => v)
      .map(([k, _v]) => k);

  let isRowSelected = $state({
    katakana: {},
    hiragana: {},
  });
  let kanaSelected: string[] = $derived(
    [
      trueEntries(isRowSelected.katakana).map(
        (kanaRowName) => KANA_ROWS.katakana[kanaRowName as KanaRowName],
      ),
      trueEntries(isRowSelected.hiragana).map(
        (kanaRowName) => KANA_ROWS.hiragana[kanaRowName as KanaRowName],
      ),
    ].flat(2),
  );
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
  let lastAnswerCorrect: boolean | undefined = $state();
  let completedWords: [string, string, boolean][] = $state([]);
  let completedRounds = $derived(completedWords.length);
  let score = $state(0);

  const updateScore = () => {
    completedWords.push([validWords.pop()!, lastAnswer, lastAnswerCorrect!]);
    score += +lastAnswerCorrect!;
  };
</script>

<header>
  <h1>Practice the Kana by Reading Words</h1>
</header>
<hr />

<main>
  {#if currentView === "SELECT_ROWS"}
    <h2>Pick which rows of kana to enable!</h2>
    <form
      onsubmit={(ev) => {
        ev.preventDefault();
        validWords = getValidWords();
        currentView = "READ_WORD";
      }}
    >
      <div class="rowSelectorContainer">
        <KanaRowSelector
          kind="katakana"
          bind:isRowSelected={
            isRowSelected.katakana as Record<KanaRowName, boolean>
          }
        ></KanaRowSelector>
        <KanaRowSelector
          kind="hiragana"
          bind:isRowSelected={
            isRowSelected.hiragana as Record<KanaRowName, boolean>
          }
        ></KanaRowSelector>
      </div>

      <input
        type="submit"
        value="Start!"
        disabled={kanaSelected.length === 0}
      />
    </form>
  {:else if currentView === "READ_WORD"}
    <div class="wordCardContainer">
      <WordCard
        word={currentWord}
        onsubmit={(enteredRomaji) => {
          lastAnswer = enteredRomaji;
          currentView = "WORD_RESULTS";
        }}
      ></WordCard>
    </div>
  {:else if currentView === "WORD_RESULTS"}
    <div class="wordResultsContainer">
      <WordResults
        word={currentWord}
        answer={lastAnswer}
        bind:correct={lastAnswerCorrect}
        onsubmit={() => {
          updateScore();
          if (validWords.length) {
            currentView = "READ_WORD";
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
          currentView = "SELECT_ROWS";
        }}
      ></FinalResults>
    </div>
  {/if}
  {#if currentView === "READ_WORD" || currentView === "WORD_RESULTS"}
    <input
      type="button"
      value="End Game"
      onclick={() => {
        if (currentView === "WORD_RESULTS") {
          updateScore();
        }
        currentView = "FINAL_RESULTS";
      }}
    /><br />
    Completed {completedRounds + (currentView === "WORD_RESULTS" ? 1 : 0)} rounds<br
    />
    <small>
      Since there are <a
        href="https://www.japanesewithanime.com/2017/12/romaji-systems-hepburn-nihon-kunrei.html"
        class="uilink">several different romanization systems</a
      >, you can score your own answer if the system doesn't know it's right.
    </small>
  {/if}
</main>
<hr />

<footer>
  <small>
    &copy; 2025-present <a href="https://arjunsatarkar.net">Arjun Satarkar.</a
    ><br />
    get the <a href={__SOURCE_REPO__}>source code</a>&nbsp;| read the
    <a href="/assets/licenses.txt">licenses</a>
  </small>
</footer>

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
    row-gap: 1em;
  }
</style>
