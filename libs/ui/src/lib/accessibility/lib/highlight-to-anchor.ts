import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

import { sleep } from '@noa/utils-common';

import styles from './highlight-to-anchor.module.scss';

export const useHighlightAnchorEffect = () => {
	const { asPath, events } = useRouter();

	/**
	 * If the `asPath` contains an anchor, scroll to it
	 */
	const highlightAnchor = useCallback(async () => {
		if (asPath.includes('#')) {
			const anchor = asPath.split('#')[1];

			// Wait for DOM element
			await sleep(1000);

			const element = document.getElementById(anchor);

			if (element) {
				// Wait for getting into view
				await sleep(300);

				element.classList.add(styles.base);
				element.classList.add(styles.scrolledTo);

				// Let animation play
				await sleep(1600);

				element.classList.remove(styles.scrolledTo);

				// Wait for end animation to finish
				await sleep(500);

				element.classList.remove(styles.base);
			}
		}
	}, [asPath]);

	useEffect(() => {
		events.on('routeChangeComplete', highlightAnchor);

		return () => {
			events.off('routeChangeComplete', highlightAnchor);
		};
	}, [asPath, events, highlightAnchor]);
};
