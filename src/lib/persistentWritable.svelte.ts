type GlobalState<T> = [() => T, (newValue: T) => void];

export function createGlobalPersistantState<T>(name: string, initialValue: T): GlobalState<T> {
	let value = $state<T>(initialValue);

	const isBrowser = typeof window !== 'undefined';

	const read = () => {
		if (isBrowser && localStorage[name] !== undefined) {
			value = JSON.parse(localStorage[name]);
		}
		return value;
	};
	const write = (newValue: T) => {
		if (isBrowser) {
			localStorage[name] = JSON.stringify(newValue);
		}
		value = newValue;
	};
	return [read, write];
}

export function createGlobalState<T>(initialValue: T): GlobalState<T> {
	let value = $state<T>(initialValue);

	const read = () => value;
	const write = (newValue: T) => {
		value = newValue;
	};
	return [read, write];
}

export function createGlobalDerivedState<T>(derivedFn: () => T): GlobalState<T>[0] {
	const derivedState = $derived.by(derivedFn);
	const read = () => derivedState;
	return read;
}
