<script lang="ts">
	import * as yup from 'yup';
	import Input from '$lib/forms/Input.svelte';
	import Button from '$lib/button/Button.svelte';
	import { auth, db } from '$modules/firebase/firebase';
	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { doc, setDoc } from 'firebase/firestore';
	import { goto } from '$app/navigation';
	import { toast } from '$modules/toast/toast';

	let values = {
		name: '',
		identifier: '',
		email: '',
		password: ''
	};

	let errors = {
		name: '',
		identifier: '',
		email: '',
		password: ''
	};

	$: hasError =
		errors.name !== '' || errors.identifier !== '' || errors.email !== '' || errors.password !== '';

	const schema = yup.object().shape({
		name: yup.string().required('名前は必須です'),
		identifier: yup.string().required('識別子は必須です'),
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
				signUp();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const signUp = () => {
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await setDoc(doc(db, 'users', user.uid), {
					name: values.name,
					identifier: values.identifier,
					allowed: false
				});
				goto('/');
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};
</script>

<div class="min-w-md flex justify-center items-center self-center pt-20">
	<div class="flex flex-col px-4 py-6 bg-white rounded-lg shadow-md w-full max-w-md">
		<h1>新規登録</h1>
		<form>
			<Input
				bind:value={values.name}
				label="名前"
				className="mt-2"
				error={errors.name}
				on:input={() => validate('name')}
			/>
			<Input
				bind:value={values.identifier}
				label="識別子(アルファベット、URL用)"
				className="mt-6"
				error={errors.identifier}
				on:input={() => validate('identifier')}
			/>
			<Input
				bind:value={values.email}
				type="email"
				label="メールアドレス"
				className="mt-6"
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
			<Button block className="mt-5" on:click={submit}>登録</Button>
		</form>
	</div>
</div>
