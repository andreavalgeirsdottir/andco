const addViewBox = require('./addViewBox');

module.exports = {
	plugins: [
		{
			name: 'convertColors',
			params: {
				currentColor: /black|white|#fff|#ffffff|#000|#000000/,
			},
		},
		{
			name: 'addViewBox',
			...addViewBox,
		},
	],
};
