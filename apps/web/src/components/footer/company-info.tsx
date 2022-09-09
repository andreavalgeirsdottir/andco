import classNames from 'classnames';
import React from 'react';

import countries from '@apps/web/src/constants/countries';
import { useGlobalContext } from '@apps/web/src/layouts/page/context';

import styles from './company-info.module.scss';

type Props = {
	showName?: boolean;
	showEmail?: boolean;
	showAddress?: boolean;
	className?: string;
};

export const CompanyInfo = ({ showEmail = true, showName = true, showAddress = true, className }: Props) => {
	const { globalSettings } = useGlobalContext();

	if (!globalSettings?.companyInformation?.address) return null;

	const { city, country, street, zipCode } = globalSettings.companyInformation.address;
	const countryTitle = countries?.find((d) => d.value === country)?.title || country;

	return (
		<section className={classNames(styles.section, className)}>
			{showName && globalSettings?.companyInformation?.name && (
				<p className={styles.companyName}>{globalSettings?.companyInformation?.name}</p>
			)}

			{showAddress && (
				<address className={styles.address}>
					{street && <p className={styles.street}>{street}</p>}
					{(zipCode || city) && (
						<p className={styles.zipCity}>
							{zipCode} {city}
						</p>
					)}
					{countryTitle && <p className={styles.country}>{countryTitle}</p>}
				</address>
			)}

			{showEmail && globalSettings?.companyInformation?.email && (
				<a className={styles.companyEmail} href={`mailto:${globalSettings.companyInformation.email}`}>
					{globalSettings.companyInformation.email}
				</a>
			)}
		</section>
	);
};
