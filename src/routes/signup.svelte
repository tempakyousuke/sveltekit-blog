<script lang="ts">
	import Input from '$lib/forms/Input.svelte';
	import Button from '$lib/button/Button.svelte';
	import { auth, db } from '$modules/firebase/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let name = '';

	const signUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await setDoc(doc(db, 'users', user.uid), {
					name,
					allowed: false
				});
				goto('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<div class="min-w-md flex justify-center items-center self-center pt-20">
	<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md w-full max-w-md">
		<h1>新規登録</h1>
		<form>
			<Input bind:value={name} type="email" label="名前" className="mt-2" />
			<Input bind:value={email} type="email" label="メールアドレス" className="mt-2" />
			<Input bind:value={password} type="password" label="パスワード" className="mt-2" />
			<Button block className="mt-5" on:click={signUp}>登録</Button>
		</form>
	</div>
</div>
