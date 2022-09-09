import Script from 'next/script';
import React from 'react';

import { Inner } from '@apps/web/src/components/utils/inner';

import styles from './cookie_policy.module.scss';

type Props = {};

/**
 * @see https://support.cookieinformation.com/en/articles/5444214-cookie-policy-and-privacy-controls-implementation
 */
export const CookiePolicy = ({}: Props) => {
	return (
		<Inner className={styles.inner} size="small">
			<Script
				id="CookiePolicy"
				src="https://policy.app.cookieinformation.com/cid.js"
				data-culture="EN"
				type="text/javascript"
				defer
			/>

			<div id="cicc-template" />
		</Inner>
	);
};
