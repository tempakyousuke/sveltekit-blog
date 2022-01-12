<script lang="ts">
	import Button from '$lib/button/Button.svelte';
	import Input from '$lib/forms/Input.svelte';
	import Textarea from '$lib/forms/Textarea.svelte';
	import ImagePicker from '$lib/forms/Image.svelte';

	import * as yup from 'yup';
	import { user } from '$modules/store/store';
	import { doc, getDoc, updateDoc } from 'firebase/firestore';
	import { ref, uploadBytes } from 'firebase/storage';
	import { db, firestorage } from '$modules/firebase/firebase';
	import { goto } from '$app/navigation';
	import { UserModelFactory } from '$model/user';
	import type { UserModel } from '$model/user';

	type UploadData = {
		name: string;
		introduction: string;
		imagePath?: string;
	};

	const schema = yup.object().shape({
		name: yup.string().required('名前は必須です'),
		introduction: yup.string().required('紹介文は必須です')
	});

	let uid = '';
	let image;
	let author: UserModel;
	let defaultImage = '';

	let values = {
		name: '',
		introduction: ''
	};

	let errors = {
		name: '',
		introduction: ''
	};

	const submit = () => {
		schema
			.validate(values, { abortEarly: false })
			.then(() => {
				updateUser();
			})
			.catch((err) => {
				err.inner.forEach((error) => {
					errors[error.path] = error.message;
				});
			});
	};

	const updateUser = async () => {
		const data: UploadData = { ...values };
		if (image !== undefined) {
			const imagePath = `/users/${uid}/${image.name}`;
			const upRef = ref(firestorage, imagePath);
			await uploadBytes(upRef, image);
			data.imagePath = imagePath;
		}

		await updateDoc(doc(db, 'users', uid), data);
		goto('/admin');
	};

	user.subscribe(async (user) => {
		uid = user.uid;
		const author = await UserModelFactory.getDoc(uid);
		values.name = author.name;
		values.introduction = author.introduction;
		await author.imagePromise;
		defaultImage = author.imageUrl;
	});
</script>

<div class="container mx-auto pt-10">
	<ImagePicker bind:file={image} {defaultImage} />
	<Input className="mt-6" bind:value={values.name} label="名前" error={errors.name} />
	<Textarea
		className="mt-6"
		bind:value={values.introduction}
		label="自己紹介"
		error={errors.introduction}
	/>
	<Button className="mt-6" on:click={submit}>更新</Button>
</div>
