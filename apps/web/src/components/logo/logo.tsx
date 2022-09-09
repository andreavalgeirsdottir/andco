import classNames from 'classnames';

import { getTestAttr } from '@noa/service-testing';
import { useColorScheme } from '@noa/theme';

import { SanityImage } from '@apps/web/src/components/sanity-image/sanity-image';
import { useGlobalContext } from '@web/layouts/page/context';

import styles from './logo.module.scss';

export const Logo = ({ reversed, className }: { reversed?: boolean; className?: string }) => {
	const { globalSettings } = useGlobalContext();
	const colorScheme = useColorScheme();

	const logoAsset =
		globalSettings?.logo?.colorSchemeAssets[
			(reversed && (colorScheme === 'dark' ? 'light' : 'dark')) || colorScheme
		] || globalSettings?.logo?.logoAsset;

	if (!logoAsset) return null;

	return (
		<div className={classNames(styles.logo, className)} {...getTestAttr('logo')}>
			<SanityImage image={logoAsset} layout="responsive" />
		</div>
	);
};
