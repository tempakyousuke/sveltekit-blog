import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { LoginUser } from '$types/user';
import type { UserModel } from '$model/user';

export const user: Writable<LoginUser> = writable({
	uid: '',
	name: '',
	allowed: false,
	isLoggedIn: false
});
export const authorsStore: Writable<UserModel[]> = writable([]);
