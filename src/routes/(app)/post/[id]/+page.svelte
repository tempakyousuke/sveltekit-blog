<script lang="ts">
	import AuthorCardRow from '$lib/author/AuthorCardRow.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';
	import { authorsStore } from '$modules/store/store';
	import PostContent from '$lib/post/PostContent.svelte';
	import { siteTitle } from '$modules/config/config';
	import { page } from '$app/stores';

	export let data: {
		post: PostModel;
	};
	$: post = data.post;

	let authors: UserModel[] = [];
	let author: UserModel | undefined;

	$: author = getAuthor(data.post.uid);

	authorsStore.subscribe((data) => {
		authors = data;
	});

	const getAuthor = (id: string) => {
		return authors.find((author) => {
			return author.id === id;
		});
	};

	function createDescription(htmlContent: string) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlContent, 'text/html');
		const text = doc.body.textContent || '';
		return text.slice(0, 40) + '...';
	}

	const title = `${data.post.title} - ${siteTitle}`;
	const description = createDescription(data.post.htmlBody);
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
<div class="mx-auto w-11/12">
	<div class="px-4 md:px-10 py-6 bg-white rounded-lg shadow-md">
		<div class="mt-2">
			<div class="text-2xl font-bold text-gray-700">
				{post.title}
			</div>
			<div
				class="mt-2 flex flex-col md:flex-row items-start md:items-center md:justify-between text-sm"
			>
				<div class="font-light text-gray-600">
					<span>投稿日 {post.firstPostedDate}</span><br class="md:hidden" />
					<span class="md:ml-5">更新日 {post.modifiedDate}</span>
				</div>
				{#each post.tags as tag}
					<a
						href={`/tag/${tag}`}
						class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">{tag}</a
					>
				{/each}
			</div>
			<PostContent html={post.htmlBody} className="mt-12 text-gray-600" />
		</div>
	</div>
	<AuthorCardRow {author} className="mt-10" />
</div>
