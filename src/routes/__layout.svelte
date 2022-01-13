<script context="module">
	export async function load() {
		const q = query(collection(db, 'posts'), where('status', '==', 'public'), limit(1));
		const qu = query(collection(db, 'users'), where('allowed', '==', true));
		const snapshots = await getDocs(collection(db, 'tags'));
		const tags = [];
		snapshots.forEach((doc) => {
			tags.push(doc.data().name);
		});

		const authors = await UserModelFactory.getList(qu);
		const posts = await PostModelFactory.getList(q);
		authorsStore.set(authors);
		return {
			props: {
				posts,
				authors,
				tags
			}
		};
	}
</script>

<script lang="ts">
	import 'highlight.js/styles/github-dark.css';
	import { PostModelFactory } from '$model/post';
	import { UserModelFactory } from '$model/user';
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { query, where, collection, getDocs, limit } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';
	import '../app.postcss';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import AuthorListCard from '$lib/author/AuthorListCard.svelte';
	import TagListCard from '$lib/tag/TagListCard.svelte';
	import RecentPostCard from '$lib/recent_post/RecentPostCard.svelte';
	import { authorsStore } from '$modules/store/store';
	export let posts: PostModel[];
	export let authors: UserModel[];
	export let tags: string[];

	const getAuthor = (id: string) => {
		return authors.find((author) => {
			return author.id === id;
		});
	};
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
					<TagListCard {tags} />
				</div>
				<div class="px-8 mt-10">
					<h1 class="mb-4 text-xl font-bold text-gray-700">Recent Post</h1>
					<RecentPostCard post={posts[0]} author={getAuthor(posts[0].uid)} />
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
