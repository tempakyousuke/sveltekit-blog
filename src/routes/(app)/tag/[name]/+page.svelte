<script lang="ts">
	import { authorsStore } from '$modules/store/store';
	import PostCard from '$lib/post/PostCard.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { siteTitle } from '$modules/config/config';
	import { page } from '$app/stores';

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
	const title = `${data.name}のタグがついた記事一覧 - ${siteTitle}`;
	const description = `${data.name}のタグがついた記事の一覧です。`;
	const currentPageUrl = $page.url.href;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="”description“" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={currentPageUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
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
