import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { MailchimpSignupForm } from '@noa/service-mailchimp';
import { getTestAttr } from '@noa/service-testing';
import { Button, Fieldset, InputText } from '@noa/ui';

import { FORM_IDS, MAILCHIMP_TAGS } from '@apps/web/src/components/forms/constants';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';

import styles from './newsletter.module.scss';

export type NewsletterFormProps = {
	backgroundColor?: Sanity.Schema.FormsBlock['blockOptions']['backgroundColor'];
	description?: Sanity.Schema.SimpleText;
	disabled?: boolean;
	onSubmit?: (values: FormValues) => void;
	required?: boolean;
	submitText: string;
};

export type FormValues = {
	MERGE0?: string;
};

const schema = yup.object().shape({
	[FORM_IDS.email]: yup.string().email('Please enter a valid email').required('Please enter your email'),
});

export const NewsletterForm = ({
	disabled,
	description,
	submitText,
	backgroundColor,
}: NewsletterFormProps) => {
	const form = MailchimpSignupForm.useForm<FormValues>({
		defaultValues: {
			[FORM_IDS.email]: '',
		},
		resolver: yupResolver(schema),
	});

	return (
		<div className={styles.newsletterForm}>
			<MailchimpSignupForm
				form={form}
				mailchimp={{
					action: 'https://acarix.us13.list-manage.com/subscribe/post',
					u: '508f24fef3c58890422a61e8d',
					id: '7dbd62a771',
					// ht: 'd3925f1e82afe90a1165f4bcbbc7362347bf7ead:MTY1NjY3OTQ3OC42MjY3',
					tags: [MAILCHIMP_TAGS.newsletter],
				}}
				{...getTestAttr('form_newsletter')}
			>
				<Fieldset>
					<Controller
						name={FORM_IDS.email}
						control={form.control}
						render={({ field, fieldState }) => (
							<InputText
								disabled={disabled}
								fieldState={fieldState}
								placeholder="Enter your email"
								label="Email"
								required
								type="email"
								{...field}
							/>
						)}
					/>
				</Fieldset>
				<Fieldset.Center direction="column">
					<Button
						className={styles.submitButton}
						type="submit"
						variant={backgroundColor?.color === 'secondary' ? 'fill-secondary' : 'fill-primary'}
					>
						{submitText}
					</Button>
					{description && <SimpleText textBlocks={description} />}
				</Fieldset.Center>
			</MailchimpSignupForm>
		</div>
	);
};
