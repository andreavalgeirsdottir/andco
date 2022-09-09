import { getTestAttr } from '@noa/service-testing';
import { asLevel } from '@noa/theme';
import { Button, Icon } from '@noa/ui';

import { CompanyInfo } from '@apps/web/src/components/footer/company-info';
import { Logo } from '@apps/web/src/components/logo/logo';
import { NestedNavigation } from '@apps/web/src/components/nested_navigation/nested_navigation';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';
import { Inner } from '@apps/web/src/components/utils/inner';
import { MediaQuery } from '@apps/web/src/components/utils/media_query';
import { useGlobalContext } from '@apps/web/src/layouts/page/context';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';

import styles from './footer.module.scss';

export function Footer() {
	const { globalComponents } = useGlobalContext();
	const { menu: footerMenu, bottom, useHeaderMenu } = globalComponents?.footer || {};
	const { menu: headerMenu } = globalComponents?.header || {};
	const isTabletOrLarger = MediaQuery.useMediaQuery({ minWidth: styles['bp-m'] });
	const menu = useHeaderMenu ? headerMenu : footerMenu;

	return (
		<footer className={styles.footer} {...getTestAttr('footer')} {...asLevel(2)}>
			<Inner>
				<section className={styles.top}>
					<MediaQuery minWidth={styles['bp-m']}>
						<Info />
					</MediaQuery>

					{menu && (
						<NestedNavigation
							items={menu}
							expandableLevel={isTabletOrLarger ? undefined : 0}
							className={styles.nav}
							classNames={{
								button: styles.button,
								title: styles.title,
								link: styles.link,
								li: styles.li,
								ul: styles.ul,
							}}
							renderLevelAfter={({ _level }) => {
								if (_level === 0 && !isTabletOrLarger) {
									return <Icon icon="chevron-right" className={styles.buttonIcon} />;
								}
							}}
						/>
					)}

					<MediaQuery maxWidth={styles['bp-m']}>
						<Inner.Padding horizontal={false}>
							<Info />
						</Inner.Padding>
					</MediaQuery>
				</section>
				{bottom && (
					<aside className={styles.bottom}>
						{bottom.menu && (
							<nav className={styles.menu}>
								<ul className={styles.ul}>
									{bottom.menu.map((link) => (
										<li key={link._key}>
											<Button size="xsmall" href={hrefFromLink(link)} unstyled>
												{link.title}
											</Button>
										</li>
									))}
								</ul>
							</nav>
						)}
						{bottom.copyright && (
							<div className={styles.copyright}>
								<SimpleText textBlocks={bottom.copyright} />
							</div>
						)}
					</aside>
				)}
			</Inner>
		</footer>
	);
}

const Info = () => (
	<div className={styles.info}>
		<Logo reversed />
		<CompanyInfo className={styles.companyInfo} />
	</div>
);
