import classnames from 'classnames';
import { ExtractStrict, OmitStrict } from 'type-zoo';

import { getVariantsClassNames } from '@noa/theme';

import { Button, ButtonProps } from '../../button';

import styles from './card.module.scss';

const getVariants = getVariantsClassNames(styles);

/* eslint-disable-next-line */
type CardBaseProps = {
	title?: string;
	content?: React.ReactNode;
	renderBefore?: React.ReactNode;
	renderAfter?: React.ReactNode;
};

const CardBase = ({ title, content, renderBefore, renderAfter }: CardBaseProps) => {
	return (
		<>
			{renderBefore}
			<div className={styles.info}>
				{title && <h5 className={styles.title}>{title}</h5>}
				{content && <div className={styles.content}>{content}</div>}
			</div>
			{renderAfter}
		</>
	);
};

export type CardProps = {
	variant?: ExtractStrict<ButtonProps['variant'], 'stroke-primary'>;
} & CardBaseProps &
	OmitStrict<ButtonProps, 'children' | 'variant'>;

export const Card = ({ renderAfter, renderBefore, title, content, ...props }: CardProps) => {
	const variantClassName = getVariants('variant', props.variant || 'stroke-primary');

	if (props.href || props.onClick) {
		return (
			<Button unstyled className={classnames(styles.card, styles.asButton, variantClassName)} {...props}>
				<CardBase content={content} title={title} renderAfter={renderAfter} renderBefore={renderBefore} />
			</Button>
		);
	}

	return (
		<div className={classnames(styles.card, variantClassName)}>
			<CardBase content={content} title={title} renderAfter={renderAfter} renderBefore={renderBefore} />
		</div>
	);
};
