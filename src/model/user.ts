import type { Timestamp } from 'firebase/firestore';
import { db, firestorage } from '$modules/firebase/firebase';
import {
	doc,
	getDoc,
	getDocs,
	updateDoc,
	collection,
	serverTimestamp,
	deleteDoc
} from 'firebase/firestore';
import type { DocumentReference, DocumentData, Query } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import dayjs from 'dayjs';

export class UserModel {
	id: string;
	name: string;
	identifier: string;
	imagePath: string;
	introduction: string;
	imageUrl: string;
	postCount: number;
	created: Timestamp;
	modified: Timestamp;

	constructor(init: Required<UserModel>) {
		this.id = init.id;
		this.name = init.name;
		this.identifier = init.identifier;
		this.imagePath = init.imagePath;
		this.introduction = init.introduction;
		this.postCount = init.postCount;
		this.created = init.created;
		this.modified = init.modified;
		this.imageUrl = init.imageUrl;
	}

	get createdDay(): dayjs.Dayjs {
		return dayjs(this.created.toDate());
	}

	get createdDatetime(): string {
		return this.createdDay.format('YYYY-MM-DD HH:mm');
	}

	increaseCount() {
		this.update({
			postCount: this.postCount + 1
		});
	}

	decreaseCount() {
		this.update({
			postCount: this.postCount - 1
		});
	}

	update(user: Partial<UserModel>): Promise<void> {
		return updateDoc(doc(db, 'users', this.id), {
			...user,
			modified: serverTimestamp()
		});
	}
}

export type User = Exclude<
	UserModel,
	'constructor' | 'createdDay' | 'createdDatetime' | 'update' | 'id' | 'created' | 'modified'
>;

export const UserModelFactory = {
	getList: async (q: Query | null = null): Promise<UserModel[]> => {
		const query = q ? q : collection(db, 'users');
		const snapshot = await getDocs(query);
		const promises: Promise<UserModel>[] = [];
		snapshot.forEach((doc) => {
			const promise = (async () => {
				const data = doc.data();
				const imageUrl = data.imagePath
					? await getDownloadURL(ref(firestorage, data.imagePath))
					: '';
				const post = {
					id: doc.id,
					imageUrl,
					...data
				} as Required<UserModel>;
				return new UserModel(post);
			})();
			promises.push(promise);
		});
		return Promise.all(promises);
	},
	getDoc: async (id: string): Promise<UserModel> => {
		const postDoc = await getDoc(doc(db, 'users', id));
		const post = postDoc.data();
		const imageUrl = post?.imagePath ? await getDownloadURL(ref(firestorage, post.imagePath)) : '';

		const data = {
			id,
			imageUrl,
			...post
		} as Required<UserModel>;
		return new UserModel(data);
	}
};
