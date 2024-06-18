<script lang="ts">
	import { uploadFiles } from '$lib/api/files';
	import { SERVER } from '$lib/value';

	let dataFile: File | null = null;
	let refFile: File | null = null;
	let dataType: string = 'Disk';
	let errorMsg: string = '';
	let plotFiles: { path: string; name: string }[] = [];
	let selectedPlot: string = '';

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

		if (dataFile && refFile) {
			try {
				const response = await uploadFiles(dataFile, refFile, dataType);
				plotFiles = response; // Ensure plotFiles is set correctly
				selectedPlot = '';
			} catch (error) {
				console.error('Upload failed:', error);
				errorMsg = 'File upload failed. Please try again.';
			}
		} else {
			alert('Please select both data and reference files.');
		}
	}

	function handleCheckboxChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.checked) {
			selectedPlot = target.value;
		}
	}
</script>

<div class="container mt-4">
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
			<img id="resultImage" src={`${SERVER}/${selectedPlot}`} alt="Result plot will appear here" />
		</div>
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
</style>
