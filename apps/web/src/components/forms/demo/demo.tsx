import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';

import { MailchimpSignupForm } from '@noa/service-mailchimp';
import { getTestAttr } from '@noa/service-testing';
import { Button, Fieldset, InputText, Select, SelectOption, TextArea } from '@noa/ui';
import { OneOf } from '@noa/utils-common';

import { COUNTRIES, FORM_IDS, MAILCHIMP_TAGS } from '@apps/web/src/components/forms/constants';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';

import styles from './demo.module.scss';

export type DemoFormProps = {
	backgroundColor?: Sanity.Schema.FormsBlock['blockOptions']['backgroundColor'];
	description?: Sanity.Schema.SimpleText;
	disabled?: boolean;
	onSubmit?: (values: FormValues) => void;
	required?: boolean;
	submitText: string;
};

export type FormValues = {
	MERGE1?: string;
	MERGE0?: string;
	MERGE4?: string;
	MERGE5?: string;
	MERGE3?: OneOf<SelectOption[]>['value'];
	MERGE6?: OneOf<SelectOption[]>['value'];
};

const schema = yup.object().shape({
	[FORM_IDS.name]: yup.string().required('Please enter your full name'),
	[FORM_IDS.phone]: yup
		.string()
		.matches(/^[+]?[0-9]*$/, 'Please enter a valid phone number')
		.min(8, 'Please enter a valid phone number')
		.required('Please enter your phone number'),
	[FORM_IDS.email]: yup.string().email('Please enter a valid email').required('Please enter your email'),
	[FORM_IDS.companyName]: yup.string().required('Please enter your clinic name'),
	[FORM_IDS.country]: yup.string().required('Please select your country'),
	[FORM_IDS.hearAbout]: yup.string().required('Please explain how you heard about us'),
});

export const DemoForm = ({ disabled, description, submitText, backgroundColor }: DemoFormProps) => {
	const form = MailchimpSignupForm.useForm<FormValues>({
		defaultValues: {
			[FORM_IDS.name]: '',
			[FORM_IDS.phone]: '',
			[FORM_IDS.email]: '',
			[FORM_IDS.companyName]: '',
			[FORM_IDS.country]: '',
			[FORM_IDS.hearAbout]: '',
		},
		resolver: yupResolver(schema),
	});

	return (
		<div className={styles.demoForm}>
			<MailchimpSignupForm
				form={form}
				mailchimp={{
					action: 'https://acarix.us13.list-manage.com/subscribe/post',
					u: '508f24fef3c58890422a61e8d',
					id: '7dbd62a771',
					// ht: 'd3925f1e82afe90a1165f4bcbbc7362347bf7ead:MTY1NjY3OTQ3OC42MjY3',
					tags: [MAILCHIMP_TAGS.demo],
				}}
				{...getTestAttr('form_demo')}
			>
				<Fieldset>
					<Controller
						name={FORM_IDS.name}
						control={form.control}
						render={({ field, fieldState }) => (
							<InputText
								disabled={disabled}
								fieldState={fieldState}
								placeholder="Enter your full name"
								label="Name"
								required
								{...field}
							/>
						)}
					/>
					<Controller
						name={FORM_IDS.phone}
						control={form.control}
						render={({ field, fieldState }) => (
							<InputText
								disabled={disabled}
								fieldState={fieldState}
								placeholder="Enter your phone number"
								label="Phone number"
								type="tel"
								required
								{...field}
							/>
						)}
					/>
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
					<Controller
						name={FORM_IDS.companyName}
						control={form.control}
						render={({ field, fieldState }) => (
							<InputText
								disabled={disabled}
								fieldState={fieldState}
								placeholder="Enter your clinic name"
								label="Clinic name"
								required
								{...field}
							/>
						)}
					/>
					<Controller
						name={FORM_IDS.country}
						control={form.control}
						render={({ field, fieldState }) => (
							<Select
								disabled={disabled}
								fieldState={fieldState}
								label="Country"
								options={COUNTRIES}
								required
								{...field}
							/>
						)}
					/>
					<Controller
						name={FORM_IDS.hearAbout}
						control={form.control}
						render={({ field, fieldState }) => (
							<TextArea
								fieldState={fieldState}
								label="How did you hear about CADScor®System?"
								disabled={disabled}
								required
								placeholder="Let us know in a few words"
								forceWidth
								rows={1}
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
