<script>
	import { user } from '$modules/store/store';
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth, db } from '$modules/firebase/firebase';
	import { doc, getDoc } from 'firebase/firestore';

	onAuthStateChanged(auth, async (firebaseUser) => {
		if (firebaseUser) {
			const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
			if (userDoc.exists()) {
				const userData = userDoc.data();
				user.set({
					uid: firebaseUser.uid,
					name: userData.name,
					allowed: userData.allowed,
					isLoggedIn: true
				});
			}
		} else {
			user.set({
				uid: '',
				name: '',
				allowed: false,
				isLoggedIn: false
			});
		}
	});

	let allowed = false;

	user.subscribe((user) => {
		allowed = user?.allowed;
	});
</script>

<div>
	<nav class="px-6 py-4 bg-white shadow">
		<div class="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
			<div class="flex items-center justify-between">
				<div>
					<a href="/" class="text-xl font-bold text-gray-800 md:text-2xl">Azumaya Blog</a>
				</div>
				<!-- <div>
					<button
						type="button"
						class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
					>
						<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
							<path
								d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
							/>
						</svg>
					</button>
				</div> -->
			</div>
			<div class="flex-col hidden md:flex md:flex-row md:-mx-4">
				<a href="/" class="nav-link">Home</a>
				{#if allowed}
					<a href="/admin" class="nav-link">執筆者メニュー</a>
				{/if}
				<!-- <a href="/" class="nav-link">Blog</a>
        <a href="/" class="nav-link">About us</a> -->
			</div>
		</div>
	</nav>
</div>

<style lang="postcss">
	.nav-link {
		@apply my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0;
	}
</style>
