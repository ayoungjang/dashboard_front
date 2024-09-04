<script lang="ts">
	import { login } from '$lib/api/auth';
	import { token } from '$lib/store/auth';
	import { goto } from '$app/navigation';

	let id = '';
	let pw = '';

	async function handleLogin() {
		try {
			await login(id, pw);
			if (token) {
				goto('/dashboard');
			}
		} catch (e) {
			console.error('Login failed:', e);
		}
	}
</script>

<div class="container mt-4">
	<h1>Login</h1>
	<form on:submit|preventDefault={handleLogin}>
		<div class="form-group">
			<label for="id">ID</label>
			<input type="text" id="id" bind:value={id} class="form-control" />
		</div>
		<div class="form-group">
			<label for="pw">Password</label>
			<input type="password" id="pw" bind:value={pw} class="form-control" />
		</div>

		<button type="submit" class="btn btn-primary">Login</button>
	</form>
	<p class="mt-3">
		Don't have an account? <a href="/register">Register here</a>
	</p>
</div>
