<script lang="ts">
	import * as yup from 'yup';
	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/forms/Input.svelte';
	import Textarea from '$lib/forms/Textarea.svelte';
	import { db } from '$modules/firebase/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	import { marked } from 'marked';
	let values = {
		title: '',
		plainBody: ''
	};

	let errors = {
		title: '',
		plainBody: ''
	};
	$: htmlBody = marked.parse(values.plainBody);

	const schema = yup.object().shape({
		title: yup.string().required('タイトルは必須です'),
		plainBody: yup.string().required('内容は必須です')
	});

	const validate = (path: string) => {
		schema
			.validateAt(path, values)
			.then(() => {
				errors[path] = '';
			})
			.catch((err) => {
				errors[path] = err.message;
			});
	};

	const submit = () => {
		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				createPost();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const createPost = async () => {
		await addDoc(collection(db, 'posts'), {
			...values,
			htmlBody
		});
		goto('/admin');
	};
</script>

<svelte:head>
	<title>新規記事作成</title>
</svelte:head>

<div class="container mx-auto pt-10">
	<Input bind:value={values.title} label="タイトル" error={errors.title} />
	<Textarea className="mt-5" bind:value={values.plainBody} label="内容" error={errors.plainBody} />
	<div>
		{@html htmlBody}
	</div>
	<Button on:click={submit}>保存</Button>
</div>
