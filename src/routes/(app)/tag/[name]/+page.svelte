<script lang="ts">
	import { authorsStore } from '$modules/store/store';
	import PostCard from '$lib/post/PostCard.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { siteTitle } from '$modules/config/config';

	export let data: {
		name: string;
		posts: PostModel[];
	};

	$: name = data.name;
	$: posts = data.posts;
	let authors: UserModel[] = [];
	authorsStore.subscribe((data) => {
		authors = data;
	});
	const getAuthor = (id: string) => {
		return authors.find((author) => {
			return author.id === id;
		});
	};
</script>

<svelte:head>
	<title>{name}のタグがついた記事一覧 - {siteTitle}</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold text-gray-700 md:text-2xl">{name}のタグがついた記事一覧</h1>
	</div>
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} author={getAuthor(post.uid)} />
		</div>
	{/each}
</div>
