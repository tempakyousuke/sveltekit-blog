<script lang="ts">
	import Modal from '$lib/modal/Modal.svelte';
	import Input from '$lib/forms/Input.svelte';
	import Button from '$lib/button/Button.svelte';
	export let open = false;
	let name = '';
	import { db } from '$modules/firebase/firebase';
	import { addDoc, collection } from 'firebase/firestore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const createTag = async () => {
		await addDoc(collection(db, 'tags'), {
			name
		});
		open = false;
		name = '';
		dispatch('complete');
	};
</script>

<Modal bind:open on:ok={createTag} hideOk hideCancel title="タグ追加">
	<Input bind:value={name} label="タグ名" />
	<Button className="mt-3" disabled={!name} on:click={createTag}>追加</Button>
</Modal>
