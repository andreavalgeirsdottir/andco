/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import styles from './padded-decorator.module.scss';

export const PaddedDecorator = (Story: any) => {
	return (
		<div className={styles.padded}>
			<Story />
		</div>
	);
};
