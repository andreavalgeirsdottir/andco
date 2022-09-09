/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './center-decorator.module.scss';

export const CenterDecorator = (Story: any) => {
	return (
		<div className={styles.center}>
			<Story />
		</div>
	);
};
