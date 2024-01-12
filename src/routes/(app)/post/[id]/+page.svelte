<script lang="ts">
	import AuthorCardRow from '$lib/author/AuthorCardRow.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { authorsStore } from '$modules/store/store';
	import PostContent from '$lib/post/PostContent.svelte';

	export let data: {
		post: PostModel;
	};
	const post = data.post;
	let authors: UserModel[] = [];
	let author: UserModel;

	const getAuthor = (id: string) => {
		author = authors.find((author) => {
			return author.id === id;
		});
	};

	authorsStore.subscribe((data) => {
		authors = data;
		getAuthor(post.uid);
	});
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>
<div class="mx-auto w-11/12">
	<div class="px-4 md:px-10 py-6 bg-white rounded-lg shadow-md">
		<div class="flex flex-col md:flex-row items-start md:items-center md:justify-between">
			<div class="font-light text-gray-600">
				<span>投稿日 {post.firstPostedDatetime}</span><br class="md:hidden" />
				<span class="md:ml-5">更新日 {post.modifiedDatetime}</span>
			</div>
			{#each post.tags as tag}
				<a
					href={`/tag/${tag}`}
					class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">{tag}</a
				>
			{/each}
		</div>
		<div class="mt-2">
			<div class="text-2xl font-bold text-gray-700">
				{post.title}
			</div>
			<PostContent html={post.htmlBody} className="mt-2 text-gray-600" />
		</div>
	</div>
	<AuthorCardRow {author} className="mt-10" />
</div>
