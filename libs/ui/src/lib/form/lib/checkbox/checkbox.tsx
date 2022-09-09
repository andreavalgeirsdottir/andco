import classNames from 'classnames';
import {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	Ref,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { OmitStrict } from 'type-zoo';

import { ExtendableForwardRef } from '@noa/utils-common';

import { Icon } from '../../../icon';
import { FieldError } from '../field-error/field-error';
import { FieldProps } from '../form/form';
import { DescriptionField, LabelProps, LabelSpan, RequiredAstrix } from '../label/label';

import styles from './checkbox.module.scss';

export type CheckboxProps<TKey extends string> = {
	fieldState?: ControllerFieldState;
} & Pick<LabelProps, 'description' | 'label'> &
	OmitStrict<InputHTMLAttributes<HTMLInputElement>, 'form' | 'value'> &
	FieldProps<TKey> &
	Partial<OmitStrict<ControllerRenderProps, 'ref' | 'value'>>;

/**
 * Checkbox component
 *
 * @version 1.0.0
 */
export const Checkbox: ExtendableForwardRef<
	CheckboxProps<string>,
	{ useCheckbox?: typeof useCheckbox }
> = forwardRef(
	<TKey extends string>(
		{
			autoFocus,
			className,
			description,
			disabled,
			fieldState,
			id,
			label,
			name,
			onBlur,
			onChange,
			onClick,
			onFocus,
			required,
			checked,
			...rest
		}: CheckboxProps<TKey>,
		ref: Ref<HTMLInputElement>,
	) => {
		return (
			<label htmlFor={id} className={classNames(styles.label, className)} aria-disabled={disabled}>
				<div className={styles.div}>
					<input
						autoFocus={autoFocus}
						checked={checked}
						className={styles.input}
						data-checkbox-input
						disabled={disabled}
						id={id}
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						onClick={onClick}
						onFocus={onFocus}
						ref={ref}
						aria-required={required}
						type="checkbox"
						{...rest}
					/>
					<span data-checkbox className={styles.checkbox}>
						<Icon icon="checkmark" className={styles.icon} size={12} />
					</span>
					<LabelSpan label={label} />
					{required && <RequiredAstrix />}
				</div>
				<FieldError error={fieldState?.error} />
				<DescriptionField description={description} />
			</label>
		);
	},
);

const useCheckbox = (config?: {
	initialChecked?: boolean;
	onChecked: () => void;
	onUnchecked: () => void;
}): Pick<CheckboxProps<string>, 'onChange' | 'checked'> => {
	const [checked, setChecked] = useState(config?.initialChecked ?? false);

	const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = useCallback(() => {
		setChecked((_checked) => !_checked);
	}, []);

	useEffect(() => {
		if (config?.onChecked && checked) {
			config.onChecked();
		}

		if (config?.onUnchecked && !checked) {
			config.onUnchecked();
		}
	}, [checked]);

	return {
		onChange: handleChange,
		checked,
	};
};

Checkbox.useCheckbox = useCheckbox;
