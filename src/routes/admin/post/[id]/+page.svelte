<script lang="ts">
	import * as yup from 'yup';
	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/forms/Input.svelte';
	import Textarea from '$lib/forms/Textarea.svelte';
	import Select from '$lib/forms/Select.svelte';
	import { db } from '$modules/firebase/firebase';
	import { user } from '$modules/store/store';
	import { getDocs, collection } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import TagModal from '$lib/tag/TagModal.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { marked } from 'marked';
	import PostContent from '$lib/post/PostContent.svelte';
	import type { PostModel } from '$model/post';

	export let data: {
		post: PostModel;
		tags: Array<{ label: string; value: string; preselected: boolean } | string>;
	};
	const post = data.post;

	let values = {
		title: post.title,
		plainBody: post.plainBody
	};
	let errors = {
		title: '',
		plainBody: ''
	};
	let tags = data.tags;
	$: htmlBody = marked.parse(values.plainBody) as string;

	let uid = '';
	let openTagModal = false;
	let selectedTags = post.tags;
	let status = post.status;

	const statusOptions = [
		{ label: '公開', value: 'public' },
		{ label: '下書き', value: 'draft' }
	];

	user.subscribe((user) => {
		uid = user.uid;
	});

	const schema = yup.object().shape({
		title: yup.string().required('タイトルは必須です'),
		plainBody: yup.string().required('内容は必須です')
	});

	const submit = () => {
		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				updatePost();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const updatePost = async () => {
		await post.update({
			...values,
			htmlBody,
			uid,
			tags: selectedTags,
			status: status
		});
		goto('/admin');
	};

	const getTags = async () => {
		const co = collection(db, 'tags');
		const snapshots = await getDocs(co);
		tags = [];
		snapshots.forEach((snapshot) => {
			tags.push(snapshot.data().name);
		});
	};
</script>

<svelte:head>
	<title>編集</title>
</svelte:head>

<div class="container mx-auto pt-10">
	<Input bind:value={values.title} label="タイトル" error={errors.title} />
	<div class="mt-5 flex items-center">
		<MultiSelect bind:selected={selectedTags} options={tags} />
		<Button className="ml-2" on:click={() => (openTagModal = true)}>タグ追加</Button>
	</div>
	<Textarea bind:value={values.plainBody} label="内容" error={errors.plainBody} />
	<PostContent html={htmlBody} />
	<div>
		<Select bind:value={status} options={statusOptions} className="w-10 mt-3" />
	</div>

	<Button on:click={submit} className="mt-3">保存</Button>
	<TagModal bind:open={openTagModal} on:complete={getTags} />
</div>

<style lang="postcss">
	:global(.multiselect) {
		background-color: white;
		color: white;
	}

	:global(.multiselect ul.options) {
		color: black;
		border: 1px solid #aaa;
	}
</style>
