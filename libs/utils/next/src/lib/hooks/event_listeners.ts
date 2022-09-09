import { useCallback, useEffect, useRef } from 'react';

import { EventListenerCallback } from '@noa/utils-common';

export const useOnClickOutsideEffect = <TElement extends HTMLElement = HTMLElement>(
	ref: React.RefObject<TElement>,
	onClickOutside: (event: MouseEvent) => void,
	condition?: boolean,
) => {
	const closeOnClickOutside: EventListenerCallback<'click'> = useCallback(
		(e) => {
			if (!ref.current || !e.target || condition !== true) return;

			if (!(ref.current as HTMLElement)?.contains(e.target as HTMLElement)) {
				onClickOutside(e);
			}
		},
		[onClickOutside, condition],
	);

	useEffect(() => {
		if (condition !== true) return;

		window.addEventListener('click', closeOnClickOutside);

		return () => window.removeEventListener('click', closeOnClickOutside);
	}, [condition, closeOnClickOutside]);
};

export const useOnClickOutside = <TElement extends HTMLElement = HTMLElement>(
	onClickOutside: (event: MouseEvent) => void,
	condition?: boolean,
) => {
	const ref = useRef<TElement>(null);

	useOnClickOutsideEffect(ref, onClickOutside, condition);

	return ref;
};
