<script lang="ts">
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import AuthorCard from '$lib/author/AuthorCard.svelte';
	import PostCard from '$lib/post/PostCard.svelte';
	import { siteTitle } from '$modules/config/config';

	export let data: {
		posts: PostModel[];
		author: UserModel;
	};
	$: posts = data.posts;
	$: author = data.author;
</script>

<svelte:head>
	<title>{author.name}の記事一覧 - {siteTitle}</title>
</svelte:head>

<div class="mx-auto">
	<AuthorCard {author} />
	{#each posts as post}
		<div class="mt-6">
			<PostCard {post} {author} />
		</div>
	{/each}
</div>
