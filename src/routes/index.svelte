<script context="module">
	export async function load() {
		const q = query(collection(db, 'posts'), where('status', '==', 'public'));
		const qu = query(collection(db, 'users'), where('allowed', '==', true));

		const authors = await UserModelFactory.getList(qu);
		const posts = await PostModelFactory.getList(q);
		return {
			props: {
				posts,
				authors
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import { UserModelFactory } from '$model/user';
	import PostCard from '$lib/post/PostCard.svelte';
	import Pagination from '$lib/pagination/Pagination.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { query, where, collection } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';

	export let posts: PostModel[];
	export let authors: UserModel[];

	const getAuthor = (id: string) => {
		return authors.find((author) => author.id == id);
	};
</script>

<svelte:head>
	<title>トップページ</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
		<div>
			<select
				class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			>
				<option>Latest</option>
				<option>Last Week</option>
			</select>
		</div>
	</div>
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} author={getAuthor(post.uid)} />
		</div>
	{/each}

	<div class="mt-8">
		<Pagination />
	</div>
</div>
