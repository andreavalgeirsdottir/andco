module.exports = {
	stories: [],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'@storybook/addon-storysource',
		'storybook-addon-designs',
		'storybook-addon-next-router',
		{
			name: '@storybook/addon-postcss',
			options: {
				postcssLoaderOptions: {
					implementation: require('postcss'),
				},
			},
		},
	],
	// uncomment the property below if you want to apply some webpack config globally
	// webpackFinal: async (config, { configType }) => {
	// 	// Make whatever fine-grained changes you need that should apply to all storybook configs

	// 	// Return the altered config
	// 	return config;
	// },
};
