import { useRef } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { Button } from '@noa/ui';

import { NestedNavigation } from '@apps/web/src/components/nested_navigation/nested_navigation';
import { LinksOrLevelsGroup } from '@apps/web/src/services/sanity/queries/global_components';

import styles from './desktop-menu.module.scss';

export function DesktopMenu({ menu }: { menu: LinksOrLevelsGroup[] }) {
	const divRef = useRef<HTMLDivElement>(null);

	if (!menu) return null;

	return (
		<section className={styles.desktopMenu} ref={divRef} {...getTestAttr('desktop_menu')}>
			<NestedNavigation
				items={menu}
				expandableLevel={0}
				className={styles.nav}
				classNames={{
					button: styles.button,
					li: styles.li,
					link: styles.link,
					ul: styles.ul,
					title: styles.title,
				}}
				renderLevelAfter={({ _isOpen, toggleOpen }) => {
					return (
						<Button
							icon={{ icon: 'chevron-up', size: 12, rotate: _isOpen ? 180 : 0, className: styles.chevron }}
							onClick={toggleOpen}
							unstyled
						/>
					);
				}}
			/>
		</section>
	);
}
