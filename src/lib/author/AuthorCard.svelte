<script lang="ts">
	import type { UserModel } from '$model/user';
	export let author: UserModel;
	export let className = '';
</script>

<div class="flex flex-col px-6 py-4 bg-white rounded-lg shadow-md text-center {className}">
	<img
		src={author.imageUrl}
		alt={author.name}
		class="object-cover w-48 h-48 rounded-full mx-auto"
	/>
	<div class="mt-4 text-xl">{author.name}</div>
	<div class="mt-4 whitespace-pre-wrap">{author.introduction}</div>
</div>
