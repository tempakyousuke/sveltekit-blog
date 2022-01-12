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
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import dayjs from 'dayjs';
import { UserModelFactory } from '$model/user';

export class PostModel {
	id: string;
	title: string;
	plainBody: string;
	htmlBody: string;
	uid: string;
	tags: string[];
	status: string;
	created: Timestamp;
	modified: Timestamp;
	firstPosted?: Timestamp;

	constructor(init: Required<PostModel>) {
		this.id = init.id;
		this.title = init.title;
		this.plainBody = init.plainBody;
		this.htmlBody = init.htmlBody;
		this.uid = init.uid;
		this.tags = init.tags;
		this.status = init.status;
		this.firstPosted = init.firstPosted ?? null;
		this.created = init.created;
		this.modified = init.modified;
	}

	get beginning(): string {
		const string = this.htmlBody.replace(/(<([^>]+)>)/gi, '');
		return string.slice(0, 100) + '...';
	}

	get createdDay(): dayjs.Dayjs {
		return dayjs(this.created.toDate());
	}

	get createdDatetime(): string {
		return this.createdDay.format('YYYY-MM-DD HH:mm');
	}

	async update(post: Post): Promise<void> {
		const data: any = post;
		if (this.firstPosted === null && post.status === 'public') {
			data.firstPosted = serverTimestamp();
		}
		if (this.status !== post.status) {
			const user = await UserModelFactory.getDoc(this.uid);
			if (post.status === 'public') {
				user.increaseCount();
			} else {
				user.decreaseCount();
			}
		}
		await updateDoc(doc(db, 'posts', this.id), {
			...data,
			modified: serverTimestamp()
		});
	}
}

export type Post = Exclude<
	PostModel,
	'constructor' | 'createdDay' | 'createdDatetime' | 'update' | 'id' | 'created' | 'modified'
>;

export const PostModelFactory = {
	getList: async (q: Query | null = null): Promise<PostModel[]> => {
		const query = q ? q : collection(db, 'posts');
		const snapshot = await getDocs(query);
		const posts: PostModel[] = [];
		snapshot.forEach((doc) => {
			const data = doc.data();
			const post = {
				id: doc.id,
				...data
			} as Required<PostModel>;
			posts.push(new PostModel(post));
		});
		return posts;
	},
	getDoc: async (id: string): Promise<PostModel> => {
		const postDoc = await getDoc(doc(db, 'posts', id));
		const post = postDoc.data();

		const data = {
			id,
			...post
		} as Required<PostModel>;
		return new PostModel(data);
	}
};
