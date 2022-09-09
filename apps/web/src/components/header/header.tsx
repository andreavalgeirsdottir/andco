import { useEventListener } from '@noaignite-dk/utils-next';
import NextLink from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { Button } from '@noa/ui';

import { DesktopSearch } from '@apps/web/src/components/header/search/desktop-search';
import { Inner } from '@apps/web/src/components/utils/inner';
import { MediaQuery } from '@apps/web/src/components/utils/media_query';
import { useGlobalContext } from '@apps/web/src/layouts/page/context';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { ProjectedGlobalComponents } from '@apps/web/src/services/sanity/queries/global_components';

import { Logo } from '../logo/logo';
import { DesktopMenu } from './menu/desktop-menu';
import { MobileMenu, UseMenuReturn } from './menu/mobile-menu';

import styles from './header.module.scss';

export const Header = () => {
	const mobileMenu = MobileMenu.useMenu();
	const isDesktop = MediaQuery.useMediaQuery({ minWidth: styles['bp-m'] });
	const { globalComponents } = useGlobalContext();
	const { expanded } = useHideHeader({ disableTrigger: isDesktop || mobileMenu.isMenuOpen });

	return (
		<header className={styles.header} aria-expanded={expanded} {...getTestAttr('header')}>
			<div className={styles.content}>
				<span className={styles.backdrop} />
				{globalComponents.header && (
					<Inner className={styles.inner} noVerticalPadding>
						<MediaQuery minWidth={styles['bp-m']}>
							<Desktop header={globalComponents.header} />
						</MediaQuery>

						<MediaQuery maxWidth={styles['bp-m']}>
							<Mobile header={globalComponents.header} mobileMenu={mobileMenu} />
						</MediaQuery>
					</Inner>
				)}
			</div>
		</header>
	);
};

const Desktop = ({ header: { menu, cta } }: Pick<ProjectedGlobalComponents, 'header'>) => (
	<>
		<NextLink href={'/'}>
			<a className={styles.logoContainer}>
				<Logo className={styles.logo} />
			</a>
		</NextLink>

		{menu && <DesktopMenu menu={menu} />}

		<div className={styles.actions} {...getTestAttr('header_search')}>
			<DesktopSearch />

			{cta?.url && (
				<Button href={hrefFromLink(cta)} className={styles.cta} size="small">
					{cta.title}
				</Button>
			)}
		</div>
	</>
);

const Mobile = ({
	header: { menu, cta },
	mobileMenu,
}: Pick<ProjectedGlobalComponents, 'header'> & { mobileMenu: UseMenuReturn }) => (
	<>
		<NextLink href={'/'}>
			<a className={styles.logoContainer}>
				<Logo />
			</a>
		</NextLink>

		<div className={styles.actions} {...getTestAttr('header_search')}>
			{cta?.url && (
				<Button href={hrefFromLink(cta)} className={styles.cta} size="xsmall">
					{cta.title}
				</Button>
			)}
		</div>
		{menu && <MobileMenu menu={menu} mobileMenu={mobileMenu} />}
	</>
);

const useHideHeader = ({ disableTrigger }: { disableTrigger?: boolean }) => {
	const [expanded, setExpanded] = useState(true);
	const [animating, setAnimating] = useState(false);
	const lastScrollPosition = useRef(0);
	const timeout = useRef<number>(0);

	useEffect(() => {
		setAnimating(true);

		timeout.current = window.setTimeout(() => {
			setAnimating(false);
		}, 300);

		return () => window.clearTimeout(timeout.current);
	}, [expanded]);

	useEventListener(
		'scroll',
		() => {
			if (disableTrigger) {
				if (!expanded) {
					setExpanded(true);
				}

				return;
			}

			const st = window.pageYOffset || document.documentElement.scrollTop;

			if (st === 0) {
				setExpanded(true);
				return;
			}

			if (animating) return;

			// Going down
			if (st > lastScrollPosition.current + 5) {
				setExpanded(false);
			}

			// Going up
			if (st < lastScrollPosition.current - 15) {
				setExpanded(true);
			}

			lastScrollPosition.current = st <= 0 ? 0 : st;
		},
		{ deps: [expanded, animating, disableTrigger] },
	);

	return {
		expanded,
		setExpanded,
	};
};
