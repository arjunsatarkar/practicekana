<script lang="ts">
  import "$lib/assets/index.css";

  let { children } = $props();
</script>

{@render children()}

<footer>
  <small>
    &copy; 2025-present <a href="https://arjunsatarkar.net">Arjun Satarkar.</a
    ><br />
    get the <a href={__REPO_URL__}>source code</a>&nbsp;| see the
    <a href="/licenses/">licenses</a>
  </small>
</footer>
