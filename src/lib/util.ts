export const wait = (timeout?: number) => {
	return new Promise<void>((resolve) => setTimeout(resolve, timeout));
};

export const timestampToDisplay = (timestamp: number) => dateToDisplay(new Date(timestamp));
export const dateToDisplay = (date: Date) => {
	const addPadding = (number: number) => String(number).padStart(2, '0');
	const day = addPadding(date.getDate());
	const month = addPadding(date.getMonth() + 1); // Months are 0-based
	const year = String(date.getFullYear()).slice(-2); // Get last two digits
	const hours = addPadding(date.getHours());
	const minutes = addPadding(date.getMinutes());
	return `${day}.${month}.${year} - ${hours}:${minutes}`;
};
