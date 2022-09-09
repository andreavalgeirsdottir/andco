import Config from '@web/config';

if (!Config.SANITY_PROJECT_ID) {
	throw new Error('No project id configured - Please set the SANITY_PROJECT_ID environment variable\n');
}

export const config = {
	/**
	 * Find your project ID and dataset in `sanity.json` in your studio project.
	 * These are considered “public”, but you can use environment variables
	 * if you want differ between local dev and production.
	 *
	 * https://nextjs.org/docs/basic-features/environment-variables
	 * */
	dataset: Config.SANITY_DATASET,
	projectId: Config.SANITY_PROJECT_ID,
	apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
	/**
	 * Set useCdn to `false` if your application require the freshest possible
	 * data always (potentially slightly slower and a bit more expensive).
	 * Authenticated request (like preview) will always bypass the CDN
	 * */
	useCdn: process.env.NODE_ENV === 'production',
};
