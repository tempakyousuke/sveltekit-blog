<script lang="ts">
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';

	export let post!: PostModel;
	export let author: UserModel | undefined;

	const postPageLink = `/post/${post.id}`;
</script>

<div class="px-10 py-6 bg-white rounded-lg shadow-md">
	<div class="flex items-center justify-between">
		<span class="font-light text-gray-600">{post.firstPostedDate}</span>
		{#each post.tags as tag}
			<a
				href={`/tag/${tag}`}
				class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">{tag}</a
			>
		{/each}
	</div>
	<div class="mt-2">
		<a href={postPageLink} class="text-2xl font-bold text-gray-700 hover:underline">
			{post.title}</a
		>
		<p class="mt-2 text-gray-600">
			{post.beginning}
		</p>
	</div>
	<div class="flex items-center justify-between mt-4">
		<a href={postPageLink} class="text-blue-500 hover:underline">Read more</a>
		<div>
			<a href="/author/{author?.identifier}" class="flex items-center">
				<img
					src={author?.imageUrl}
					alt="avatar"
					class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
				/>
				<h1 class="font-bold text-gray-700 hover:underline">{author?.name}</h1>
			</a>
		</div>
	</div>
</div>
