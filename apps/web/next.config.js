/* eslint-disable padding-line-between-statements */
const nextTypeSafePages = require('next-type-safe-routes/plugin');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withNx = require('@nrwl/next/plugins/with-nx');
const { withGlobalCss } = require('next-global-css');
const redirects = require('./redirects');

const withConfig = withGlobalCss();

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
	sassOptions: {
		includePaths: ['node_modules', path.join(__dirname, 'libs/**/*.scss')],
	},
	images: {
		domains: ['cdn.sanity.io', 'localhost:4200'],
		loader: 'custom',
	},
	nx: {
		svgr: true,
	},
	redirects,
};

module.exports = withPlugins(
	[nextTypeSafePages({ outputDir: './types/generated/routes.d.ts' }), withNx(), withConfig],
	nextConfig,
);
