/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import { SchemeDecorator } from '@noa/utils-storybook';
import { parameters as rootParameters } from '/.storybook/preview';

import '!style-loader!css-loader!sass-loader!./global.scss';

export const parameters = {
	...rootParameters,
};

export const decorators = [SchemeDecorator];
