<script lang="ts">
  import { onMount } from 'svelte';
  import { token } from '$lib/store/auth';
  import { goto } from '$app/navigation';

  onMount(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      goto('/dashboard'); // 토큰이 있으면 대시보드로 리디렉션
    } else {
      goto('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  });
</script>

<main>
  <h1>Loading...</h1>
</main>
