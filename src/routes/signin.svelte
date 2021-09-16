<script lang="ts">
	import Input from '$lib/forms/Input.svelte';
	import Button from '$lib/button/Button.svelte';
	import { auth } from '$lib/firebase/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';

	let email = '';
	let password = '';

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				console.log(user);
				// TODO: redirect to maypage
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<div class="min-w-md flex justify-center items-center self-center pt-20">
	<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md w-full max-w-md">
		<h1>ログイン</h1>
		<form>
			<Input bind:value={email} type="email" label="メールアドレス" className="mt-2" />
			<Input bind:value={password} type="password" label="パスワード" className="mt-2" />
			<Button block className="mt-5" on:click={signIn}>ログイン</Button>
		</form>
	</div>
</div>
