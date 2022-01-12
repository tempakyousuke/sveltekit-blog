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
	identifire: string;
	imagePath: string;
	introduction: string;
	imageUrl: string;
	imagePromise: Promise<void>;
	postCount: number;
	created: Timestamp;
	modified: Timestamp;

	constructor(init: Required<UserModel>) {
		this.id = init.id;
		this.name = init.name;
		this.identifire = init.identifire;
		this.imagePath = init.imagePath;
		this.introduction = init.introduction;
		this.postCount = init.postCount;
		this.created = init.created;
		this.modified = init.modified;
		this.imagePromise = getDownloadURL(ref(firestorage, this.imagePath)).then((src) => {
			this.imageUrl = src;
		});
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
		const users: UserModel[] = [];
		snapshot.forEach((doc) => {
			const data = doc.data();
			const post = {
				id: doc.id,
				...data
			} as Required<UserModel>;
			users.push(new UserModel(post));
		});
		return users;
	},
	getDoc: async (id: string): Promise<UserModel> => {
		const postDoc = await getDoc(doc(db, 'users', id));
		const post = postDoc.data();

		const data = {
			id,
			...post
		} as Required<UserModel>;
		return new UserModel(data);
	}
};
