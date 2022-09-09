import classNames from 'classnames';
import React from 'react';

import { getVariantsClassNames } from '@noa/theme';

import { Card, CardProps } from '../card';

import styles from './card-list.module.scss';

const getVariants = getVariantsClassNames(styles);

export type CardListProps = {
	className?: string;
	list: undefined | (CardProps & { id: string })[];
	size?: 'small' | 'medium';
};

export const CardList = ({ list, className, size = 'medium' }: CardListProps) => {
	const sizeClassNames = getVariants('size', size);

	if (!list) return null;

	return (
		<div className={classNames(styles.div, sizeClassNames, className)}>
			{list.map((item) => (
				<Card key={item.id} {...item} />
			))}
		</div>
	);
};
