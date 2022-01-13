<script context="module">
	export async function load({ page }) {
		const identifier = page.params.identifier;
		const q = query(
			collection(db, 'users'),
			where('identifier', '==', identifier),
			orderBy('modified', 'desc')
		);
		const authors = await UserModelFactory.getList(q);
		const author = authors[0];
		const qp = query(
			collection(db, 'posts'),
			where('uid', '==', author.id),
			where('status', '==', 'public')
		);
		const posts = await PostModelFactory.getList(qp);
		return {
			props: {
				author,
				posts
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import { UserModelFactory } from '$model/user';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { query, where, collection, orderBy } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';
	import AuthorCard from '$lib/author/AuthorCard.svelte';
	import PostCard from '$lib/post/PostCard.svelte';

	export let posts: PostModel[];
	export let author: UserModel;
</script>

<div class="mx-auto">
	<AuthorCard {author} />
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} {author} />
		</div>
	{/each}
</div>
