<script lang="ts">
	import type { Post } from '$types/post';
	import type { User } from '$types/user';
	import type { Category } from '$types/category';

	export let post!: Post;
	export let author!: User;
	export let category!: Category;
</script>

<div class="flex flex-col max-w-sm px-8 py-6 mx-auto bg-white rounded-lg shadow-md">
	<div class="flex items-center justify-center">
		<a
			href="/category/{category.id}"
			class="px-2 py-1 text-sm text-green-100 bg-gray-600 rounded hover:bg-gray-500"
		>
			{category.name}
		</a>
	</div>
	<div class="mt-4">
		<a href="/post/{post.id}" class="text-lg font-medium text-gray-700 hover:underline">
			{post.title}
		</a>
	</div>
	<div class="flex items-center justify-between mt-4">
		<div class="flex items-center">
			<img src={author.image} alt="avatar" class="object-cover w-8 h-8 rounded-full" />
			<a href="/author/{author.id}" class="mx-3 text-sm text-gray-700 hover:underline">
				{author.name}
			</a>
		</div>
		<span class="text-sm font-light text-gray-600">Jun 1, 2020</span>
	</div>
</div>
