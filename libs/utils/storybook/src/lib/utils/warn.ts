/**
 * Storybook Controls can have quantity controls which renders items in a list.
 * Use this utils to warn if the quantity is too high, and make sure that
 * the quantity never exceeds a certain amount `CAP`.
 */
export const safeLoopQuantity = (quantity: number, context = 'safeLoopQuantity') => {
	const CAP = 1000;

	if (quantity > CAP) {
		console.warn(context, 'Quantity is too high');
	}

	return quantity > CAP ? CAP : quantity;
};
