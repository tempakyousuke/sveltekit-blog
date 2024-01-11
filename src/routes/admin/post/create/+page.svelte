<script context="module">
	export async function load() {
		const co = collection(db, 'tags');
		const snapshots = await getDocs(co);
		const tags = [];
		snapshots.forEach((snapshot) => {
			tags.push(snapshot.data().name);
		});
		return {
			props: {
				tags
			}
		};
	}
</script>

<script lang="ts">
	import * as yup from 'yup';
	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/forms/Input.svelte';
	import Textarea from '$lib/forms/Textarea.svelte';
	import Select from '$lib/forms/Select.svelte';
	import { db } from '$modules/firebase/firebase';
	import { user } from '$modules/store/store';
	import { addDoc, getDocs, collection, serverTimestamp } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import TagModal from '$lib/tag/TagModal.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { marked } from 'marked';
	import { UserModelFactory } from '$model/user';
	import PostContent from '$lib/post/PostContent.svelte';

	let values = {
		title: '',
		plainBody: ''
	};

	let errors = {
		title: '',
		plainBody: ''
	};
	export let tags: string[] = [];
	$: htmlBody = marked.parse(values.plainBody);

	let uid = '';
	let openTagModal = false;
	let selectedTags = [];
	let status = 'public';

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
				createPost();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const createPost = async () => {
		const data: any = {
			...values,
			htmlBody,
			uid,
			tags: selectedTags,
			status: status,
			created: serverTimestamp(),
			modified: serverTimestamp()
		};
		if (status === 'public') {
			data.firstPosted = serverTimestamp();
			const user = await UserModelFactory.getDoc(uid);
			user.increaseCount();
		}
		await addDoc(collection(db, 'posts'), data);
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
	<title>新規記事作成</title>
</svelte:head>

<div class="container mx-auto pt-10">
	<Input bind:value={values.title} label="タイトル" error={errors.title} />
	<div class="mt-5 flex items-center">
		<MultiSelect bind:selectedValues={selectedTags} options={tags} />
		<Button className="ml-2" on:click={() => (openTagModal = true)}>タグ追加</Button>
	</div>
	<div class="flex">
		<Textarea
			className="w-6/12"
			bind:value={values.plainBody}
			label="内容"
			error={errors.plainBody}
			rows={20}
		/>
		<PostContent html={htmlBody} className="border bg-white w-6/12 pt-2 px-4" />
	</div>
	<Select bind:value={status} options={statusOptions} className="w-10 mt-3" />

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
