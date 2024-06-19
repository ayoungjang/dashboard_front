<script lang="ts">
	import { uploadFiles } from '$lib/api/files';
	import { SERVER } from '$lib/value';
	import { token, clearToken } from '$lib/store/auth';
	import { goto } from '$app/navigation';

	let dataFile: File | null = null;
	let refFile: File | null = null;
	let dataType: string = 'Disk'; // Default to 'Disk'
	let errorMsg: string = '';
	let plotFiles: { path: string; name: string }[] = [];
	let selectedPlot: string = '';
	let isLoading: boolean = false;

	function handleDataFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			dataFile = target.files[0];
		}
	}

	function handleRefFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			refFile = target.files[0];
		}
	}

	async function handleSubmit() {
		errorMsg = '';
		isLoading = true;

		if (dataFile && refFile) {
			try {
				const response = await uploadFiles(dataFile, refFile, dataType);
				console.log(response);
				plotFiles = response;
				selectedPlot = '';
			} catch (error) {
				console.error('Upload failed:', error);
				errorMsg = 'File upload failed. Please try again.';
			} finally {
				isLoading = false;
			}
		} else {
			alert('Please select both data and reference files.');
			isLoading = false;
		}
	}

	function handleCheckboxChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			selectedPlot = target.value;
		}
	}

	function handleLogout() {
		if (window.confirm('logout?')) {
			clearToken();
			localStorage.removeItem('token');
			goto('/login');
		}
	}
</script>

<div class="container mt-4">
	<button class="btn btn-danger" on:click={handleLogout}>Logout</button>

	<h1>Upload Files</h1>
	<div class="form-group">
		<label for="dataType">Data Type</label>
		<select id="dataType" bind:value={dataType} class="form-control">
			<option value="Strip">Strip</option>
			<option value="Disk">Disk</option>
		</select>
	</div>
	<div class="form-group">
		<label for="dataFile">Upload Data File</label>
		<input type="file" id="dataFile" on:change={handleDataFileChange} class="form-control-file" />
	</div>
	<div class="form-group">
		<label for="refFile">Upload Ref File</label>
		<input type="file" id="refFile" on:change={handleRefFileChange} class="form-control-file" />
	</div>
	<button on:click={handleSubmit} class="btn btn-primary">Submit</button>
	{#if errorMsg}
		<div class="alert alert-danger mt-4">{errorMsg}</div>
	{/if}
	{#if isLoading}
		<div class="mt-4 d-flex justify-content-center">
			<div class="loader"></div>
			<!-- 로딩바 -->
		</div>
	{/if}
	{#if !isLoading}
		<div class="mt-4">
			<h2>Select Plot to View</h2>
			{#each plotFiles as plotFile}
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						value={plotFile.path}
						on:change={handleCheckboxChange}
						bind:group={selectedPlot}
					/>
					<label class="form-check-label">{plotFile.name}</label>
				</div>
			{/each}
		</div>
		{#if selectedPlot}
			<div class="mt-4 plot-container">
				<h2>Result Plot</h2>
				<img
					id="resultImage"
					src={`${SERVER}/${selectedPlot}`}
					alt="Result plot will appear here"
				/>
			</div>
		{/if}
	{/if}
</div>

<style>
	.plot-container {
		max-width: 100%;
		overflow: auto;
	}

	.plot-container img {
		max-width: 100%;
		height: auto;
	}

	.loader {
		border: 16px solid #f3f3f3; /* Light grey */
		border-top: 16px solid #3498db; /* Blue */
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
		margin: auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
