<script lang="ts">
	import AdminHeader from '$lib/header/AdminHeader.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../../app.postcss';
	import { auth } from '$modules/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { user } from '$modules/store/store';
	import { goto } from '$app/navigation';

	let loaded = false;
	let isLoggedIn = false;

	onAuthStateChanged(auth, (firebaseUser) => {
		if (firebaseUser) {
			user.set({
				name: '',
				isLoggedIn: true
			});
		} else {
			user.set({
				name: '',
				isLoggedIn: false
			});
		}
	});
	user.subscribe((value) => {
		isLoggedIn = value.isLoggedIn;
		if (loaded && !isLoggedIn) {
			goto('/signin');
		}
		loaded = true;
	});
</script>

<AdminHeader />
{#if loaded && isLoggedIn}
	<div class="bg-gray-100 body">
		<slot />
	</div>
	<Footer />
{/if}

<style>
	.body {
		min-height: calc(100vh - 6.5rem);
	}
</style>
