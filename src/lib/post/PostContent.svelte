<script lang="ts">
	export let html: string;
	export let className = '';
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';

	onMount(() => {
		document.querySelectorAll('pre code').forEach((el) => {
			hljs.highlightElement(el as HTMLElement);
		});
	});
</script>

<div class="post {className}">
	{@html html}
</div>
