import { useDisclosure, UseDisclosureConfig } from '@noaignite-dk/utils-next';
import { motion } from 'framer-motion';
import React from 'react';

import { MOTIONS } from '@noa/utils-animations';
import { RecordRender } from '@noa/utils-next';

import { UseMenuReturn } from '@apps/web/src/components/header/menu/mobile-menu';
import { useSearch } from '@apps/web/src/components/header/search/search-hook';
import { SearchItem } from '@apps/web/src/components/header/search/search-item';
import { Padding } from '@apps/web/src/components/utils/padding';
import { SanityIndex } from '@apps/web/src/services/meiliseach/indexes';

import styles from './mobile-search.module.scss';

type Props = {} & UseMobileSearchReturn & Pick<UseMenuReturn, 'closeMenu'>;

export const MobileSearch = ({
	query: { data },
	closeSearch,
	setInput,
	closeMenu,
	status,
	hasResult,
}: Props) => {
	const handleItemClick = () => {
		setInput('');
		closeSearch?.();
		closeMenu?.();
	};

	return (
		<RecordRender
			id={status}
			render={{
				result: hasResult && (
					<motion.div key="result" className={styles.result} {...MOTIONS.fade.fade}>
						<Padding vertical={false} className={styles.padding}>
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
						</Padding>
					</motion.div>
				),
				error: (
					<motion.h4 key="error" {...MOTIONS.fade.fade}>
						<Padding vertical={false} className={styles.padding}>
							Oops. But something went wrong. Please try again later.
						</Padding>
					</motion.h4>
				),
				'no-result': (
					<motion.h4 key="no-result" {...MOTIONS.fade.fade}>
						<Padding vertical={false} className={styles.padding}>
							Sorry. We can't find what you're searching for.
						</Padding>
					</motion.h4>
				),
				untouched: (
					<motion.h4 key="untouched" {...MOTIONS.fade.fade}>
						<Padding vertical={false} className={styles.padding}>
							What are you searching for?
						</Padding>
					</motion.h4>
				),
			}}
		/>
	);
};

const useMobileSearch = (config?: UseDisclosureConfig) => {
	const search = useSearch();
	const disclosure = useDisclosure(config);

	return {
		...search,
		closeSearch: disclosure.handleClose,
		isSearchOpen: disclosure.isOpen,
		openSearch: disclosure.handleOpen,
		toggleSearch: disclosure.handleToggle,
	};
};

export type UseMobileSearchReturn = ReturnType<typeof useMobileSearch>;

MobileSearch.useMobileSearch = useMobileSearch;
