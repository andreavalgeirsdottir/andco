/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React from 'react';

type Props = {
	className?: string;
	backgroundColor?: string;
};

export const BackgroundDecorator =
	({ backgroundColor = 'rgb(225 225 225)', className }: Props = {}) =>
		(Story: any) => {
			return (
				<div className={classNames(className)} style={{ backgroundColor }}>
					<Story />
				</div>
			);
		};
