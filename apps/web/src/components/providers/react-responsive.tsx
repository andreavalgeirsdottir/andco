import { isServer } from '@noaignite-dk/utils-next';
import throttle from 'lodash/throttle';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

export const INITIAL_SCREEN_WIDTH = 1024;

type Props = { children: ReactNode };

/**
 * We're using React-Responsive to conditionally render JSX based on the screen width.
 *
 * Our pages our being built using Next.js static site generation, so we're using the server to render the JSX.
 *
 * That conflicts with the React-Responsive library, as the pages are rendered on the server, so this provider
 * sets a fallback value for the screen width and then updates using resize.
 *
 * Note:
 * While developing we cannot use the persisted width but instead {@link INITIAL_SCREEN_WIDTH} for initial render.
 */
export const ReactResponsiveProvider = ({ children }: Props) => {
	const [width, setWidth] = useState<number>(INITIAL_SCREEN_WIDTH);

	const setResponsiveContextValue = useCallback(() => {
		if (isServer) return;

		setWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		setResponsiveContextValue();

		const throttledHandleResize = throttle(setResponsiveContextValue, 200);

		window.addEventListener('resize', throttledHandleResize);

		return () => window.removeEventListener('resize', throttledHandleResize);
	}, [setResponsiveContextValue]);

	return <ResponsiveContext.Provider value={{ width }}>{children}</ResponsiveContext.Provider>;
};
