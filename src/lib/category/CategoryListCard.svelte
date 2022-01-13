<script lang="ts">
	export let tags!: string[];
</script>

<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md">
	<ul>
		{#each tags as tag}
			<li>
				<a
					href="/tag/{tag}"
					class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
				>
					- {tag}
				</a>
			</li>
		{/each}
	</ul>
</div>
