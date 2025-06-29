<script lang="ts">
  import { KANA_ROWS, type KanaKind, type KanaRowName } from "./lib";
  let {
    kind,
    isRowSelected = $bindable(),
  }: { kind: KanaKind; isRowSelected: Record<KanaRowName, boolean> } = $props();
</script>

<div>
  <h3>{kind[0].toUpperCase() + kind.slice(1)}</h3>
  <label>
    <input
      type="checkbox"
      onchange={(ev) => {
        for (const row in isRowSelected) {
          isRowSelected[row as KanaRowName] = ev.currentTarget.checked;
        }
      }}
    />
    all {kind}
  </label>
  <ul>
    {#each Object.keys(KANA_ROWS[kind as KanaKind]) as rowName}
      <li>
        <label>
          <input
            type="checkbox"
            bind:checked={isRowSelected[rowName as KanaRowName]}
          />
          <span lang="ja">{KANA_ROWS[kind][rowName as KanaRowName][0]}</span>
          ({rowName})
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
