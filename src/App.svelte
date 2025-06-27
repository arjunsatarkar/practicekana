<script lang="ts">
  import kanaWords from "../data/kana_words.json";
  import KanaRowSelector from "./KanaRowSelector.svelte";

  let isRowSelected = $state({
    katakana: {},
    hiragana: {},
  });

  const trueEntries = (obj: Object) =>
    Object.entries(obj)
      .filter(([_k, v]) => v)
      .map(([k, _v]) => k);

  let rowsSelected = $derived({
    katakana: trueEntries(isRowSelected.katakana),
    hiragana: trueEntries(isRowSelected.hiragana),
  });
</script>

<div id="appContainer">
  <h1>Practice the kana by reading words</h1>

  <h2>Pick which rows of kana to enable!</h2>

  <div id="rowSelectorContainer">
    <KanaRowSelector kind="katakana" bind:isRowSelected={isRowSelected.katakana}
    ></KanaRowSelector>
    <KanaRowSelector kind="hiragana" bind:isRowSelected={isRowSelected.hiragana}
    ></KanaRowSelector>
  </div>

  <input
    type="button"
    value="Start!"
    disabled={rowsSelected.katakana.length == 0 &&
      rowsSelected.hiragana.length == 0}
  />
</div>

<style>
  #appContainer {
    align-items: center;
    display: flex;
    flex-flow: column;
    margin: 0 30px;
  }

  #rowSelectorContainer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    column-gap: 5rem;
  }
</style>
