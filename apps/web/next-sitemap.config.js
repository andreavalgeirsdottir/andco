/* eslint-disable padding-line-between-statements */
const path = require('node:path');

const productionUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: productionUrl,
	generateRobotsTxt: true,
	exclude: ['/server-sitemap.xml'], // <= exclude here
	robotsTxtOptions: {
		additionalSitemaps: [`${productionUrl}/server-sitemap.xml`],
	},
	sourceDir: path.resolve(__dirname, '../../dist/apps/web/.next'),
	outDir: path.resolve(__dirname, '../../dist/apps/web/public'),
};
