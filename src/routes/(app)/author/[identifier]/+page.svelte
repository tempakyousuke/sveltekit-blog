<script lang="ts">
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import AuthorCard from '$lib/author/AuthorCard.svelte';
	import PostCard from '$lib/post/PostCard.svelte';
	import { siteTitle } from '$modules/config/config';
	import { page } from '$app/stores';

	export let data: {
		posts: PostModel[];
		author: UserModel;
	};
	$: posts = data.posts;
	const author = data.author;
	const title = `${author.name}の記事一覧 - ${siteTitle}`;
	const description = `${author.name}が書いた記事一覧です`;
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

<div class="mx-auto">
	<AuthorCard {author} />
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} {author} />
		</div>
	{/each}
</div>
