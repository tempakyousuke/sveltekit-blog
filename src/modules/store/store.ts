import { writable } from 'svelte/store';

export const user = writable({ uid: '', name: '', isLoggedIn: false });
