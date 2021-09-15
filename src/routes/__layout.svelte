<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../app.postcss';
</script>

<Header />
<div class="bg-gray-100">
	<slot />
</div>
<Footer />
