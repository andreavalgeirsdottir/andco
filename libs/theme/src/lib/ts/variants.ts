import classnames from 'classnames';

/**
 * Collects the variants of a component and return a scoped classname for the variants.
 *
 * The base variant type will be be taken from before the first hyphen
 *
 * @example
 * ```tsx
			import styles from './button.module.scss';

			const getVariant = getVariantsClassNames(styles);

			const Button = ({
				variant,
				children
			}: {
				variant: 'fill-white' | 'fill-black' | 'stroke',
				children: React.ReactNode
			}) => {
				const className = getVariant('variant', variant)

				return (
					<button className={className}>
						{children}
					</button>
				)
			}
 * ```
 *
 * @example
 * ```scss
		.variant {
			// Variant Type
			&-fill {
				border-radius: 5px;
				transition: filter 0.15s ease-in-out;

				// The Variants
				&-white {
					background-color: white;
					color: black;
				}
				&-black {
					background-color: black;
					color: white;
				}
			}

			&-stroke {
				border-radius: 2px;
				border: 1px solid black;
			}
		}
 * ```
 */
export const getVariantsClassNames =
	(
		/**
		 * If you're using CSS Modules, then pass the styles `object` so we can extend it
		 */
		moduleStyles?: Record<string, string>,
		/**
		 * If you want to `console.log` out the different possible `classnames`.
		 * If you pass a `string`, it will be added to the `console.group` as an identifier.
		 */
		__DEBUG__?: boolean | string,
	) =>
	<T extends string>(
		/**
		 * The variant type which will be prefixed to the `classname`
		 */
		prefix: string,
		/**
		 * The variants of the variant type
		 */
		variant?: T,
	) => {
		const [variantType] = variant?.split('-') || [];

		if (process.env.NODE_ENV === 'development' && __DEBUG__) {
			console.group(typeof __DEBUG__ === 'string' ? __DEBUG__ : prefix);
			console.info(`${prefix}`);
			if (variantType) console.info(`${prefix}-${variantType}`);
			if (variant && variantType !== variant) console.info(`${prefix}-${variant}`);
			console.groupEnd();
		}

		if (moduleStyles) {
			return classnames({
				[moduleStyles[prefix]]: !!moduleStyles[prefix],
				[moduleStyles[`${prefix}-${variantType}`]]:
					!!variantType && !!moduleStyles[`${prefix}-${variantType}`],
				[moduleStyles[`${prefix}-${variant}`]]: !!variant && !!moduleStyles[`${prefix}-${variant}`],
			});
		}

		return classnames({
			[prefix]: !!prefix,
			[`${prefix}-${variantType}`]: true,
			[`${prefix}-${variant}`]: true,
		});
	};
