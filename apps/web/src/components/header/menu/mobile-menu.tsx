import { useDisclosure, UseDisclosureConfig } from '@noaignite-dk/utils-next';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useRef } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { Button, Icon, InputText } from '@noa/ui';
import { MOTIONS } from '@noa/utils-animations';
import { RecordRender } from '@noa/utils-next';

import { MobileSearch } from '@apps/web/src/components/header/search/mobile-search';
import { Logo } from '@apps/web/src/components/logo/logo';
import { NestedNavigation } from '@apps/web/src/components/nested_navigation/nested_navigation';
import { LinksOrLevelsGroup } from '@apps/web/src/services/sanity/queries/global_components';

import styles from './mobile-menu.module.scss';

export const MobileMenu = ({
	menu,
	mobileMenu,
}: {
	menu: LinksOrLevelsGroup[];
	mobileMenu: UseMenuReturn;
}) => {
	const mobileSearch = MobileSearch.useMobileSearch();
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!navRef.current) return;

		if (mobileMenu.isMenuOpen) {
			disableBodyScroll(navRef.current, { reserveScrollBarGap: true });
			return;
		}

		enableBodyScroll(navRef.current);
	}, [mobileMenu.isMenuOpen]);

	return (
		<>
			<div className={styles.mobileNav}>
				<Button
					aria-expanded={mobileMenu.isMenuOpen}
					aria-label="Open the menu"
					className={styles.menuButton}
					icon={{ icon: 'burgermenu', size: 20 }}
					onClick={mobileMenu.toggleMenu}
					size="small"
					variant="plain"
				/>
			</div>

			<div
				className={styles.overflow}
				aria-expanded={mobileMenu.isMenuOpen}
				ref={navRef}
				{...getTestAttr('mobile_menu')}
			>
				<section className={styles.section}>
					<RecordRender
						id={mobileSearch.isSearchOpen ? 'search' : 'menu'}
						render={{
							menu: (
								<Fragment key="menu">
									<motion.div className={styles.top} {...MOTIONS['in-down']['out-up']}>
										<Logo className={styles.logo} />
										<Button
											aria-expanded={mobileMenu.isMenuOpen}
											aria-label="Close the menu"
											className={styles.menuButton}
											icon={{ icon: 'close', scale: 1.3 }}
											onClick={mobileMenu.closeMenu}
											variant="plain"
										/>
									</motion.div>

									<motion.div className={styles.navigation} {...MOTIONS['in-down']['out-up']}>
										<NestedNavigation
											items={menu}
											className={styles.nav}
											expandableLevel={0}
											onLinkClick={mobileMenu.closeMenu}
											classNames={{
												button: styles.button,
												li: styles.li,
												link: styles.link,
												ul: styles.ul,
												title: styles.title,
											}}
											renderLevelAfter={(d) => {
												if (d._level === 0) {
													return (
														<header className={styles.header}>
															<Button
																aria-label="Go back"
																className={styles.back}
																icon={{ icon: 'arrow-short-left', scale: 1.5 }}
																onClick={d.nestedNavigation.setClose}
																tabIndex={!d._isOpen ? -1 : undefined}
																variant="plain"
															/>
															{d?.title && <h6 className={styles.headerTitle}> {d.title}</h6>}
															<Button
																aria-label="Close the menu"
																className={styles.close}
																icon={{ icon: 'close', scale: 1.3 }}
																onClick={mobileMenu.closeMenu}
																tabIndex={!d._isOpen ? -1 : undefined}
																variant="plain"
															/>
														</header>
													);
												}

												return null;
											}}
										/>
									</motion.div>
								</Fragment>
							),
							search: (
								<div className={styles.search} key="search">
									<motion.div className={styles.top} {...MOTIONS['in-up']['out-down']}>
										<Button
											aria-label="Cancel"
											className={styles.cancel}
											onClick={mobileSearch.closeSearch}
											tabIndex={!mobileSearch.isSearchOpen ? -1 : undefined}
											variant="plain"
											size="small"
										>
											Cancel
										</Button>
									</motion.div>
									<motion.div className={styles.content} {...MOTIONS['in-up']['out-down']}>
										<MobileSearch {...mobileSearch} closeMenu={mobileMenu.closeMenu} />
									</motion.div>
								</div>
							),
						}}
					/>

					<div className={styles.bottom}>
						<InputText
							placeholder="Search"
							className={styles.searchInput}
							onChange={mobileSearch.handleOnChange}
							icon={{ icon: 'search', position: 'before' }}
							onFocus={mobileSearch.openSearch}
						>
							<Icon
								icon="spinner"
								size={20}
								className={classNames(styles.spinner, {
									[styles.visible]: mobileSearch?.query?.isFetching,
								})}
							/>
						</InputText>
					</div>
				</section>
			</div>
		</>
	);
};

const useMenu = (config?: UseDisclosureConfig) => {
	const disclosure = useDisclosure({ initialOpen: false, ...config });

	return {
		closeMenu: disclosure.handleClose,
		isMenuOpen: disclosure.isOpen,
		openMenu: disclosure.handleOpen,
		toggleMenu: disclosure.handleToggle,
	};
};

export type UseMenuReturn = ReturnType<typeof useMenu>;

MobileMenu.useMenu = useMenu;

MobileMenu.menuId = 'mobile_menu_nav';
