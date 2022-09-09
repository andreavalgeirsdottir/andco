import { MotionProps } from 'framer-motion';

export const TRANSITION = {
	instant: {
		type: 'spring',
		stiffness: 100,
		default: { duration: 0.1 },
	},
	quick: {
		type: 'spring',
		stiffness: 100,
		default: { duration: 0.15 },
	},
	base: {
		type: 'spring',
		stiffness: 100,
		default: { duration: 0.3 },
	},
	smooth: {
		type: 'spring',
		stiffness: 100,
		default: { duration: 0.6 },
	},
} as Record<'quick' | 'base' | 'smooth' | 'instant', MotionProps['transition']>;
