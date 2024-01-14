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
					<a href="/" class="text-xl font-bold text-gray-800 md:text-2xl"> Azumaya Blog </a>
				</div>
			</div>
			<div class="flex-col hidden md:flex md:flex-row md:-mx-4">
				<a class="nav-link" href="/admin/">管理画面トップ</a>
				<a class="nav-link" href="/admin/post/create">新規記事</a>
				<a class="nav-link" href="/admin/profile">プロフィール</a>
				<button class="nav-link" on:click={logout}>ログアウト</button>
			</div>
		</div>
	</nav>
</div>

<style lang="postcss">
	.nav-link {
		@apply my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 cursor-pointer;
	}
</style>
