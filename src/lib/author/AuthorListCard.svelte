<script lang="ts">
	import type { UserModel } from '$model/user';
	export let authors!: UserModel[];
	$: filteredAuthors = authors.filter((author) => author.postCount > 0);
</script>

<div class="flex flex-col px-6 py-4 bg-white rounded-lg shadow-md">
	<ul class="-mx-4 -pt-4">
		{#each filteredAuthors as author, i}
			<li class="flex items-center {i !== 0 ? 'mt-6' : ''}">
				<img src={author.imageUrl} alt="avatar" class="object-cover w-10 h-10 mx-4 rounded-full" />
				<p>
					<a href="/author/{author.identifier}" class="mx-1 font-bold text-gray-700 hover:underline"
						>{author.name}</a
					>
					<span class="text-sm font-light text-gray-700">{author.postCount}</span>
				</p>
			</li>
		{/each}
	</ul>
</div>
