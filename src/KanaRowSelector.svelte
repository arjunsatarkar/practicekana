<script lang="ts">
  import { KANA_ROWS } from "./lib";
  let {
    kind,
    isRowSelected = $bindable({}),
  }: { kind: "katakana" | "hiragana"; isRowSelected: Record<string, boolean> } =
    $props();
</script>

<div>
  <h3>{kind[0].toUpperCase() + kind.slice(1)}</h3>
  <label>
    <input
      type="checkbox"
      onchange={(ev) => {
        for (const row in isRowSelected) {
          isRowSelected[row] = ev.currentTarget.checked;
        }
      }}
    />
    all {kind}
  </label>
  <ul>
    {#each Object.entries(KANA_ROWS) as [rowName, kanaObj]}
      <li>
        <label>
          <input type="checkbox" bind:checked={isRowSelected[rowName]} />
          {kanaObj[kind]} ({rowName})
        </label>
      </li>
    {/each}
  </ul>
</div>

<style>
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
