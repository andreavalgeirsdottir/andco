/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import addons from '@storybook/addons';
import React, { useEffect, useState } from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

import { asLevel } from '@noa/theme';

import styles from './scheme-decorator.module.scss';

// get channel to listen to event emitter
const channel = addons.getChannel();

export const SchemeDecorator = (Story: any) => {
	// this example uses hook but you can also use class component as well
	const [isDark, setDark] = useState(false);

	useEffect(() => {
		// listen to DARK_MODE event
		channel.on(DARK_MODE_EVENT_NAME, setDark);
		return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
	}, [setDark]);

	return (
		<div data-scheme={isDark ? 'dark' : 'light'} className={styles['scheme']}>
			<div className={styles['level']} {...asLevel(1)}>
				<Story />
			</div>
		</div>
	);
};
