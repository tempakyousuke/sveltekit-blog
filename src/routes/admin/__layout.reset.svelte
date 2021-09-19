<script lang="ts">
	import AdminHeader from '$lib/header/AdminHeader.svelte';
	import Footer from '$lib/footer/Footer.svelte';
	import '../../app.postcss';
	import { auth, db } from '$modules/firebase/firebase';
	import { doc, getDoc } from 'firebase/firestore';
	import { onAuthStateChanged } from 'firebase/auth';
	import { user } from '$modules/store/store';
	import { goto } from '$app/navigation';

	let loaded = false;
	let isLoggedIn = false;

	onAuthStateChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
			const userData = userDoc.data();
			user.set({
				uid: firebaseUser.uid,
				name: userData.name,
				isLoggedIn: true
			});
		} else {
			user.set({
				uid: '',
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
