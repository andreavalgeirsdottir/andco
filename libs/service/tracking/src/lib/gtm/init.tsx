import { useEffect, useState } from 'react';

declare global {
	interface Window {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		google_tag_manager: any;
	}
}

const isDevelopment = process.env['NODE_ENV'] === 'development';

/**
 * Use Effect hook which initializes GTM
 * Add to the for of the `_app.tsx` file.
 *
 * By default GTM will only be initialized in production.
 * Use the `options.enable` prop to force GTM to be initialized in development.
 */
export const useInitGtm = (
	/**
	 * The GTM ID
	 * If not provided, GTM will not be executed before it's available
	 */
	id: string | undefined,
	options: {
		enable?: boolean;
	} = { enable: !isDevelopment },
) => {
	const [init, setInit] = useState(false);

	const initGtm = () => {
		if (!id) return;

		if (!window.google_tag_manager || !window.google_tag_manager[id]) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			((w: any, d: any, s, l, i) => {
				// eslint-disable-next-line no-param-reassign
				w[l] = w[l] || [];
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
				const f = d.getElementsByTagName(s)[0];
				const j = d.createElement(s);
				const dl = l !== 'dataLayer' ? `&l=${l}` : '';
				j.async = true;
				j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', id);
		}
	};

	useEffect(() => {
		if (init || !id || !options.enable) return;

		initGtm();

		setInit(true);
		// Only execute once and only if id is set
	}, [id]);
};
