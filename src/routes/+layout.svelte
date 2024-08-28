<script lang="ts">
  import { onMount } from 'svelte';
  import { token, setToken } from '$lib/store/auth';
  import { goto } from '$app/navigation';

</script>

<nav>
  
</nav>

<main>
  <slot />
</main>

<footer>
</footer>
