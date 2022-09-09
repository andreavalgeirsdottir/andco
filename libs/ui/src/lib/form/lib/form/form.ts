import { useState } from 'react';
import * as Form from 'react-hook-form';

export { yupResolver } from '@hookform/resolvers/yup';
export * as Form from 'react-hook-form';
export * as yup from 'yup';

type UseFormParams<
	TFieldValues extends Form.FieldValues = Form.FieldValues,
	TContext extends object = object,
> = Form.UseFormProps<TFieldValues, TContext>;

/**
 * `useForm` hook which extends the `useForm` hook from `react-hook-form`.
 *
 * * Adding `asyncDefaultValues` which is a callback to await default values
 */
export const useForm = <
	TFieldValues extends Form.FieldValues = Form.FieldValues,
	TContext extends object = object,
>({
	asyncDefaultValues,
	asyncDefaultValuesOnce,
	...params
}: {
	asyncDefaultValues?: () => Promise<UseFormParams<TFieldValues, TContext>['defaultValues']>;
	asyncDefaultValuesOnce?: boolean;
} & UseFormParams<TFieldValues, TContext> = {}) => {
	const form = Form.useForm<TFieldValues, TContext>(params);
	const [defaultValuesSet, setDefaultValuesSet] = useState(false);

	const asyncGetDefaultValuesCallback = async () => {
		if (defaultValuesSet) return;

		const defaultValues = await asyncDefaultValues?.();
		form.reset(defaultValues);

		if (asyncDefaultValuesOnce) {
			setDefaultValuesSet(true);
		}
	};

	return { ...form, asyncGetDefaultValuesCallback };
};

export type FieldProps<TKey extends string> = {
	/**
	 * The ID of the field.
	 * This is used to identify the field in the form.
	 */
	id?: TKey;
	/**
	 * The placeholder of the field.
	 * This is used to describe an example of usage of field to the user before they've enter any input.
	 */
	placeholder?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	required?: boolean;
};
