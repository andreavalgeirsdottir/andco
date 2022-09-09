/* eslint-disable no-param-reassign */
const rootMain = require('../../../.storybook/main');

module.exports = {
	...rootMain,
	core: { ...rootMain.core, builder: 'webpack5' },
	staticDirs: ['../public'],
	stories: [
		...rootMain.stories,
		'../**/*.stories.mdx',
		'../**/*.stories.@(js|jsx|ts|tsx)',
		// Libs
		'../../../libs/**/*.stories.mdx',
		'../../../libs/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [...rootMain.addons, '@nrwl/react/plugins/storybook', 'storybook-dark-mode'],
	webpackFinal: async (config, { configType }) => {
		// apply any global webpack configs that might have been specified in .storybook/main.js
		if (rootMain.webpackFinal) {
			config = await rootMain.webpackFinal(config, { configType });
		}

		// add your own webpack tweaks if needed

		return config;
	},
};
