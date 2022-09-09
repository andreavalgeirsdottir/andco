import { useKeyPressEffect } from '@noaignite-dk/utils-next';
import React, { useCallback, useState } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { useOnClickOutside } from '@noa/utils-next';

import { NavigationItem, NavigationItemProps } from '@apps/web/src/components/nested_navigation/item';

type Props = {
	className?: string;
} & Pick<
	NavigationItemProps,
	'items' | 'renderLevelAfter' | 'renderLevelBefore' | 'onLinkClick' | 'classNames' | 'expandableLevel'
>;

/**
 * #### NestedNavigation
 *
 * @util Includes logic and no styling
 *
 * @see {@link LinksOrLevelsGroup}
 * @see `NestedNavigation` Sanity Schema Util
 * https://github.com/NoA-Ignite-dk/nx-boilerplate/blob/feat/sanity/apps/studio/src/schemas/utils/nested_navigation.ts#L55
 *
 */
export const NestedNavigation = ({ className, ...rest }: Props) => {
	const { rootRef, nestedNavigation } = useNestedNavigation();

	return (
		<nav className={className} ref={rootRef} {...getTestAttr('nested_navigation')}>
			<NavigationItem _level={0} nestedNavigation={nestedNavigation} {...rest} />
		</nav>
	);
};

const useNestedNavigation = () => {
	const [openItem, setOpenItem] = useState<string>();

	const setOpen = (item: string) => {
		setOpenItem(item);
	};

	const setClose = useCallback(() => {
		if (!openItem) return;

		setOpenItem(undefined);
	}, [openItem]);

	const setToggle = (item: string) => {
		if (item === openItem) {
			setClose();
			return;
		}

		setOpen(item);
	};

	const rootRef = useOnClickOutside(setClose, !!openItem);
	useKeyPressEffect('Escape', setClose, { deps: [setClose] });

	return {
		rootRef,
		nestedNavigation: { openItem, setOpen, setClose, setToggle },
	};
};

export type UseNestedNavigationReturn = ReturnType<typeof useNestedNavigation>;

NestedNavigation.useNestedNavigation = useNestedNavigation;
