import { forwardRef, Ref, SelectHTMLAttributes } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { OmitStrict } from 'type-zoo';

import { Icon } from '../../../icon';
import { FieldError } from '../field-error/field-error';
import { FieldProps } from '../form/form';
import { Label, LabelProps } from '../label/label';

import styles from './select.module.scss';

export type SelectOption<T extends object = {}> = {
	value: string;
	label: string;
} & T;

export type SelectProps<TKey extends string, T extends object> = {
	fieldState?: ControllerFieldState;
	options: SelectOption<T>[];
} & LabelProps &
	OmitStrict<SelectHTMLAttributes<HTMLSelectElement>, 'form'> &
	FieldProps<TKey> &
	Partial<OmitStrict<ControllerRenderProps, 'ref'>>;

/**
 * Select component
 *
 * @version 1.0.0
 */
export const Select = forwardRef(
	<TKey extends string, T extends object>(
		{
			autoFocus,
			className,
			description,
			disabled,
			fieldState,
			id,
			label,
			labelPosition = 'over',
			name,
			onBlur,
			onChange,
			onClick,
			placeholder = 'Select an option',
			onFocus,
			required,
			value,
			options,
			...rest
		}: SelectProps<TKey, T>,
		ref: Ref<HTMLSelectElement>,
	) => {
		return (
			<Label
				label={label}
				id={id}
				required={required}
				labelPosition={labelPosition}
				description={description}
				className={className}
			>
				<div className={styles.selectWrapper}>
					<select
						className={styles.select}
						data-value={value}
						onBlur={onBlur}
						id={id}
						onClick={onClick}
						onFocus={onFocus}
						name={name}
						onChange={onChange}
						value={value}
						autoFocus={autoFocus}
						disabled={disabled}
						aria-required={required}
						ref={ref}
						data-select
						{...rest}
					>
						{placeholder && (
							<option value={''} disabled>
								{placeholder}
							</option>
						)}
						{options.map((option) => (
							<option key={option.value} {...option}>
								{option.label}
							</option>
						))}
					</select>
					<Icon icon="chevron-down" className={styles.chevronDown} />
				</div>
				<FieldError error={fieldState?.error} />
			</Label>
		);
	},
);
