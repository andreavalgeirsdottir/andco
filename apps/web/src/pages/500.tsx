import { NextPage } from 'next';
import React from 'react';

import { BlockHeader } from '@apps/web/src/blocks/components/block-header';
import { Inner } from '@apps/web/src/components/utils/inner';
import TemplateLayout from '@apps/web/src/layouts/template/template';

type Props = {};

const Custom500: NextPage<Props> = () => {
	return (
		<TemplateLayout>
			<Inner>
				<BlockHeader title="500 - Server-side error occurred" />
			</Inner>
		</TemplateLayout>
	);
};

export default Custom500;
