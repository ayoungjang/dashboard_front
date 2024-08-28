<script lang="ts">
  import { onMount } from 'svelte';
  import { token } from '$lib/store/auth';
  import { goto } from '$app/navigation';

  onMount(() => {//redirection
    const savedToken = localStorage.getItem('token'); 
    if (savedToken) {
      goto('/dashboard'); 
    } else {
      goto('/login');
    }
  });
</script>

<main>
  <h1>Loading...</h1>
</main>
