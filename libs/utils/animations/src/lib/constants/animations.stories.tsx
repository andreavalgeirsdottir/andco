import { Meta, Story } from '@storybook/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { keys } from '@noa/utils-common';
import { CenterDecorator, PaddedDecorator } from '@noa/utils-storybook';

import { MOTIONS } from './animations';
import { TRANSITION } from './transitions';
import { MOTIONS_VARIANTS } from './variants';

import styles from './animations.stories.module.scss';

export default {
	title: 'Theme/Animations',
	parameters: [CenterDecorator, PaddedDecorator],
} as Meta;

type MotionArguments = {
	animateIn: keyof typeof MOTIONS;
	animateOut: keyof typeof MOTIONS['fade'];
	transition: keyof typeof TRANSITION;
	animate: boolean;
	interval: number;
};

const useMotionInterval = (args: MotionsArguments | MotionArguments, initialShow = false) => {
	const intervalRef = useRef<number>();
	const [show, setShow] = useState(initialShow);

	useEffect(() => {
		intervalRef.current = window.setInterval(() => {
			if (!args.animate) return;
			setShow((s) => !s);
		}, args.interval);

		return () => window.clearInterval(intervalRef?.current);
	}, [args?.animate]);

	return { show };
};

const MotionTemplate: Story<MotionArguments> = (args) => {
	const { show } = useMotionInterval(args, true);

	return (
		<div className={styles.div}>
			<AnimatePresence>
				{show && (
					<motion.div
						{...MOTIONS[args.animateIn][args.animateOut]}
						className={styles.card}
						transition={args.transition ? TRANSITION[args.transition] : undefined}
					>
						Hello
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export const MotionStory = MotionTemplate.bind({});

MotionStory.storyName = 'Motions';

MotionStory.args = {
	animate: true,
	animateIn: 'in-left',
	animateOut: 'out-left',
	interval: 1000,
	transition: 'quick',
};

MotionStory.argTypes = {
	interval: {
		description: '`@internal` The interval between animation trigger',
	},
	animate: {
		description: '`@internal` Whether the animation should be triggered',
	},
	animateIn: {
		description: 'The animation that will be used for animating the component when entering/mounting',
		options: keys(MOTIONS),
		control: {
			type: 'radio',
		},
	},
	animateOut: {
		options: keys(MOTIONS.fade).filter((v) => !['animate', 'initial', 'exit'].includes(v)),
		description: 'The animation that will be used for animating the component when exiting/unmounting',
		control: {
			type: 'radio',
		},
	},
	transition: {
		options: keys(TRANSITION),
		description:
			'The duration and easing of the animation. Will be used for both, but can be added to both `animate` and `exit` alone.',
		control: {
			type: 'radio',
		},
	},
};

type MotionsArguments = {
	animationVariant: keyof typeof MOTIONS_VARIANTS;
	transition: keyof typeof TRANSITION;
	animate: boolean;
	interval: number;
};

const title = ['hello', 'darkness', 'my', 'old', 'friend'];

const MotionsTemplate: Story<MotionsArguments> = (args) => {
	const { show } = useMotionInterval(args);
	const { motionList, motionItem } = MOTIONS_VARIANTS[args.animationVariant];

	return (
		<div className={styles.div}>
			<motion.div className={styles.wrapper} {...motionList} animate={show ? 'animate' : 'exit'}>
				{title.map((t) => (
					<motion.div key={t} className={styles.title} {...motionItem}>
						{t}
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};

export const MotionsStory = MotionsTemplate.bind({});

MotionsStory.storyName = 'Motions Variants';

MotionsStory.args = {
	animate: true,
	animationVariant: 'staggeredFade',
	interval: 3000,
};

MotionsStory.argTypes = {
	interval: {
		description: '`@internal` The interval between animation trigger',
	},
	animate: {
		description: '`@internal` Whether the animation should be triggered',
	},
	animationVariant: {
		description:
			"The animation that will be used for animating the component and it's children when entering/mounting",
		options: keys(MOTIONS_VARIANTS),
		control: {
			type: 'radio',
		},
	},
};
