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
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { query, where, collection } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';
	import '../app.postcss';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import AuthorListCard from '$lib/author/AuthorListCard.svelte';
	import CategoryListCard from '$lib/category/CategoryListCard.svelte';
	import RecentPostCard from '$lib/recent_post/RecentPostCard.svelte';
	export let posts: PostModel[];
	export let authors: UserModel[];

	import type { Category } from '$types/category';
	const category: Category = {
		id: 'aaa',
		name: 'Svelte'
	};
	const categories: Category[] = new Array(5).fill(category);
</script>

<Header />
<div class="bg-gray-100 body">
	<div class="py-8">
		<div class="container flex justify-between px-2 mx-auto md:px-0">
			<div class="w-full lg:w-8/12">
				<slot />
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
					<RecentPostCard post={posts[0]} {category} author={authors[0]} />
				</div>
			</div>
		</div>
	</div>
</div>
<SvelteToast />
<Footer />

<style>
	.body {
		min-height: calc(100vh - 6.5rem);
	}
</style>
