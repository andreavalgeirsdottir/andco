import { NextPage } from 'next';
import React from 'react';

import { Inner } from '@apps/web/src/components/utils/inner';
import TemplateLayout from '@apps/web/src/layouts/template/template';

type Props = {};

const Custom500: NextPage<Props> = () => {
	return (
		<TemplateLayout>
			<Inner>
				<h3>500 - Server-side error occurred</h3>
			</Inner>
		</TemplateLayout>
	);
};

export default Custom500;
