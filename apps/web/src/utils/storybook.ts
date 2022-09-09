import { AspectRatio } from '@web/components/media/aspectRatios';

export function getDropdownControl<T>(options: T[]) {
	return {
		options,
		control: {
			type: 'select',
		},
	};
}

export function getDropdownControlForEnum<Enum extends Record<string, string | number>>(options: Enum) {
	const keys = Object.keys(options).filter((e) => typeof e === 'string');

	return {
		options: keys,
		mapping: Object.fromEntries(keys.map((e) => [e, options[e]])),
	};
}

const ratios = Object.values(AspectRatio).filter((e) => typeof e === 'string');

export function getAspectRatioControl() {
	return {
		options: ratios,
		mapping: Object.fromEntries(ratios.map((e) => [e, AspectRatio[e as AspectRatio]])),
	};
}
