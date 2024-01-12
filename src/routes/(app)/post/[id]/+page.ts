import { PostModelFactory } from '$model/post';

export async function load({ params }) {
  const id = params.id;
  const post = await PostModelFactory.getDoc(id);
  return {
    post
  }
}
