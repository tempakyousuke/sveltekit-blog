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
	import { marked } from 'marked';
	import { PostModelFactory } from '$model/post';

	export let post;
	let values = {
		title: post.title,
		plainBody: post.plainBody
	};
	$: htmlBody = marked.parse(values.plainBody);
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<div class="container mx-auto pt-10">
	{@html htmlBody}
</div>

<style type="text/postcss">
	.tab {
		@apply border border-gray-300 cursor-pointer py-2 px-4 rounded-t-md;
	}
	.active {
		@apply border-b-0 text-blue-500;
	}
</style>
