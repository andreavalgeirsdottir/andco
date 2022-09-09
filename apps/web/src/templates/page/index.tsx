import type { NextPage } from 'next';

import { ContentBlock } from '@apps/web/src/blocks/content-block/content-block';
import TemplateLayout from '@web/layouts/template/template';

import { ProjectedPage } from './query';

import styles from './page.module.scss';

const PageTemplate: NextPage<{ pageData: ProjectedPage }> = ({ pageData }) => {
	return (
		<TemplateLayout className={styles.container}>
			{pageData?.content && <ContentBlock className={styles.contentBlock} blocks={pageData?.content} />}
		</TemplateLayout>
	);
};

export default PageTemplate;
