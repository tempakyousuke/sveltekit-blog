<script lang="ts">
	import PostCard from '$lib/post/PostCard.svelte';
	// import Pagination from '$lib/pagination/Pagination.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { siteTitle, siteUrl } from '$modules/config/config';

	export let data: {
		posts: PostModel[];
		authors: UserModel[];
	};
	const posts = data.posts;
	const authors = data.authors;

	const getAuthor = (id: string) => {
		return authors.find((author) => author.id == id);
	};
	const description = 'SvelteKitとFirebaseで作った技術ブログ的なものです。';
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="”description“" content={description} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={siteUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="flex items-center justify-between">
		<h1 class="text-xl font-bold text-gray-700 md:text-2xl">記事一覧</h1>
		<div>
			<!-- <select
				class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
			>
				<option>Latest</option>
				<option>Last Week</option>
			</select> -->
		</div>
	</div>
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} author={getAuthor(post.uid)} />
		</div>
	{/each}

	<div class="mt-8">
		<!-- <Pagination /> -->
	</div>
</div>
