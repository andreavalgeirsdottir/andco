declare global {
	interface Window {
		dataLayer: DataLayerItem[];
	}
}

/**
 * GTM Event names. These are the event names that are used in the GTM snippet.
 *
 * The naming convention follows:
 * - `context`
 * - `context.action`
 * - `context.action.modifier`
 */
export type Events = '';

type DataLayerItem<Options = unknown> = {
	event: Events;
} & Options;

/**
 * @returns The `dataLayer` array.
 */
const getDataLayer = () => (typeof window !== 'undefined' && window.dataLayer) || [];

/**
 * @returns Whether the `dataLayer` array is initialized and available.
 */
const isInitialized = async () => {
	const dl = getDataLayer();

	return dl.length > 0;
};

/**
 * Track an event
 *
 * @example
 * ```tsx
 * <button onClick={() => trackEvent({ event: string, options: data })}>Text</button>
 * ```
 */
const add = async <O,>(data: DataLayerItem<O>) => {
	const dl = getDataLayer();

	if (!(await isInitialized())) {
		console.error('GTM not initialized', data);
	}

	dl.push(data);
};

/**
 * ### Google Tag Manager
 *
 * Each time a "SEO expert" asks for a new custom GTM event, question whether they can't do it themselves through GTM.
 * It's much easier for them to update and won't require a new deployment to update the event.
 */
export const gtm = {
	add,
	getDataLayer,
	isInitialized,
};
