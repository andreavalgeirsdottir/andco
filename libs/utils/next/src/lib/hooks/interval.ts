import { useEffect, useRef } from 'react';

export const useInterval = (
	/**
	 * A callback to be executed every time the timer runs out.
	 * Wrap in `useCallback` to prevent unnecessary rerenders.
	 */
	callback: () => void,
	/**
	 * The timeout before each interval
	 */
	timeout: number,
) => {
	const interval = useRef<number>();

	useEffect(() => {
		interval.current = window.setInterval(callback, timeout);

		return () => window.clearInterval(interval.current);
	}, [callback, timeout]);
};
