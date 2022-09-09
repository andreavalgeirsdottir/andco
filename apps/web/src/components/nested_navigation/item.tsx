import { useRouter } from 'next/router';
import { OmitStrict } from 'type-zoo/types';

import { Button } from '@noa/ui';

import { UseNestedNavigationReturn } from '@apps/web/src/components/nested_navigation/nested_navigation';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import {
	type LevelGroup,
	type LinksOrLevelsGroup,
} from '@apps/web/src/services/sanity/queries/global_components';
import { type Link as SanityLink } from '@apps/web/src/services/sanity/queries/objects';

type LevelProps = Pick<NavigationItemProps, 'nestedNavigation' | '_level' | '_isOpen' | '_isHidden'> & {
	title: string;
	isExpandable: boolean;
	toggleOpen?: () => void;
};

export type NavigationItemProps = {
	items: LinksOrLevelsGroup[];
	nestedNavigation: UseNestedNavigationReturn['nestedNavigation'];
	onLinkClick?: (link?: SanityLink) => void;
	renderLevelAfter?: (nestedNavigation: LevelProps) => React.ReactNode;
	renderLevelBefore?: (nestedNavigation: LevelProps) => React.ReactNode;
	classNames?: Partial<Record<'ul' | 'li' | 'title' | 'button' | 'link', string>>;
	expandableLevel?: number;
	/** @internal */
	_isHidden?: boolean;
	/** @internal */
	_isOpen?: boolean;
	/** @internal */
	_level: number;
};

/**
 * The NavigationItem component is used to render a single level or item in the navigation.
 *
 * @recursive
 *
 * @see {@link LinksOrLevelsGroup}
 * @see {@link Level}
 * @see {@link Item}
 */
export const NavigationItem = ({
	items,
	nestedNavigation,
	classNames,
	expandableLevel,
	onLinkClick,
	renderLevelAfter,
	renderLevelBefore,
	_isOpen,
	_level,
	_isHidden = _level > expandableLevel && !_isOpen,
}: NavigationItemProps) => {
	const { asPath } = useRouter();
	const onlyLinks = items?.every((d) => d._type !== 'level');

	const getSelected = (item: LinksOrLevelsGroup): boolean => {
		if (item._type === 'level') {
			return item.items?.some(getSelected);
		}

		return hrefFromLink(item) === asPath;
	};

	if (!items) return null;

	return (
		<ul
			className={classNames?.ul}
			aria-level={_level}
			{...(_isHidden
				? {
						hidden: true,
						'aria-hidden': true,
				  }
				: {})}
			data-only-links={onlyLinks}
		>
			{items?.map((link) => {
				const isSelected = getSelected(link);

				if (link._type === 'level') {
					const isOpen = _isOpen || nestedNavigation.openItem === link._key;

					return (
						<Level
							_isHidden={_isHidden}
							_isOpen={isOpen}
							_level={_level}
							classNames={classNames}
							expandableLevel={expandableLevel}
							isSelected={isSelected}
							key={link._key}
							link={link}
							nestedNavigation={nestedNavigation}
							onLinkClick={onLinkClick}
							renderLevelAfter={renderLevelAfter}
							renderLevelBefore={renderLevelBefore}
						/>
					);
				}

				return (
					<Link
						_isHidden={_isHidden}
						_level={_level}
						classNames={classNames}
						isSelected={isSelected}
						key={link._key}
						link={link}
						nestedNavigation={nestedNavigation}
						onLinkClick={onLinkClick}
					/>
				);
			})}
		</ul>
	);
};

const Level = ({
	_isHidden,
	_isOpen,
	_level,
	classNames,
	expandableLevel,
	isSelected,
	link,
	nestedNavigation,
	onLinkClick,
	renderLevelAfter,
	renderLevelBefore,
}: {
	link: Sanity.Keyed<LevelGroup>;
	isSelected?: boolean;
} & OmitStrict<NavigationItemProps, 'items'>) => {
	const isExpandable = expandableLevel === _level;
	const toggleOpen = () => nestedNavigation.setToggle(link._key);

	return (
		<li
			className={classNames?.li}
			aria-expanded={isExpandable ? nestedNavigation.openItem === link._key : undefined}
		>
			{renderLevelBefore?.({
				nestedNavigation,
				toggleOpen,
				_level,
				isExpandable,
				_isOpen,
				_isHidden,
				title: link.title,
			})}

			{expandableLevel !== _level ? (
				<p className={classNames?.title}>{link.title}</p>
			) : (
				<Button
					className={classNames?.button}
					onClick={toggleOpen}
					tabIndex={_isHidden ? -1 : undefined}
					unstyled
					aria-current={isSelected ? 'page' : 'false'}
				>
					{link.title}
				</Button>
			)}

			<NavigationItem
				_isOpen={_isOpen}
				_level={_level + 1}
				items={link.items}
				nestedNavigation={nestedNavigation}
				renderLevelAfter={renderLevelAfter}
				renderLevelBefore={renderLevelBefore}
				expandableLevel={expandableLevel}
				onLinkClick={onLinkClick}
				classNames={classNames}
			/>

			{renderLevelAfter?.({
				nestedNavigation,
				toggleOpen,
				_level,
				isExpandable,
				_isOpen,
				_isHidden,
				title: link.title,
			})}
		</li>
	);
};

const Link = ({
	_isHidden,
	_level,
	classNames,
	isSelected,
	link,
	nestedNavigation,
	onLinkClick,
}: {
	link: Sanity.Keyed<SanityLink>;
	isSelected?: boolean;
} & Pick<
	NavigationItemProps,
	'nestedNavigation' | 'onLinkClick' | 'classNames' | '_level' | '_isHidden'
>) => {
	const url = hrefFromLink(link);

	return (
		<li className={classNames?.li}>
			<Button
				className={classNames?.link}
				href={url}
				onClick={() => {
					onLinkClick?.(link);
					nestedNavigation.setClose();
				}}
				tabIndex={_isHidden ? -1 : undefined}
				unstyled
				aria-current={isSelected ? 'page' : 'false'}
			>
				{link.title}
			</Button>
		</li>
	);
};
