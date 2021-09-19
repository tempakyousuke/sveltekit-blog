import { writable } from 'svelte/store';

export const user = writable({ uid: '', name: '', allowed: false, isLoggedIn: false });
