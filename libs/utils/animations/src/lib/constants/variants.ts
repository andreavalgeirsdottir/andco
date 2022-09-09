import { Variants } from 'framer-motion';

import { MOTIONS } from './animations';

export enum VARIANT_STATES {
	in = 'animate',
	out = 'exit',
}

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
		} as Record<VARIANT_STATES, Variants>,
		initial: 'exit',
		animate: 'animate',
	} as Variants);

/**
 * Framer Motion Variant animation templates
 *
 * This is a collection of different motions including both `in` and `out`.
 *
 * @see {@link MOTIONS}
 *
 * @example
 * ```tsx
	const title = ['hello', 'darkness', 'my', 'old', 'friend'];

  const Component = () => {
		const [parent, item] = MOTIONS_VARIANTS.staggerFade;

		return (
			<motion.div {...parent}>
				{title.map((t) => (
					<motion.div key={t} {...item}>
						{t}
					</motion.div>
				))}
			</motion.div>
		)
	}
 * ```
 *
 * @see https://www.framer.com/docs/introduction/#animation
 * @see https://www.framer.com/docs/transition/#staggerchildren
 */
export const MOTIONS_VARIANTS = {
	staggerFade: [
		getStaggeredBase(0.2) as Variants,
		{
			variants: MOTIONS.fade.fade as Variants,
		},
	] as [Variants, { variants: Variants }],
};
