<script lang="ts">
	import type { PostModel } from '$model/post';

	export let post!: PostModel;

	const postPageLink = `/admin/post/${post.id}`;
</script>

<div class="px-10 py-6 bg-white rounded-lg shadow-md">
	<div class="flex items-center justify-between">
		<span class="font-light text-gray-600">Jun 1, 2020</span>
		<a
			sveltekit:prefetch
			href="/"
			class="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500">Laravel</a
		>
	</div>
	<div class="mt-2">
		<a
			sveltekit:prefetch
			href={postPageLink}
			class="text-2xl font-bold text-gray-700 hover:underline"
		>
			{post.title}</a
		>
		<p class="mt-2 text-gray-600">
			{post.plainBody}
		</p>
	</div>
</div>
