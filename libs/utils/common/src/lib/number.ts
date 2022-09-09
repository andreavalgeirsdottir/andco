export const randomRange = (min: number, max: number, logic?: 'ceil' | 'floor') => {
	const value = Math.random() * (max - min) + min;

	if (logic === 'ceil') {
		return Math.ceil(value);
	}

	if (logic === 'floor') {
		return Math.floor(value);
	}

	return value;
};
