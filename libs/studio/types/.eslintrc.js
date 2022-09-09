module.exports = {
	extends: ['../../../.eslintrc.json'],
	ignorePatterns: ['!**/*'],
	parserOptions: {
		project: require.resolve('./tsconfig.lib.json'),
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
			rules: {},
		},
		{
			files: ['*.ts', '*.tsx'],
			extends: ['@noaignite-dk/eslint-config/typescript'],
			rules: {
				'import/prefer-default-export': 'off',
				'@typescript-eslint/no-var-requires': ['off'],
			},
		},
		{
			files: ['*.d.ts'],
			rules: {
				'@typescript-eslint/naming-convention': ['off'],
			},
		},
		{
			files: ['*.js', '*.jsx'],
			rules: {},
		},
	],
};
