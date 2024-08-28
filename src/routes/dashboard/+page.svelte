<script lang="ts">
	import { getData, uploadFiles } from '$lib/api/files';
	import { token, clearToken } from '$lib/store/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import diskChart from '$lib/ts/disk_plot';
	import StripChart from '$lib/ts/strip_plot';

	let dataFile: File | null = null;
	let refFile: File | null = null;
	let dataType: string = 'Disk'; // Default to 'Disk'
	let errorMsg: string = '';
	let plotFiles: { path: string; name: string }[] = [
		{
			path: '',
			name: 'Oxoid'
		}
	]; //TODO
	let selectedPlot: string = 'Oxoid'; //TODO
	let isLoading: boolean = false;
	let dir: string = '20240827202738'; //TODO
	let chart: any | null = null;
	let strainNumbers: string[];
	//TODO: test
	onMount(async () => {
		try {
			const response = await getData(dataType, dir, selectedPlot);
			if (dataType == 'Disk') diskChart(response, chart, strainNumbers);
			else StripChart(response, chart);
		} catch (error) {
			console.error('Upload failed:', error);
			errorMsg = 'File upload failed. Please try again.';
		} finally {
			isLoading = false;
		}
	});

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
				plotFiles = response;
				dir = response[0].dir;
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

	async function handleCheckboxChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			selectedPlot = target.value;
		}
		try {
			const response = await getData(dataType, dir, selectedPlot);

			diskChart(response, chart, strainNumbers);
		} catch (error) {
			console.error('Upload failed:', error);
			errorMsg = 'File upload failed. Please try again.';
		} finally {
			isLoading = false;
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

<div class="mt-4 d-flex min-vh-100">
	<div class="border-right p-5">
		<button class="col-3 justify-content-end btn btn-danger mb-5" on:click={handleLogout}
			>Logout</button
		>
		<h1 class="mb-5">Oversikt</h1>

		<div>
			<div class="form-group">
				<label for="dataType">Data Type</label>
				<select id="dataType" bind:value={dataType} class="form-control">
					<option value="Strip">Strip</option>
					<option value="Disk">Disk</option>
				</select>
			</div>
			<div class="form-group">
				<label for="dataFile">Upload Data File</label>
				<input
					type="file"
					id="dataFile"
					on:change={handleDataFileChange}
					class="form-control-file"
				/>
			</div>
			<div class="form-group">
				<label for="refFile">Upload Ref File</label>
				<input type="file" id="refFile" on:change={handleRefFileChange} class="form-control-file" />
			</div>
			<button on:click={handleSubmit} class="btn btn-primary">Submit</button>
			{#if !isLoading}
				<div class="mt-4">
					<h4>Select Plot to View</h4>
					{#each plotFiles as plotFile}
						<div class="form-check">
							<input
								class="form-check-input"
								type="checkbox"
								value={plotFile.name}
								on:change={handleCheckboxChange}
								bind:group={selectedPlot}
							/>
							<label class="form-check-label">{plotFile.name}</label>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<div class="p-3 right-container">
		{#if errorMsg}
			<div class="alert alert-danger mt-4">{errorMsg}</div>
		{/if}
		{#if isLoading}
			<div class="mt-4 d-flex justify-content-center">
				<div class="loader"></div>
			</div>
		{/if}

		{#if selectedPlot}
			<div class="mt-4 plot-container">
				<h2>Plot for {selectedPlot}</h2>
				<div class="chart-container">
					<canvas id="myChart"></canvas>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.chart-conatiner {
		height: 100vh;
		width: 100%;
	}
	.plot-container {
		width: 100%;
		height: 100vh;
	}
	.right-container {
		width: 100%;
		height: 100vh;
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

	#myChart {
		width: 100%;
		height: 80vh;
	}
</style>
