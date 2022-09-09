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

import { FieldError } from '../field-error/field-error';
import { FieldProps } from '../form/form';
import { DescriptionField, Label, LabelProps, LabelSpan, RequiredAstrix } from '../label/label';

import styles from './radio.module.scss';

export type RadioOption<Id extends string, T extends object | undefined = {}> = {
	value: Id;
	label: string;
} & Pick<LabelProps, 'description' | 'label'> &
	T;

export type RadioProps<TKey extends string, Id extends string, T extends object> = {
	fieldState?: ControllerFieldState;
	options: RadioOption<Id, T>[];
	checked?: RadioOption<Id, T>['value'];
	horizontal?: boolean;
} & Pick<LabelProps, 'description' | 'label'> &
	OmitStrict<InputHTMLAttributes<HTMLInputElement>, 'form' | 'value' | 'checked'> &
	FieldProps<TKey> &
	Partial<OmitStrict<ControllerRenderProps, 'ref' | 'value'>>;

/**
 * Radio component
 *
 * @version 1.0.0
 */
export const RadioGroup: ExtendableForwardRef<
	RadioProps<string, string, {}>,
	{ useRadio?: typeof useRadio }
> = forwardRef(
	<TKey extends string, Id extends string, T extends object>(
		{ className, horizontal, label, description, ...props }: RadioProps<TKey, Id, T>,
		ref: Ref<HTMLInputElement>,
	) => {
		return (
			<fieldset className={className}>
				{label && <Label className={styles.label} labelPosition="over" label={label} />}
				<div className={classNames(styles.group, { [styles.horizontal]: horizontal })}>
					{props?.options?.map((option) => (
						<RadioItem {...props} option={option} key={option.value} ref={ref} />
					))}
				</div>
				{description && <DescriptionField className={styles.description} description={description} />}
			</fieldset>
		);
	},
);

export const RadioItem = forwardRef(
	<T extends object, Id extends string>(
		{
			autoFocus,
			checked,
			disabled,
			fieldState,
			id,
			name,
			onBlur,
			onChange,
			onClick,
			onFocus,
			option,
			required,
			...rest
		}: { option: RadioOption<Id, T> } & OmitStrict<RadioProps<string, Id, T>, 'horizontal' | 'className'>,
		ref: Ref<HTMLInputElement>,
	) => {
		return (
			<label key={option.value} htmlFor={option.value} className={styles.label} aria-disabled={disabled}>
				<div className={styles.div}>
					<input
						autoFocus={autoFocus}
						checked={checked !== undefined ? checked === option?.value : undefined}
						className={styles.input}
						data-radio-input
						disabled={disabled}
						id={option.value}
						name={name || id}
						onBlur={onBlur}
						onChange={onChange}
						onClick={onClick}
						onFocus={onFocus}
						ref={ref}
						aria-required={required}
						type="radio"
						{...rest}
					/>

					<span data-radio className={styles.radio}>
						<span className={styles.icon} />
					</span>
					<LabelSpan label={option.label} />
					{required && <RequiredAstrix />}
				</div>
				<FieldError error={fieldState?.error} />
				<DescriptionField description={option.description} />
			</label>
		);
	},
);

const useRadio = <Id extends string>(config?: {
	initialChecked?: Id;
	onChecked?: () => void;
	onUnchecked?: () => void;
}) => {
	const [checked, setChecked] = useState<Id | null>(config?.initialChecked || null);

	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
		setChecked(e.target.id as Id);
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
		checked: checked as Id,
	};
};

RadioGroup.useRadio = useRadio;
