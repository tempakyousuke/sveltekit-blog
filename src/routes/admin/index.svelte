<script lang="ts">
	import { PostModelFactory } from '$model/post';
	import type { PostModel } from '$model/post';
	import { user } from '$modules/store/store';
	import { query, where, collection } from 'firebase/firestore';
	import { db } from '$modules/firebase/firebase';
	import AdminPost from '$lib/post/AdminPost.svelte';

	let posts: PostModel[] = [];
	user.subscribe(async (user) => {
		const uid = user.uid;
		const q = query(collection(db, 'posts'), where('uid', '==', uid));
		posts = await PostModelFactory.getList(q);
		console.log(posts);
	});
</script>

<div class="px-6 py-8">
	<div class="container flex justify-between mx-auto">
		<div class="w-full">
			<div class="max-w-4xl mx-auto">
				{#each posts as post}
					<div class="mt-6">
						<AdminPost {post} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
