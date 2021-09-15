<script lang="ts">
	import type { Category } from '$types/category';
	export let categories!: Category[];
</script>

<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md">
	<ul>
		{#each categories as category}
			<li>
				<a
					href="/category/{category.id}"
					class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
				>
					- {category.name}
				</a>
			</li>
		{/each}
	</ul>
</div>
