/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import styles from './table.module.scss';

type Props = {
	thead: React.ReactNode[];
	tbody: React.ReactNode[][];
};

export const Table = ({ thead, tbody }: Props) => {
	return (
		<div className={styles.table}>
			<table>
				<thead>
					<tr>
						{thead.map((th, thi) => (
							<th key={thi}>{th}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tbody.map((tr, tri) => (
						<tr key={tri}>
							{tr.map((td, tdi) => (
								<td key={tdi}>{td}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
