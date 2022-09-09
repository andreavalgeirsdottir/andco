module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		'postcss-hexrgba',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		[
			'postcss-inline-svg',
			{
				paths: ['libs/ui/src/lib/icon/assets'],
			},
		],
	],
};
