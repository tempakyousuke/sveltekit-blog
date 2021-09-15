<script lang="ts">
	import PostCard from '$lib/post/PostCard.svelte';
	import type { Post } from '$types/post';

	const post: Post = {
		id: 'aaaa',
		title: 'sveltekitでブログ作ってみた',
		plainBody: 'htmlBodyも用意する予定。マークダウンで編集する。',
		htmlBody: ''
	};
	const posts: Post[] = [];
	for (let i = 0; i < 10; i++) {
		posts.push(post);
	}
</script>

<svelte:head>
	<title>トップページ</title>
</svelte:head>

<div class="px-6 py-8">
	<div class="container flex justify-between mx-auto">
		<div class="w-full lg:w-8/12">
			<div class="flex items-center justify-between">
				<h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
				<div>
					<select
						class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					>
						<option>Latest</option>
						<option>Last Week</option>
					</select>
				</div>
			</div>
			{#each posts as post}
				<PostCard {post} />
			{/each}
		</div>
	</div>
</div>
