<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import type { PostModel } from '$model/post';
	import { user } from '$modules/store/store';
	import { query, where, collection } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';

	let posts: PostModel[] = [];
	user.subscribe(async (user) => {
		const uid = user.uid;
		const q = query(collection(db, 'posts'), where('uid', '==', uid));
		posts = await PostModelFactory.getList(q);
	});
</script>
