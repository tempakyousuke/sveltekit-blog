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
import type { DocumentReference, DocumentData } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import dayjs from 'dayjs';

export class PostModel {
	id: string;
	title: string;
	plainBody: string;
	htmlBody: string;
	uid: string;
	tags: string[];
	status: string[];
	created: Timestamp;
	modified: Timestamp;

	constructor(init: Required<PostModel>) {
		this.id = init.id;
		this.title = init.title;
		this.plainBody = init.plainBody;
		this.htmlBody = init.htmlBody;
		this.uid = init.uid;
		this.tags = init.tags;
		this.status = init.status;
		this.created = init.created;
		this.modified = init.modified;
	}

	get createdDay(): dayjs.Dayjs {
		return dayjs(this.created.toDate());
	}

	get createdDatetime(): string {
		return this.createdDay.format('YYYY-MM-DD HH:mm');
	}

	update(post: Post): Promise<void> {
		return updateDoc(doc(db, 'posts', this.id), {
			...post,
			modified: serverTimestamp()
		});
	}
}

export type Post = Exclude<
	PostModel,
	'constructor' | 'createdDay' | 'createdDatetime' | 'update' | 'id' | 'created' | 'modified'
>;

export const PostModelFactory = {
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
