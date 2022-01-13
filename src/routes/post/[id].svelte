<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const post = await PostModelFactory.getDoc(id);
		const author = await UserModelFactory.getDoc(post.uid);
		return {
			props: {
				post,
				author
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import { UserModelFactory } from '$model/user';
	import AuthorCardRow from '$lib/author/AuthorCardRow.svelte';
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';

	export let post: PostModel;
	export let author: UserModel;
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>
<div class="mx-auto w-10/12">
	<div class="px-10 py-6 bg-white rounded-lg shadow-md">
		<div class="flex items-center justify-between">
			<span class="font-light text-gray-600">{post.createdDatetime}</span>
			{#each post.tags as tag}
				<a
					sveltekit:prefetch
					href={`/tag/${tag}`}
					class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">{tag}</a
				>
			{/each}
		</div>
		<div class="mt-2">
			<div class="text-2xl font-bold text-gray-700 hover:underline">
				{post.title}
			</div>
			<p class="mt-2 text-gray-600">
				{@html post.htmlBody}
			</p>
		</div>
	</div>
	<AuthorCardRow {author} className="mt-10" />
</div>
