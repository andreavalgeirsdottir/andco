import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactNode } from 'react';

import { Button, ButtonProps } from '@noa/ui';
import { MOTIONS, TRANSITION } from '@noa/utils-animations';

import { AspectRatio } from '@apps/web/src/components/media/aspectRatios';
import { Media, MediaProps } from '@apps/web/src/components/media/media';
import { SimpleText, SimpleTextProps } from '@apps/web/src/components/simpletext/simpletext';

import styles from './block-header.module.scss';

export type BlockHeaderProps = {
	title?: ReactNode;
	preTitle?: string;
	media?: MediaProps['media'];
	cta?: ButtonProps;
	subtitle?: SimpleTextProps['textBlocks'];
	insideInner?: boolean;
	className?: string;
	isFetching?: boolean;
};

export const BlockHeader = ({
	title,
	cta,
	className,
	media,
	preTitle,
	subtitle,
	isFetching,
	insideInner,
}: BlockHeaderProps) => {
	return (
		<header className={classNames(styles.header, className, { [styles.insideInner]: insideInner })}>
			{media && (
				<Media
					media={media}
					className={styles.media}
					aspectRatio={AspectRatio['1:1']}
					imageProps={{ width: 250, layout: 'fixed' }}
				/>
			)}
			<div className={styles.info}>
				<AnimatePresence>
					{isFetching ? (
						<motion.span {...MOTIONS.fade.fade} transition={TRANSITION.base} className={styles.preTitle}>
							Fetching...
						</motion.span>
					) : (
						preTitle && (
							<motion.p {...MOTIONS.fade.fade} transition={TRANSITION.base} className={styles.preTitle}>
								{preTitle}
							</motion.p>
						)
					)}
				</AnimatePresence>
				{title && <h2 className={styles.headerTitle}>{title}</h2>}
				{subtitle && <SimpleText textBlocks={subtitle} className={styles.subtitle} />}
				{cta?.children && cta?.href && (
					<Button className={styles.cta} variant="stroke-primary" size="small" {...cta} />
				)}
			</div>
		</header>
	);
};
