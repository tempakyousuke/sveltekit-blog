<script lang="ts">
	import type { UserModel } from '$model/user';
	export let author: UserModel;
	export let className = '';
</script>

<div class="flex flex-col md:flex-row px-6 py-4 bg-white rounded-lg shadow-md {className}">
	<a href="/author/{author.identifier}">
		<img
			src={author.imageUrl}
			alt={author.name}
			class="object-cover w-16 h-16 md:w-32 md:h-32 rounded-full mx-auto"
		/>
	</a>
	<div class="flex-grow ml-10">
		<div class="mt-4 text-xl">
			<a href="/author/{author.identifier}">
				{author.name}
			</a>
		</div>
		<div class="mt-4 whitespace-pre-wrap text-sm">{author.introduction}</div>
	</div>
</div>
