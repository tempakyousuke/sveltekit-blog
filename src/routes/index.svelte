<script context="module">
	export async function load() {
		const q = query(collection(db, 'posts'), where('status', '==', 'public'));
		const posts = await PostModelFactory.getList(q);
		return {
			props: {
				posts
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import PostCard from '$lib/post/PostCard.svelte';
	import Pagination from '$lib/pagination/Pagination.svelte';
	import AuthorListCard from '$lib/author/AuthorListCard.svelte';
	import CategoryListCard from '$lib/category/CategoryListCard.svelte';
	import RecentPostCard from '$lib/recent_post/RecentPostCard.svelte';
	import type { PostModel } from '$model/post';
	import type { User } from '$types/user';
	import type { Category } from '$types/category';
	import { query, where, collection } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';

	export let posts: PostModel[];

	const author: User = {
		id: 'aaaa',
		name: 'tempakyousuke',
		image: '/tmp_profile.jpeg',
		postCount: '100'
	};
	const authors: User[] = new Array(5).fill(author);

	const category: Category = {
		id: 'aaa',
		name: 'Svelte'
	};
	const categories: Category[] = new Array(5).fill(category);
</script>

<svelte:head>
	<title>トップページ</title>
</svelte:head>

<div class="px-6 py-8">
	<div class="container flex justify-between mx-auto">
		<div class="w-full lg:w-8/12">
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
						<PostCard {post} {author} />
					</div>
				{/each}

				<div class="mt-8">
					<Pagination />
				</div>
			</div>
		</div>
		<div class="hidden w-4/12 -mx-8 lg:block">
			<div class="px-8">
				<h1 class="mb-4 text-xl font-bold text-gray-700">Authors</h1>
				<div class="max-w-sm mx-auto">
					<AuthorListCard {authors} />
				</div>
			</div>
			<div class="px-8 mt-10">
				<h1 class="mb-4 text-xl font-bold text-gray-700">Categories</h1>
			</div>
			<div class="max-w-sm mx-auto">
				<CategoryListCard {categories} />
			</div>
			<div class="px-8 mt-10">
				<h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
				<RecentPostCard post={posts[0]} {category} {author} />
			</div>
		</div>
	</div>
</div>
