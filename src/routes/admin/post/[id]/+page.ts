import { PostModelFactory } from '$model/post';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';

export async function load({ params }) {
	const id = params.id;
	const post = await PostModelFactory.getDoc(id);
	const co = collection(db, 'tags');
	const snapshots = await getDocs(co);
	const tags: string[] = [];
	snapshots.forEach((snapshot) => {
		tags.push(snapshot.data().name);
	});
	return {
		post,
		tags: tags.map((tag) => {
			const preselected = post.tags.includes(tag);
			return { label: tag, value: tag, preselected };
		})
	};
}
