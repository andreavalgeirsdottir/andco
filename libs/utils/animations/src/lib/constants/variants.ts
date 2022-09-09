import { Variants } from 'framer-motion';

import { MOTIONS } from './animations';

export const getStaggeredBase = (duration = 0.2) =>
	({
		variants: {
			animate: {
				transition: {
					staggerChildren: duration,
				},
			},
			exit: {
				transition: {
					staggerChildren: duration / 3,
					staggerDirection: -1,
				},
			},
		},
		initial: 'exit',
		animate: 'animate',
	} as Variants);

/**
 * Framer Motion animation templates
 *
 * This is a collection of different motions including both `in` and `out`.
 *
 * @see {@link MOTIONS}
 *
 * @example
 * ```tsx
 * //                      IN + OUT
 * <motion.div {...MOTIONS.fade.fade}> ... </div>
 * ```
 *
 * @example
 * ```tsx
 * //                      IN + OUT
 * <motion.div {...MOTIONS_GROUP['left']}> ... </div>
 * ```
 *
 * @see https://www.framer.com/docs/introduction/#animation
 * @see https://www.framer.com/docs/transition/#staggerchildren
 */
export const MOTIONS_VARIANTS = {
	staggeredFade: {
		motionList: getStaggeredBase(0.2) as Variants,
		motionItem: {
			variants: MOTIONS.fade.fade,
		} as Variants,
	},
};
