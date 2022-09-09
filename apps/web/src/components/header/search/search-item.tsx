import React from 'react';

import { Button, ButtonProps } from '@noa/ui';
import { isType, OneOf } from '@noa/utils-common';

import { SearchResponse } from '@apps/web/src/pages/api/v1/search';
import { SanityIndex } from '@apps/web/src/services/meiliseach/indexes';
import { buildRelativeLink } from '@apps/web/src/services/sanity/mappings';

import styles from './search-item.module.scss';

type Props = Pick<ButtonProps, 'onClick'> & OneOf<SearchResponse>['hits'][number];

export const SearchItem = (item: Props) => {
	if (!item?.seo?.metaTitle && !item?.slug?.current) {
		return null;
	}

	const buttonProps: ButtonProps = {
		variant: 'plain',
		className: styles.searchItem,
		icon: Button.icons['arrow-right'],
	};

	if (
		isType<SanityIndex>(item, (i) =>
			(['events', 'news', 'page'] as SanityIndex['_index'][])?.includes(i._index),
		)
	) {
		return (
			<li>
				<Button
					{...buttonProps}
					href={buildRelativeLink(item._type, item.slug.current)}
					onClick={item.onClick}
				>
					{item?.seo?.metaTitle || item?.slug?.current}
				</Button>
			</li>
		);
	}

	return null;
};
