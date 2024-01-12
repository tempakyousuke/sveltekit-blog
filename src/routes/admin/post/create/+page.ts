import { getDocs, collection } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';

export async function load() {
	const co = collection(db, 'tags');
	const snapshots = await getDocs(co);
	const tags: string[] = [];
	snapshots.forEach((snapshot) => {
		tags.push(snapshot.data().name);
	});
	return {
		tags
	};
}
