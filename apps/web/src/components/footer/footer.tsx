import { getTestAttr } from '@noa/service-testing';
import { asLevel } from '@noa/theme';

import { Inner } from '@apps/web/src/components/utils/inner';

import styles from './footer.module.scss';

export function Footer() {
	return (
		<footer className={styles.footer} {...getTestAttr('footer')} {...asLevel(3)}>
			<Inner className={styles.inner}>
				<p>I'm the footer</p>
			</Inner>
		</footer>
	);
}
