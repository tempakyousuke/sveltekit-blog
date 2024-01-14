import { PostModelFactory } from '$model/post';
import { query, where, collection, orderBy } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';

export async function load({ params }) {
	const name = params.name;
	const q = query(
		collection(db, 'posts'),
		where('tags', 'array-contains', name),
		where('status', '==', 'public'),
		orderBy('modified', 'desc')
	);
	const posts = await PostModelFactory.getList(q);
	return {
		name,
		posts
	};
}
