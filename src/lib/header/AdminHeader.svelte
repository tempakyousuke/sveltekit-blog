<script>
	import { auth } from '$modules/firebase/firebase';
	import { signOut } from 'firebase/auth';
	const logout = () => {
		signOut(auth);
	};
</script>

<div>
	<nav class="px-6 py-4 bg-white shadow">
		<div class="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
			<div class="flex items-center justify-between">
				<div>
					<a sveltekit:prefetch href="/" class="text-xl font-bold text-gray-800 md:text-2xl">
						Azumaya Blog
					</a>
				</div>
				<div>
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
				</div>
			</div>
			<div class="flex-col hidden md:flex md:flex-row md:-mx-4">
				<a class="nav-link" href="/admin/">管理画面トップ</a>
				<a class="nav-link" href="/admin/post/create">新規記事</a>
				<span class="nav-link" on:click={logout}>ログアウト</span>
			</div>
		</div>
	</nav>
</div>

<style type="text/postcss">
	.nav-link {
		@apply my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 cursor-pointer;
	}
</style>
