<script context="module">
	export async function load({ params }) {
		const name = params.name;
		const q = query(
			collection(db, 'posts'),
			where('tags', 'array-contains', name),
			where('status', '==', 'public'),
			orderBy('modified', 'desc')
		);
		const posts = await PostModelFactory.getList(q);
		return {
			props: {
				name,
				posts
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import { authorsStore } from '$modules/store/store';
	import { query, where, collection, orderBy } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';
	import PostCard from '$lib/post/PostCard.svelte';

	export let name;
	export let posts;
	let authors = [];
	authorsStore.subscribe((data) => {
		authors = data;
	});
	const getAuthor = (id: string) => {
		return authors.find((author) => {
			return author.id === id;
		});
	};
</script>

<div class="max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold text-gray-700 md:text-2xl">{name}の記事検索結果</h1>
	</div>
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} author={getAuthor(post.uid)} />
		</div>
	{/each}
</div>
