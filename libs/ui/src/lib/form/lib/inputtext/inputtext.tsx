import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes, Ref } from 'react';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { ExtractStrict, OmitStrict } from 'type-zoo';

import { getVariantsClassNames, Theme } from '@noa/theme';
import { MOTIONS, TRANSITION } from '@noa/utils-animations';

import { Icon, IconProps } from '../../../icon';
import { FieldError } from '../field-error/field-error';
import { FieldProps } from '../form/form';
import { Label, LabelProps } from '../label/label';

import styles from './inputtext.module.scss';

const getVariants = getVariantsClassNames(styles);

export type InputTextProps<TKey extends string> = {
	fieldState?: ControllerFieldState;
	type?: ExtractStrict<
		HTMLInputTypeAttribute,
		'email' | 'number' | 'password' | 'url' | 'text' | 'tel' | 'search'
	>;
	icon?: IconProps & { position?: Theme['position']['order'] };
	children?: React.ReactNode;
} & LabelProps &
	InputHTMLAttributes<HTMLInputElement> &
	FieldProps<TKey> &
	Partial<OmitStrict<ControllerRenderProps, 'ref'>>;

/**
 * Input component
 *
 * @version 1.0.0
 */
export const InputText = forwardRef(
	<TKey extends string>(
		{
			autoFocus,
			children,
			className,
			description,
			disabled,
			fieldState,
			icon,
			id,
			label,
			labelPosition = 'over',
			name,
			onBlur,
			onChange,
			onClick,
			onFocus,
			placeholder,
			required,
			type = 'text',
			value,
			...rest
		}: InputTextProps<TKey>,
		ref: Ref<HTMLInputElement>,
	) => {
		const iconPositionClassName = getVariants('iconPosition', icon?.position || 'after');

		return (
			<Label
				label={label}
				id={id}
				required={required}
				labelPosition={labelPosition}
				description={description}
				className={classNames(className, styles.label, iconPositionClassName, { [styles.hasIcon]: !!icon })}
			>
				<div className={styles.div}>
					<input
						aria-required={required}
						autoFocus={autoFocus}
						className={styles.input}
						data-input
						disabled={disabled}
						id={id}
						name={name}
						onBlur={onBlur}
						onChange={onChange}
						onClick={onClick}
						onFocus={onFocus}
						placeholder={placeholder}
						ref={ref}
						type={type}
						value={value}
						{...rest}
					/>
					<AnimatePresence>
						{icon?.icon && (
							<motion.div key="icon" {...MOTIONS.fade.fade} transition={TRANSITION.quick}>
								<Icon {...icon} className={classNames(styles.icon)} size={icon.size || 22} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<FieldError error={fieldState?.error} />
				{children}
			</Label>
		);
	},
);
