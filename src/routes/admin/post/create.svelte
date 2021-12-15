<script lang="ts">
	import Input from '$lib/forms/Input.svelte';
	let values = {
		title: '',
		body: ''
	};

	let errors = {
		title: '',
		body: ''
	};
</script>

<svelte:head>
	<title>新規記事作成</title>
</svelte:head>

<div class="container mx-auto pt-10">
	<Input bind:value={values.title} label="タイトル" />
</div>
