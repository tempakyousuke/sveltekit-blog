<script context="module">
	export async function load({ params }) {
		const id = params.id;
		const post = await PostModelFactory.getDoc(id);
		const co = collection(db, 'tags');
		const snapshots = await getDocs(co);
		const tags = [];
		snapshots.forEach((snapshot) => {
			tags.push(snapshot.data().name);
		});
		return {
			props: {
				post,
				tags: tags.map((tag) => {
					const preselected = post.tags.includes(tag);
					return { label: tag, value: tag, preselected };
				})
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
	import { getDocs, collection } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import TagModal from '$lib/tag/TagModal.svelte';
	import MultiSelect from 'svelte-multiselect';
	import { marked } from 'marked';
	import { PostModelFactory } from '$model/post';
	import PostContent from '$lib/post/PostContent.svelte';

	export let post;
	let values = {
		title: post.title,
		plainBody: post.plainBody
	};
	let errors = {
		title: '',
		plainBody: ''
	};
	export let tags: string[] = [];
	$: htmlBody = marked.parse(values.plainBody);
	let tab = 'input';

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
		<MultiSelect bind:selectedValues={selectedTags} options={tags} />
		<Button className="ml-2" on:click={() => (openTagModal = true)}>タグ追加</Button>
	</div>
	<div class="flex mt-5">
		<div
			class="tab"
			class:active={tab === 'input'}
			on:click={() => {
				tab = 'input';
			}}
		>
			入力
		</div>
		<div
			class="tab"
			class:active={tab === 'preview'}
			on:click={() => {
				tab = 'preview';
			}}
		>
			プレビュー
		</div>
	</div>
	{#if tab === 'input'}
		<Textarea bind:value={values.plainBody} label="内容" error={errors.plainBody} />
	{:else}
		<PostContent html={htmlBody} />
	{/if}
	<div>
		<Select bind:value={status} options={statusOptions} />
	</div>

	<Button on:click={submit}>保存</Button>
	<TagModal bind:open={openTagModal} on:complete={getTags} />
</div>

<style lang="postcss">
	.tab {
		@apply border border-gray-300 cursor-pointer py-2 px-4 rounded-t-md;
	}
	.active {
		@apply border-b-0 text-blue-500;
	}
</style>
