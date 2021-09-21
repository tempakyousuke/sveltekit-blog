import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { LoginUser } from "$types/user";

export const user: Writable<LoginUser> = writable({ uid: '', name: '', allowed: false, isLoggedIn: false });
