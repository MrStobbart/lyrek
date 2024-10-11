import { writable, type Writable } from 'svelte/store';

export function persistentWritable<T>(name: string, initialValue: T): Writable<T> {
	const store = writable<T>(initialValue);
	const { subscribe, set, update } = store;
	const isBrowser = typeof window !== 'undefined';

	if (isBrowser && localStorage[name]) {
		set(JSON.parse(localStorage[name]));
	}

	return {
		subscribe,
		set: (newValue) => {
			if (isBrowser) {
				localStorage[name] = JSON.stringify(newValue);
			}
			set(newValue);
		},
		update: (updater) => {
			if (isBrowser && localStorage[name]) {
				localStorage[name] = JSON.stringify(updater);
			}
			update(updater);
		}
	};
}
