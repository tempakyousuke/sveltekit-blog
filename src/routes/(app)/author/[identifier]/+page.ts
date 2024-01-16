import { query, where, collection, orderBy } from 'firebase/firestore';
import { db } from '$modules/firebase/firebase';
import { PostModelFactory } from '$model/post';
import { UserModelFactory } from '$model/user';

export async function load({ params }) {
  const identifier = params.identifier;
  const q = query(
    collection(db, 'users'),
    where('identifier', '==', identifier),
    orderBy('modified', 'desc')
  );
  const authors = await UserModelFactory.getList(q);
  const author = authors[0];
  const qp = query(
    collection(db, 'posts'),
    where('uid', '==', author.id),
    where('status', '==', 'public'),
    orderBy('modified', 'desc')
  );
  const posts = await PostModelFactory.getList(qp);
  return {
    author,
    posts
  };
}
