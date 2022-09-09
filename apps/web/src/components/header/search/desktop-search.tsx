import { useEventListener } from '@noaignite-dk/utils-next';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import React from 'react';

import { getTestAttr } from '@noa/service-testing';
import { Button, Dialog, Icon, InputText } from '@noa/ui';
import { MOTIONS } from '@noa/utils-animations';
import { RecordRender } from '@noa/utils-next';

import { useSearch } from '@apps/web/src/components/header/search/search-hook';
import { SearchItem } from '@apps/web/src/components/header/search/search-item';
import { SanityIndex } from '@apps/web/src/services/meiliseach/indexes';

import styles from './desktop-search.module.scss';

type Props = {};

export const DesktopSearch = ({}: Props) => {
	const {
		search: {
			query: { data, isFetching },
			setInput,
			handleOnChange,
			hasResult,
			status,
		},
		dialog,
	} = DesktopSearch.useDesktopSearch();

	const handleItemClick = () => {
		setInput('');
		dialog.handleClose();
	};

	useEventListener(
		'scroll',
		() => {
			if (dialog.isOpen) {
				dialog.handleClose();
			}
		},
		{ deps: [dialog.isOpen] },
	);

	return (
		<>
			<Button
				icon={{ icon: 'search', scale: 1.2 }}
				variant="plain"
				aria-label={'Open search'}
				className={styles.desktopSearchButton}
				onClick={dialog.handleOpen}
			/>

			<Dialog {...dialog} className={styles.dialog} {...getTestAttr('search_dialog')}>
				<header className={styles.header}>
					<h5>Search</h5>
					<InputText
						placeholder="Search (⌘+K to open search)"
						className={styles.input}
						onChange={handleOnChange}
						icon={{ icon: 'search', position: 'before' }}
						autoFocus
					>
						<Icon
							icon="spinner"
							size={20}
							className={classNames(styles.spinner, {
								[styles.visible]: isFetching,
							})}
						/>
					</InputText>
				</header>
				<RecordRender
					id={status}
					render={{
						result: hasResult && (
							<motion.div key="result" className={styles.result} {...MOTIONS.fade.fade}>
								{data?.map(([key, index]) => {
									if (index?.estimatedTotalHits === 0) {
										return null;
									}

									return (
										<ul className={styles.ul} key={key}>
											<h6 className={styles.indexName}>{key}</h6>
											{index?.hits?.map((item: SanityIndex) => (
												<SearchItem key={(item as SanityIndex)?._id} onClick={handleItemClick} {...item} />
											))}
										</ul>
									);
								})}
							</motion.div>
						),
						'no-result': (
							<motion.h4 key="no-result" className={styles.noresult} {...MOTIONS.fade.fade}>
								Sorry. We can't find what you're searching for.
							</motion.h4>
						),
						error: (
							<motion.h4 key="error" className={styles.error} {...MOTIONS.fade.fade}>
								Oops. But something went wrong. Please try again later.
							</motion.h4>
						),
						untouched: (
							<motion.h4 key="untouched" className={styles.untouched} {...MOTIONS.fade.fade}>
								What are you searching for?
							</motion.h4>
						),
					}}
				/>
			</Dialog>
		</>
	);
};

const useDesktopSearch = () => {
	const search = useSearch();
	const dialog = Dialog.useDialog();

	useEventListener(
		'keydown',
		({ metaKey, code }) => {
			if (dialog.isOpen) return;

			if (code === 'KeyK' && metaKey) {
				dialog.handleOpen();
			}
		},
		{ deps: [dialog.isOpen] },
	);

	return { search, dialog };
};

export type UseDesktopSearchReturn = ReturnType<typeof useDesktopSearch>;

DesktopSearch.useDesktopSearch = useDesktopSearch;
