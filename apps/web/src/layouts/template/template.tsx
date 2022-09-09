import { ReactNode } from 'react';

import { getTestAttr } from '@noa/service-testing';
import { useHighlightAnchorEffect } from '@noa/ui';

type Props = {
	children?: ReactNode;
	className?: string;
};

const TemplateLayout = ({ children, className }: Props) => {
	useHighlightAnchorEffect();

	return (
		<div className={className} {...getTestAttr('template_layout')}>
			{children}
		</div>
	);
};

export default TemplateLayout;
