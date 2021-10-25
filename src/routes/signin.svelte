<script lang="ts">
	import * as yup from 'yup';
	import Input from '$lib/forms/Input.svelte';
	import Button from '$lib/button/Button.svelte';
	import { auth } from '$modules/firebase/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { goto } from '$app/navigation';

	let values = {
		email: '',
		password: ''
	};

	let errors = {
		email: '',
		password: ''
	};

	$: hasError = errors.email !== '' || errors.password !== '';

	const schema = yup.object().shape({
		email: yup
			.string()
			.required('メールアドレスは必須です')
			.email('メールアドレスが正しくありません'),
		password: yup
			.string()
			.required('パスワードは必須です')
			.min(6, 'パスワードは6文字以上入力してください')
	});

	const validate = (path: string) => {
		schema
			.validateAt(path, values)
			.then(() => {
				errors[path] = '';
			})
			.catch((err) => {
				errors[path] = err.message;
			});
	};

	const submit = () => {
		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				signIn();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const signIn = () => {
		signInWithEmailAndPassword(auth, values.email, values.password)
			.then(() => {
				goto('/admin');
			})
			.catch((error) => {
				console.error(error);
			});
	};
</script>

<div class="min-w-md flex justify-center items-center self-center pt-20">
	<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md w-full max-w-md">
		<h1>ログイン</h1>
		<form>
			<Input
				bind:value={values.email}
				type="email"
				label="メールアドレス"
				className="mt-2"
				error={errors.email}
				on:input={() => validate('email')}
			/>
			<Input
				bind:value={values.password}
				type="password"
				label="パスワード"
				className="mt-6"
				error={errors.password}
				on:input={() => validate('password')}
			/>
			<Button block className="mt-6" on:click={submit} disabled={hasError}>ログイン</Button>
		</form>
	</div>
</div>
