const math = require('mathjs');
const StyleDictionary = require('style-dictionary');

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/fontWeights',
	matcher: ({ type }) => {
		return type === 'fontWeights';
	},
	transformer: ({ value }) => {
		if (new RegExp(value, 'i').test(/thin/)) {
			return '100';
		}

		if (new RegExp(value, 'i').test(/extra light|ultra light|extralight|ultralight/)) {
			return '200';
		}

		if (new RegExp(value, 'i').test(/light/)) {
			return '300';
		}

		if (new RegExp(value, 'i').test(/normal|regular/)) {
			return '400';
		}

		if (new RegExp(value, 'i').test(/medium/)) {
			return '500';
		}

		if (new RegExp(value, 'i').test(/semi bold|demi bold|semibold|demibold/)) {
			return '600';
		}

		if (new RegExp(value, 'i').test(/bold/)) {
			return '700';
		}

		if (new RegExp(value, 'i').test(/extra bold|ultra bold|extrabold|ultrabold/)) {
			return '800';
		}

		if (new RegExp(value, 'i').test(/black|heavy/)) {
			return '900';
		}

		return value;
	},
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/flatten-properties',
	matcher: ({ value }) => {
		if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
		return true;
	},
	transformer: ({ value, name, type }) => {
		if (!value || typeof value !== 'object' || Array.isArray(value)) return;

		const entries = Object.entries(value);

		const flattendedValue = entries.reduce(
			(acc, [key, v], index) =>
				`${acc ? `${acc}\n  ` : ''}--${name}-${StyleDictionary.transform['name/cti/kebab'].transformer(
					{ path: [key] },
					{ prefix: '' },
				)}: ${v}${index + 1 === entries.length ? '' : ';'}`,
			`${name.includes(type) ? '' : `${type}-`}${name}-group;`,
		);

		return flattendedValue;
	},
});

const mathMatch = ['*', '+', '-', '/'];

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/math-to-calc',
	matcher: ({ value, type }) => {
		if (type && ['transition'].some((d) => type?.includes(d))) {
			return false;
		}

		return typeof value === 'string' && mathMatch.some((v) => value.indexOf('-') !== 0 && value?.includes(v));
	},
	transformer: ({ value }) => `calc(${value})`,
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/convertions',
	matcher: ({ type }) => {
		// If any of the properties we want to do convertions on
		if (type && ['letterSpacing', 'lineHeights'].some((d) => type?.includes(d))) {
			return true;
		}

		return false;
	},
	transformer: ({ value, type }) => {
		let rawValue = value;

		if (['letterSpacing', 'lineHeights'].some((d) => type.includes(d))) {
			rawValue = value.replace(/%/g, '');
			const valueAsNumber = parseInt(rawValue, 10);

			return `${valueAsNumber / 100}em`;
		}

		if (['letterSpacing', 'lineHeights'].some((d) => type.includes(d))) {
			rawValue = value.replace(/%/g, '');
			const valueAsNumber = parseInt(rawValue, 10);

			return `${valueAsNumber / 100}em`;
		}

		return value;
	},
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/number-to-px',
	matcher: ({ value, type }) => {
		if (!value) return;

		if (['fontSizes', 'borderRadius', 'borderWidth', 'spacing'].includes(type)) {
			// If the value includes a multiplier, it means it's using a reference CSS variable,
			// and should not be converted to pixels.
			if (typeof value === 'string' && !value.includes('*') && !Number.isNaN(value)) {
				return true;
			}
		}
	},
	transformer: ({ value }) => `${value}px`,
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/responsive-font-sizes',
	matcher: ({ value, type }) => {
		if (value && type === 'fontSizes') return true;
		return false;
	},
	transformer: ({ value }) => {
		const rawValue = value.split('px')[0];
		const valueToViewportWidth = (rawValue / 15).toFixed(2);
		const valueToScale = (1 + rawValue / 100 / 2).toFixed(2);

		return `clamp(${value}, ${valueToViewportWidth}vw, ${value} * ${valueToScale})`;
	},
});

const dropShadowToString = ({ x, y, blur, spread, color }) => {
	return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
};

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/box-shadow',
	matcher: ({ value, type }) => {
		if (value && type === 'boxShadow') return true;
		return false;
	},
	transformer: ({ value }) => {
		if (Array.isArray(value)) {
			return value.map(dropShadowToString).join(', ');
		}

		return dropShadowToString(value);
	},
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/native/math-to-number',
	matcher: ({ value }) => typeof value === 'string',
	transformer: ({ value }) => {
		try {
			if (value === '0') {
				return 0;
			}

			return math.evaluate(value) || value;
		} catch (err) {
			return value;
		}
	},
});

StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/native/convertions',
	matcher: ({ type }) => ['fontWeights'].some((t) => type.includes(t)),
	transformer: ({ value, type }) => {
		if (type === 'fontWeights') {
			return `${value}`;
		}

		return value;
	},
});

/**
 * Adds a clamped property including the clamp.min|value and clamp.max.
 *
 * DOESN'T WORK. Keeping for reference
 *
 * @note
 * This only works for SCSS variables.
 */
StyleDictionary.registerTransform({
	type: 'value',
	transitive: true,
	name: 'figma/web/clamp',
	matcher: ({ clamp }) => {
		// If the property have the `clamp` property.
		if (clamp) {
			return true;
		}

		return false;
	},
	transformer: ({ value, name, clamp }) => {
		if (!clamp.scale) {
			console.error(`${name} is missing the scale property. Fallback to 1vw`);
		}

		if (!clamp.max) {
			console.error(`${name} is missing the max property`);
		}

		let max = clamp.max;
		const min = clamp.min || value;

		if (mathMatch.some((v) => clamp.max?.includes(v))) {
			max = `calc(${clamp.max})`;
		}

		const clampedValue = `clamp(${min}, ${clamp.scale || '1vw'}, ${max})`;

		return clampedValue;
	},
});

module.exports = {
	groups: {
		'figma/web': [
			'figma/fontWeights',
			'figma/web/convertions',
			'figma/web/number-to-px',
			'figma/web/math-to-calc',
			'figma/web/box-shadow',
			'figma/web/responsive-font-sizes',
			'figma/web/clamp',
			'figma/web/flatten-properties',
		],
		'figma/native': ['figma/fontWeights', 'figma/native/math-to-number', 'figma/native/convertions'],
	},
};
