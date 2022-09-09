import { useMemoKey } from '@noaignite-dk/utils-next';
import { groq } from 'next-sanity';
import React, { useMemo } from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { BlockTitle } from '@apps/web/src/blocks/components/block-title';
import { InnerSplit } from '@apps/web/src/blocks/components/inner-split';
import { MediaQuery } from '@apps/web/src/components/utils/media_query';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { SanityTable } from '@apps/web/src/services/sanity/queries/types';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './table_block.module.scss';

export type TableBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.TableBlock,
			{
				table?: SanityTable;
			}
		>
	>;
};

export const TableBlock = ({ block }: TableBlockProps) => {
	return (
		<BackgroundColor
			className={styles.tableBlock}
			backgroundColor={block.blockOptions?.backgroundColor}
			id={getBlockId(block)}
			{...getTestAttr('block_tableBlock')}
		>
			<InnerSplit
				left={<BlockTitle title={block.title} subtitle={block.subtitle} />}
				right={<Table table={block.table} firstRowAsHeader={block?.blockOptions?.firstRowAsHeader} />}
			/>
		</BackgroundColor>
	);
};

const Table = ({
	table,
	firstRowAsHeader,
}: { table: SanityTable } & Sanity.Schema.TableBlock['blockOptions']) => {
	const memoKey = useMemoKey(table.rows);
	const isBpLOrSmaller = MediaQuery.useMediaQuery({ maxWidth: styles['bp-l'] });
	const cellLength = table?.rows[0]?.cells?.length;

	const tableData = useMemo(
		() =>
			table.rows.reduce((acc, row, index) => {
				if (firstRowAsHeader && index === 0) {
					return {
						...acc,
						thead: { rows: [row] },
					};
				}

				const { tbody } = acc;

				if (tbody?.rows?.length === 0) {
					return {
						...acc,
						tbody: {
							rows: [row],
						},
					};
				}

				return {
					...acc,
					tbody: {
						...tbody,
						rows: [...(tbody?.rows || []), row],
					},
				};
			}, {} as Record<'thead' | 'tbody', { rows: SanityTable['rows'] }>),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[memoKey, firstRowAsHeader],
	);

	if (!table) return null;

	return (
		<table
			className={styles.table}
			style={{ '--cell-length': cellLength > 4 ? 4 : cellLength } as React.CSSProperties}
		>
			{firstRowAsHeader && !isBpLOrSmaller && tableData.thead && (
				<thead className={styles.thead}>
					{tableData.thead.rows.map((row) => (
						<tr className={styles.tr} key={row._key}>
							{row.cells.map((cell, index) => (
								<th className={styles.th} key={`${index}_${cell}`}>
									{cell}
								</th>
							))}
						</tr>
					))}
				</thead>
			)}

			{tableData.tbody && (
				<tbody className={styles.tbody}>
					{tableData.tbody.rows.map((row) => (
						<tr className={styles.tr} key={row._key}>
							{row.cells.map((cell, index) => (
								<td className={styles.td} key={`${index}_${cell}`}>
									{firstRowAsHeader && isBpLOrSmaller && (
										<span className={styles.inlineTh}>{tableData.thead.rows[0]?.cells[index]}</span>
									)}
									<span className={styles.content}>{cell}</span>
								</td>
							))}
						</tr>
					))}
				</tbody>
			)}
		</table>
	);
};

TableBlock.groq = blockGroq({
	query: groq`{
		...,
		subtitle[] ${simpleText},
}`,
});
