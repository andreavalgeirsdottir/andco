import { NextPage } from 'next';
import React from 'react';

import { Inner } from '@apps/web/src/components/utils/inner';
import TemplateLayout from '@apps/web/src/layouts/template/template';

type Props = {};

const Index: NextPage<Props> = () => {
	return (
		<TemplateLayout>
			<Inner>
				<h3>Index</h3>
			</Inner>
		</TemplateLayout>
	);
};

export default Index;
