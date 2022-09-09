import { useEffect } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { Levels } from '../../generated/schema';
import { Theme } from './types';

/**
 * Detect whether the code is being executed on the server or the client.
 * @see {@link https://github.com/vercel/next.js/issues/5354#issuecomment-520305040}
 */
export const isServer = typeof window === 'undefined';

/**
 * The Element to add the data attribute on
 */
const dataAttributeElement = !isServer ? document.body : undefined;

/**
 * Get the current theme from the data attribute
 */
export const getColorScheme = (): Theme['scheme'] | null => {
	return dataAttributeElement?.getAttribute('data-theme') as Theme['scheme'];
};

const colorSchemeAtom = atom<Theme['scheme'] | null>({
	key: 'colorSchemeAtom',
	default: null,
});

/**
 * Get the current theme the global Recoil state to triggers rerenders on `matchMedia` change
 *
 * @see {@link getColorScheme}
 */
export const useColorScheme = (): Theme['scheme'] | null => {
	const colorScheme = useRecoilValue(colorSchemeAtom);

	return colorScheme || getColorScheme();
};

/**
 * Set the current theme to the data attribute
 */
export const setColorScheme = (theme: Theme['scheme']) => {
	if (isServer) return;

	return dataAttributeElement?.setAttribute('data-theme', theme);
};

/**
 * Add event listener to the document to detect when the user changes the theme
 * Sets a data attribute `data-theme` on the `<body>` element
 */
export const useColorSchemeFromPrefersColorSchemeEffect = () => {
	const setGlobalColorScheme = useSetRecoilState(colorSchemeAtom);

	const setColorSchemeFromPrefersColorScheme = ({ matches }: MediaQueryListEvent) => {
		const newScheme = matches ? 'dark' : 'light';
		setColorScheme(newScheme);
		setGlobalColorScheme(newScheme);
	};

	const initColorScheme = () => {
		const newScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		if (getColorScheme() === null) {
			setColorScheme(newScheme);
			setGlobalColorScheme(newScheme);
		}
	};

	useEffect(() => {
		if (isServer) return;

		initColorScheme();

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', setColorSchemeFromPrefersColorScheme);

		return () =>
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', setColorSchemeFromPrefersColorScheme);
	}, []);
};

export const asLevel = (level: Levels, reversed?: boolean) => {
	return {
		'data-level': level,
		'data-reversed': reversed,
	};
};

export const asScheme = (schemeAndLevel: `${Theme['scheme']}-${Levels}`) => {
	return {
		'data-scheme': schemeAndLevel,
	};
};
