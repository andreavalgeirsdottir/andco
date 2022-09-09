/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React from 'react';

import styles from './grid-decorator.module.scss';

export type GridStory = { count?: number; columns?: number };

type Props = Pick<GridStory, 'columns'> & {
	className?: string;
	withBorder?: boolean;
	size?: number;
};

export const GridDecorator =
	({ className, columns, withBorder = true, size = 120 }: Props = {}) =>
		(Story: any) => {
			return (
				<div
					className={classNames(styles.grid, className, {
						[styles.auto]: !columns,
						[styles.withBorder]: !!withBorder,
					})}
					style={{ '--columns': columns, '--size': `${size}px` } as React.CSSProperties}
				>
					<Story />
				</div>
			);
		};
