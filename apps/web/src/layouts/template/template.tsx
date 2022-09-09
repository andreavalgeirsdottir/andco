import { ReactNode } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { useHighlightAnchorEffect } from '@noa/ui';

import { Footer } from '@apps/web/src/components/footer/footer';
import { Header } from '@apps/web/src/components/header/header';

type Props = {
	children?: ReactNode;
};

const TemplateLayout = ({ children }: Props) => {
	useHighlightAnchorEffect();

	return (
		<>
			<Header />
			<div {...getTestAttr('template_layout')}>{children}</div>
			<Footer />
		</>
	);
};

export default TemplateLayout;
