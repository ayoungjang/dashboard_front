<script lang="ts">
  import { register } from '$lib/api/auth';
  import { token } from '$lib/store/auth';
  import { goto } from '$app/navigation';

  let id = '';
  let pw = '';
  let name = '';

  async function handleRegister() {
    try {
      await register(id, pw, name);
      if ($token) {
        goto('/dashboard');
      }
    } catch (e) {
      console.error('Registration failed:', e);
    }
  }
</script>

<div class="container mt-4">
  <h1>Register</h1>
  <form on:submit|preventDefault={handleRegister}>
    <div class="form-group">
      <label for="id">ID</label>
      <input type="text" id="id" bind:value={id} class="form-control" />
    </div>
    <div class="form-group">
      <label for="pw">Password</label>
      <input type="password" id="pw" bind:value={pw} class="form-control" />
    </div>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={name} class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Register</button>
  </form>
</div>
