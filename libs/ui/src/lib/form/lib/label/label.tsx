import { Fac, FacType } from '@noaignite-dk/utils-next';
import classNames from 'classnames';
import React from 'react';

import styles from './label.module.scss';

export type LabelProps = {
	labelPosition?: 'before' | 'after' | 'over' | 'under';
	label?: React.ReactNode;
	/**
	 * The children can either be ReactNode or a function that has the label as a prop and returns a ReactNode
	 * This is useful if you need a special place to render the label
	 */
	children?: FacType<{ label: React.ReactNode; description: React.ReactNode }>;
	/**
	 * If the Label should have a `for` attribute.
	 */
	id?: string;
	className?: string;
	required?: boolean;
	/**
	 * An additional description of the field.
	 */
	description?: React.ReactNode;
	refs?: React.Ref<HTMLLabelElement>;
};

/**
 * Label component
 *
 * @version 1.0.0
 */
export const Label = ({
	labelPosition = 'over',
	label,
	children,
	className,
	description,
	required,
	id,
	refs,
	...rest
}: LabelProps & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) => {
	const isChildrenFunction = Fac.isFac(children);

	return (
		<label
			className={classNames(styles.label, className)}
			htmlFor={id}
			data-label-position={labelPosition}
			data-label
			ref={refs}
			{...rest}
		>
			{label && !isChildrenFunction && (labelPosition === 'before' || labelPosition === 'over') && (
				<LabelSpan label={label} required={required} />
			)}

			<Fac
				render={children}
				props={{
					label: <LabelSpan label={label} required={required} />,
					description: <DescriptionField description={description} />,
				}}
			/>

			{label && !isChildrenFunction && (labelPosition === 'after' || labelPosition === 'under') && (
				<LabelSpan label={label} required={required} />
			)}

			{description && !isChildrenFunction && <DescriptionField description={description} />}
		</label>
	);
};

export const RequiredAstrix = () => <span className={styles.requiredAstrix}>*</span>;

export const LabelSpan = ({
	label,
	required,
	className,
}: Pick<LabelProps, 'label' | 'required' | 'className'>) => (
	<span data-label-span className={className}>
		{label}
		{required && <RequiredAstrix />}
	</span>
);

export const DescriptionField = ({
	description,
	className,
}: Pick<LabelProps, 'description' | 'className'>) => (
	<p data-description className={classNames(styles.description, className)}>
		{description}
	</p>
);
