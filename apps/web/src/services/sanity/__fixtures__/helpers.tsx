export function getByRolloverIndex<T>(items: T[], index: number): T {
	const maxIndex = items.length - 1;
	if (index <= maxIndex) {
		return items[index];
	}

	return getByRolloverIndex(items, index - items.length);
}
