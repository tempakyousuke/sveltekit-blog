import { PostModelFactory } from '$model/post';
import { UserModelFactory } from '$model/user';
import { query, where, collection } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';

export async function load() {
  const qu = query(collection(db, 'users'), where('allowed', '==', true));

  const authors = await UserModelFactory.getList(qu);
  const posts = await PostModelFactory.getList();
  return {
      posts,
      authors
  };
}
