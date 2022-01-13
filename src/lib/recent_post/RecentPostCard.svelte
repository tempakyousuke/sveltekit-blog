<script lang="ts">
	import type { PostModel } from '$model/post';
	import type { UserModel } from '$model/user';

	export let post!: PostModel;
	export let author!: UserModel;
</script>

<div class="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
	<div class="flex items-center justify-center">
		{#each post.tags as tag}
			<a
				sveltekit:prefetch
				href={`/tag/${tag}`}
				class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">{tag}</a
			>
		{/each}
	</div>
	<div class="mt-4">
		<a href="/post/{post.id}" class="text-lg font-medium text-gray-700 hover:underline">
			{post.title}
		</a>
	</div>
	<div class="flex items-center justify-between mt-4">
		<div class="flex items-center">
			<img src={author.imageUrl} alt="avatar" class="object-cover w-8 h-8 rounded-full" />
			<a href="/author/{author.identifier}" class="mx-3 text-sm text-gray-700 hover:underline">
				{author.name}
			</a>
		</div>
		<span class="text-sm font-light text-gray-600">Jun 1, 2020</span>
	</div>
</div>
