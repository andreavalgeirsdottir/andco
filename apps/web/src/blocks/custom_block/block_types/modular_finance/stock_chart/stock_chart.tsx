import React from 'react';

import { Inner } from '@apps/web/src/components/utils/inner';

import styles from './stock_chart.module.scss';

type Props = {};

/**
 * @see https://widget.datablocks.se/api/rose/widgets/stock-chart?token=${process.env.NEXT_PUBLIC_MODULAR_FINANCE_TOKEN}&load-highcharts=true
 */
export const StockChart = ({}: Props) => {
	return (
		<Inner className={styles.inner} size="medium">
			<iframe
				id={process.env.NEXT_PUBLIC_MODULAR_FINANCE_TOKEN}
				title="Stock Chart"
				className={styles.iframe}
				src={`https://widget.datablocks.se/api/rose/widgets/stock-chart?token=${process.env.NEXT_PUBLIC_MODULAR_FINANCE_TOKEN}&load-highcharts=true`}
			/>
		</Inner>
	);
};
