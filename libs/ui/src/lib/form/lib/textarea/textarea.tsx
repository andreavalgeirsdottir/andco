import classnames from 'classnames';
import { forwardRef, Ref, TextareaHTMLAttributes } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { OmitStrict } from 'type-zoo';

import { FieldError } from '../field-error/field-error';
import { FieldProps } from '../form/form';
import { Label, LabelProps } from '../label/label';

import styles from './textarea.module.scss';

export type TextAreaProps<TKey extends string> = {
	fieldState?: ControllerFieldState;
	forceWidth?: boolean;
} & LabelProps &
	FieldProps<TKey> &
	Partial<OmitStrict<ControllerRenderProps, 'ref'>> &
	TextareaHTMLAttributes<HTMLTextAreaElement>;

/**
 * Input component
 *
 * @version 1.0.0
 */
export const TextArea = forwardRef(
	<TKey extends string>(
		{
			autoFocus,
			disabled,
			fieldState,
			id,
			label,
			labelPosition = 'over',
			name,
			onBlur,
			onChange,
			placeholder,
			required,
			description,
			value,
			rows = 3,
			cols,
			className,
			forceWidth,
			...rest
		}: TextAreaProps<TKey>,
		ref: Ref<HTMLTextAreaElement>,
	) => {
		return (
			<Label
				label={label}
				id={id}
				required={required}
				labelPosition={labelPosition}
				description={description}
				className={classnames(className, styles.label, { [styles.forceWidth]: forceWidth })}
			>
				<textarea
					className={styles.textarea}
					onBlur={onBlur}
					id={id}
					name={name}
					onChange={onChange}
					ref={ref}
					value={value}
					autoFocus={autoFocus}
					disabled={disabled}
					aria-required={required}
					placeholder={placeholder}
					rows={rows}
					cols={cols}
					data-input
					{...rest}
				/>
				<FieldError error={fieldState?.error} />
			</Label>
		);
	},
);
