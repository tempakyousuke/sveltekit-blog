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

<div>
	{#each posts as post}
		<PostCard {post} />
	{/each}
</div>
