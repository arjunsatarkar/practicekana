<script lang="ts">
  import "$lib/index.css";
  import { repository } from "../../package.json";

  let { children } = $props();
</script>

{@render children()}

<footer>
  <small>
    &copy; 2025-present <a href="https://arjunsatarkar.net">Arjun Satarkar.</a
    ><br />
    get the <a href={repository.url}>source code</a>&nbsp;| see the
    <a href="/licenses">licenses</a>
  </small>
</footer>
