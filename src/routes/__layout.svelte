<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.postcss';
</script>

<Header />
<div class="bg-gray-100 body">
	<slot />
</div>
<Footer />

<style>
	.body {
		min-height: calc(100vh - 6.5rem);
	}
</style>
