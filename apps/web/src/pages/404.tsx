import { NextPage } from 'next';
import React from 'react';

import { BlockHeader } from '@apps/web/src/blocks/components/block-header';
import { Inner } from '@apps/web/src/components/utils/inner';
import TemplateLayout from '@apps/web/src/layouts/template/template';

type Props = {};

const Custom404: NextPage<Props> = () => {
	return (
		<TemplateLayout>
			<Inner>
				<BlockHeader title="404 - Page Not Found" />
			</Inner>
		</TemplateLayout>
	);
};

export default Custom404;
