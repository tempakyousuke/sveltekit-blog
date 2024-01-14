import { PostModelFactory } from '$model/post';
import { UserModelFactory } from '$model/user';
import { query, where, collection, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';
import { authorsStore } from '$modules/store/store';

export const ssr = false;

export async function load() {

  const q = query(collection(db, 'posts'), where('status', '==', 'public'), orderBy('modified', 'desc'), limit(1));
  const qu = query(collection(db, 'users'), where('allowed', '==', true));
  const snapshots = await getDocs(collection(db, 'tags'));
  const tags: string[] = [];
  snapshots.forEach((doc) => {
    tags.push(doc.data().name);
  });

  const authors = await UserModelFactory.getList(qu);
  const posts = await PostModelFactory.getList(q);
  authorsStore.set(authors);
  return {
    posts,
    authors,
    tags
  };
}
