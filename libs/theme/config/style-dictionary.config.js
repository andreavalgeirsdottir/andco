const { groups } = require('./style-dictionary/transformers');

require('./style-dictionary');

const destination = './src/generated';

module.exports = {
	source: ['./**/*.tokens.json'],
	platforms: {
		scss: {
			transformGroup: 'css',
			transforms: [
				'attribute/cti',
				'content/icon',
				'name/cti/kebab',
				'size/px',
				'time/seconds',
				...groups['figma/web'],
			],
			files: [
				{
					destination: `${destination}/variables.scss`,
					format: 'css/variables',
					options: {
						outputReferences: true,
					},
				},
			],
		},
		web: {
			transformGroup: 'js',
			transforms: ['attribute/cti', 'name/cti/kebab', ...groups['figma/web']],
			files: [
				{
					format: 'javascript/css-variable-names',
					destination: `${destination}/variables.web.ts`,
					options: {
						variableName: 'variables',
					},
				},
			],
		},
		//
		// KEEP THE CODE FOR FUTURE REFERENCE.
		// React Native projects
		//
		// native: {
		// 	transformGroup: 'js',
		// 	transforms: [
		// 		'attribute/cti',
		// 		'name/cti/kebab',
		// 		'color/css',
		//    ...groups['figma/native'],
		// 	],
		// 	files: [
		// 		{
		// 			format: 'javascript/react-native',
		// 			destination: `${destination}/variables.native.ts`,
		// 			options: {
		// 				variableName: 'variables',
		// 			},
		// 		},
		// 	],
		// },
	},
};
