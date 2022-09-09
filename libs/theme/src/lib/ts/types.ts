import { Scheme } from '../../generated/schema';
import { Variables } from './variables';

type Status = 'success' | 'info' | 'warning' | 'error' | 'loading';

type Variant = 'fill' | 'stroke' | 'plain';

type Size = 'tiny' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'huge';

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
	variables: Variables;
};
