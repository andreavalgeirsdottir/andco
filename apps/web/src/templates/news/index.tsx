import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import React from 'react';

import { MOTIONS } from '@noa/utils-animations';

import { ContentBlock, ContentBlockProps } from '@apps/web/src/blocks/content-block/content-block';
import { Inner } from '@apps/web/src/components/utils/inner';
import { ProjectedNews } from '@apps/web/src/templates/news/query';
import TemplateLayout from '@web/layouts/template/template';

import styles from './news.module.scss';

type Props = { pageData: ProjectedNews };

const NewsTemplate: NextPage<Props> = ({ pageData }) => {
	return (
		<TemplateLayout className={styles.container}>
			<AnimatePresence>
				{pageData?._type === 'news' && pageData?.content && (
					<motion.div key="article" {...MOTIONS['in-left']['out-left']}>
						<Article pageData={pageData as ProjectedNews} />
					</motion.div>
				)}
			</AnimatePresence>
		</TemplateLayout>
	);
};

export default NewsTemplate;

const Article = ({ pageData }: { pageData?: ProjectedNews }) => {
	return (
		<Inner size="small">
			{pageData.content && <ContentBlock blocks={pageData.content as ContentBlockProps['blocks']} />}
		</Inner>
	);
};
