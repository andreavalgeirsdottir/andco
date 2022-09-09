import { getTestAttr } from '@noa/service-testing';
import { asLevel } from '@noa/theme';

import { Inner } from '@apps/web/src/components/utils/inner';

import styles from './header.module.scss';

export const Header = () => {
	return (
		<header className={styles.header} {...getTestAttr('header')} {...asLevel(2, true)}>
			<Inner className={styles.inner} paddingConfig={{ size: 'small' }}>
				<p>I'm the header</p>
			</Inner>
		</header>
	);
};
