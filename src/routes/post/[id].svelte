<script context="module">
	export async function load({ page }) {
		const id = page.params.id;
		const post = await PostModelFactory.getDoc(id);
		return {
			props: {
				post
			}
		};
	}
</script>

<script lang="ts">
	import { PostModelFactory } from '$model/post';

	export let post;
	const author = {
		id: 'aaaa',
		name: 'tempakyousuke',
		image: '/tmp_profile.jpeg',
		postCount: '100'
	};
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>
<div class="px-10 py-6 bg-white rounded-lg shadow-md mx-auto w-10/12">
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
	<div class="flex items-center justify-between mt-4">
		<div>
			<a href="/author/{author.id}" class="flex items-center"
				><img
					src={author.image}
					alt="avatar"
					class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
				/>
				<h1 class="font-bold text-gray-700 hover:underline">{author.name}</h1>
			</a>
		</div>
	</div>
</div>

<style type="text/postcss">
	.tab {
		@apply border border-gray-300 cursor-pointer py-2 px-4 rounded-t-md;
	}
	.active {
		@apply border-b-0 text-blue-500;
	}
</style>
