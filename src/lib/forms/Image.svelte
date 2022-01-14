<script lang="ts">
	export let defaultImage = '';
	export let file;
	let files;
	let input;
	let pickedImage = '';

	const selectFile = () => {
		input.click();
	};

	const dropFile = (event) => {
		files = event.dataTransfer.files;
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
	class="fles border h-48 bg-white items-center justify-center"
	on:drop|preventDefault={(event) => dropFile(event)}
	on:dragover|preventDefault
>
	{#if previewImage === ''}
		<div>
			ここに画像をドロップするか
			<div class="text-blue-500 hover:text-blue-300 cursor-pointer" on:click={selectFile}>
				ファイルを選択
			</div>
		</div>
	{:else}
		<img src={previewImage} alt="プレビュー" class="h-full mx-auto" on:click={selectFile} />
	{/if}
	<input class="hidden" type="file" accept="image/*" bind:this={input} bind:files />
</div>
