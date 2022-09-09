const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
	...nxPreset,
	moduleNameMapper: {
		'\\.svg': '<rootDir>/../../libs/service/testing/src/__mocks__/svgr.js',
	},
};
