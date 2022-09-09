import React from 'react';
import {
	FieldValues,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
	UseFormProps,
	UseFormReturn,
} from 'react-hook-form';

export type MailchimpSignupFormProps<Values extends FieldValues = FieldValues> = {
	mailchimp: {
		action: string;
		u: string;
		id: string;
		ht?: string;
		tags?: string[];
	};
	children: React.ReactNode;
	/**
	 * If you want to client side validate your form using `yup` and `react-hook-form`,
	 * then pass the form object to this prop.
	 */
	form?: UseFormReturn<Values>;
	/**
	 * Callback when successfully submitting the form, if you're using `react-hook-form`.
	 * @see MailchimpSignupFormProps['form']
	 */
	onError?: SubmitErrorHandler<Values>;
	/**
	 * Callback when error on submitting the form, if you're using `react-hook-form`.
	 * @see MailchimpSignupFormProps['form']
	 */
	onSubmit?: SubmitHandler<Values>;
};

/**
 * @see https://us13.admin.mailchimp.com/lists/dashboard/signup-forms/
 */
export const MailchimpSignupForm = <Values extends FieldValues = FieldValues>({
	form,
	children,
	onSubmit = () => {},
	onError,
	mailchimp,
	...rest
}: MailchimpSignupFormProps<Values>) => {
	return (
		<form
			{...(form === undefined || form?.formState.isValid
				? {
						action: mailchimp.action,
						method: 'POST',
				  }
				: {
						onSubmit: form?.handleSubmit(onSubmit, onError),
				  })}
			{...rest}
		>
			<input type="hidden" name="u" value={mailchimp.u} />
			<input type="hidden" name="id" value={mailchimp.id} />
			{children}
			{mailchimp.tags?.map((tag) => (
				<div hidden key={tag}>
					<input type="hidden" name="tags" value={tag} />
				</div>
			))}
			{mailchimp?.ht && <input type="hidden" name="ht" value={mailchimp.ht} />}
			<input type="hidden" name="mc_signupsource" value="hosted" />
		</form>
	);
};

const useMailchimpForm = <TFieldValues extends FieldValues = FieldValues, TContext extends object = object>(
	props?: UseFormProps<TFieldValues, TContext>,
) => {
	return useForm<TFieldValues, TContext>({
		mode: 'onChange',
		...props,
	});
};

MailchimpSignupForm.useForm = useMailchimpForm;
