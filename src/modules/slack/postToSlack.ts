import { db } from '$modules/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { siteUrl } from '$modules/config/config';

export async function postToSlack(postId: string) {
	try {
		const articleUrl = `${siteUrl}/post/${postId}`;
		const webhookDoc = await getDoc(doc(db, 'config', 'SlackWebhookUrl'));
		const data = webhookDoc.data();
		if (data === undefined) {
			return;
		}
		const webhookUrl = data.url;
		const payload = {
			text: `新しい記事を投稿したよ: ${articleUrl}`
		};

		return fetch(webhookUrl, {
			method: 'POST',
			mode: 'no-cors',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => console.log('Success:', response))
			.catch((error) => console.error('Error:', error));
	} catch (e) {
		console.log(e);
		// 管理者以外SlackWebhookUrlは読み取れないので何もしない。
	}
}
