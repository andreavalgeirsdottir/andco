import { TRANSITION } from './transitions';

export const MOTION_IN = {
	/**
	 * Fade in
	 */
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
	},
	/**
	 * Fade in `Left` from `Right`
	 */
	left: {
		initial: { opacity: 0, x: 10 },
		animate: { opacity: 1, x: 0 },
	},
	/**
	 * Fade in `Right` from `Left`
	 */
	right: {
		initial: { opacity: 0, x: -10 },
		animate: { opacity: 1, x: 0 },
	},
	/**
	 * Fade in `Up` from `Down`
	 */
	up: {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
	},
	/**
	 * Fade in `Down` from `Up`
	 */
	down: {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
	},
};

export const MOTION_OUT = {
	/**
	 * Fade out
	 */
	fade: {
		exit: { opacity: 0 },
	},
	/**
	 * Fade out `Left` from `Right`
	 */
	left: {
		exit: { opacity: 0, x: -10 },
	},
	/**
	 * Fade out `Right` from `Left`
	 */
	right: {
		exit: { opacity: 0, x: 10 },
	},
	/**
	 * Fade out `Up` from `Down`
	 */
	up: {
		exit: { opacity: 0, y: -10 },
	},
	/**
	 * Fade out `Down` from `Up`
	 */
	down: {
		exit: { opacity: 0, y: 10 },
	},
};

/**
 * Framer Motion animation builder
 *
 * This is a collection of different motions, separated by [`in`][`out`]
 *
 * @example
 * ```tsx
 * //                      IN      OUT
 * <motion.div {...MOTIONS['fade']['out-right']}> ... </div>
 * ```
 *
 * @example
 * ```tsx
 * //                      IN         OUT
 * <motion.div {...MOTIONS['in-left']['out-left']}> ... </div>
 * ```
 *
 * @see https://www.framer.com/docs/introduction/#animation
 */
export const MOTIONS = {
	fade: {
		fade: {
			transition: TRANSITION.quick,
			...MOTION_IN['fade'],
			...MOTION_OUT['fade'],
		},
		'out-right': {
			transition: TRANSITION.quick,
			...MOTION_IN['fade'],
			...MOTION_OUT['right'],
		},
		'out-left': {
			transition: TRANSITION.quick,
			...MOTION_IN['fade'],
			...MOTION_OUT['left'],
		},
		'out-up': {
			transition: TRANSITION.quick,
			...MOTION_IN['fade'],
			...MOTION_OUT['up'],
		},
		'out-down': {
			transition: TRANSITION.quick,
			...MOTION_IN['fade'],
			...MOTION_OUT['down'],
		},
	},
	'in-left': {
		fade: {
			transition: TRANSITION.quick,
			...MOTION_IN['left'],
			...MOTION_OUT['fade'],
		},
		'out-right': {
			transition: TRANSITION.quick,
			...MOTION_IN['left'],
			...MOTION_OUT['right'],
		},
		'out-left': {
			transition: TRANSITION.quick,
			...MOTION_IN['left'],
			...MOTION_OUT['left'],
		},
		'out-up': {
			transition: TRANSITION.quick,
			...MOTION_IN['left'],
			...MOTION_OUT['up'],
		},
		'out-down': {
			transition: TRANSITION.quick,
			...MOTION_IN['left'],
			...MOTION_OUT['down'],
		},
	},
	'in-right': {
		fade: {
			transition: TRANSITION.quick,
			...MOTION_IN['right'],
			...MOTION_OUT['fade'],
		},
		'out-right': {
			transition: TRANSITION.quick,
			...MOTION_IN['right'],
			...MOTION_OUT['right'],
		},
		'out-left': {
			transition: TRANSITION.quick,
			...MOTION_IN['right'],
			...MOTION_OUT['left'],
		},
		'out-up': {
			transition: TRANSITION.quick,
			...MOTION_IN['right'],
			...MOTION_OUT['up'],
		},
		'out-down': {
			transition: TRANSITION.quick,
			...MOTION_IN['right'],
			...MOTION_OUT['down'],
		},
	},
	'in-up': {
		fade: {
			transition: TRANSITION.quick,
			...MOTION_IN['up'],
			...MOTION_OUT['fade'],
		},
		'out-right': {
			transition: TRANSITION.quick,
			...MOTION_IN['up'],
			...MOTION_OUT['right'],
		},
		'out-left': {
			transition: TRANSITION.quick,
			...MOTION_IN['up'],
			...MOTION_OUT['left'],
		},
		'out-up': {
			transition: TRANSITION.quick,
			...MOTION_IN['up'],
			...MOTION_OUT['up'],
		},
		'out-down': {
			transition: TRANSITION.quick,
			...MOTION_IN['up'],
			...MOTION_OUT['down'],
		},
	},
	'in-down': {
		fade: {
			transition: TRANSITION.quick,
			...MOTION_IN['down'],
			...MOTION_OUT['fade'],
		},
		'out-right': {
			transition: TRANSITION.quick,
			...MOTION_IN['down'],
			...MOTION_OUT['right'],
		},
		'out-left': {
			transition: TRANSITION.quick,
			...MOTION_IN['down'],
			...MOTION_OUT['left'],
		},
		'out-up': {
			transition: TRANSITION.quick,
			...MOTION_IN['down'],
			...MOTION_OUT['up'],
		},
		'out-down': {
			transition: TRANSITION.quick,
			...MOTION_IN['down'],
			...MOTION_OUT['down'],
		},
	},
};
