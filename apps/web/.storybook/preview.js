/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import { parameters as rootParameters } from '/.storybook/preview';
import { themes } from '@storybook/theming';

import '!style-loader!css-loader!sass-loader!./global.scss';
import { variables } from '@noa/theme';
import { SchemeDecorator } from '@noa/utils-storybook';

export const parameters = {
	...rootParameters,
};

export const decorators = [SchemeDecorator];
