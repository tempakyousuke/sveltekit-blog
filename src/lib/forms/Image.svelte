<script lang="ts">
	export let defaultImage = '';
	export let file;
	let files: FileList;
	let input: HTMLInputElement;
	let pickedImage = '';

	const selectFile = () => {
		input.click();
	};

	const dropFile = (event: DragEvent) => {
		if (event.dataTransfer) {
			files = event.dataTransfer.files;
		}
	};
	$: {
		if (files !== undefined) {
			let fileReader = new FileReader();
			fileReader.onload = function () {
				pickedImage = fileReader.result as string;
			};
			fileReader.readAsDataURL(files[0]);
			file = files[0];
		}
	}
	$: previewImage = (() => {
		if (pickedImage !== '') {
			return pickedImage;
		}
		if (defaultImage !== '') {
			return defaultImage;
		}
		return '';
	})();
</script>

<div
	role="button"
	tabindex="0"
	class="fles border h-48 bg-white items-center justify-center"
	on:drop|preventDefault={(event) => dropFile(event)}
	on:dragover|preventDefault
>
	{#if previewImage === ''}
		<div>
			ここに画像をドロップするか
			<div
				role="button"
				tabindex="0"
				class="text-blue-500 hover:text-blue-300 cursor-pointer"
				on:click={selectFile}
				on:keydown={(event) => {
					if (event.key === 'Enter') selectFile();
				}}
			>
				ファイルを選択
			</div>
		</div>
	{:else}
		<button
			class="h-full mx-auto block"
			on:click={selectFile}
			on:keydown={(event) => {
				if (event.key === 'Enter') selectFile();
			}}
		>
			<img src={previewImage} alt="プレビュー" class="h-full mx-auto" />
		</button>
	{/if}
	<input class="hidden" type="file" accept="image/*" bind:this={input} bind:files />
</div>
