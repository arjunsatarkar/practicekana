<script lang="ts">
  import "$lib/assets/index.css";
  import { page } from "$app/state";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="canonical" href={new URL(page.url.pathname, __APP_HOME__).toString()}>
</svelte:head>

{@render children()}

<footer>
  <small>
    &copy; 2025-present <a href="https://arjunsatarkar.net">Arjun Satarkar.</a
    ><br />
    get the <a href={__REPO_URL__}>source code</a>&nbsp;| see the
    <a href="/licenses/">licenses</a>
  </small>
</footer>
