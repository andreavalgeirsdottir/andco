module.exports = {
	extends: ['../../.eslintrc.json'],
	ignorePatterns: ['!**/*'],
	parserOptions: {
		project: require.resolve('./tsconfig.json'),
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {
				'@nrwl/nx/enforce-module-boundaries': 'off',
				'import/no-relative-packages': 'off',
				'no-nested-ternary': 'off',
			},
		},
		{
			files: ['*.ts', '*.tsx'],
			rules: {},
		},
		{
			files: ['*.js', '*.jsx'],
			rules: {},
		},
	],
};
