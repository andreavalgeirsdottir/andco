import { variables } from '../../generated/variables.web';

type Status = 'success' | 'info' | 'warning' | 'error' | 'loading';

type Variant = 'fill' | 'stroke' | 'plain';

type Size = 'tiny' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge';

export const scheme = ['light', 'dark'] as const;

type Scheme = typeof scheme[number];

type Position = {
	horizontal: 'left' | 'right';
	vertical: 'top' | 'bottom';
	direction: 'horizontal' | 'vertical';
	order: 'before' | 'after';
	all: Position['horizontal'] | Position['vertical'];
};

/** Theme Typings for consistent */
export type Theme = {
	status: Status;
	variant: Variant;
	size: Size;
	scheme: Scheme;
	position: Position;
	variables: typeof variables;
};
