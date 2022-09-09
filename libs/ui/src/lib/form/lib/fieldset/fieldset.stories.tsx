import { Meta, Story } from '@storybook/react';
import React, { useCallback } from 'react';

import { OneOf } from '@noa/utils-common';
import { PaddedDecorator } from '@noa/utils-storybook';

import { Checkbox } from '../checkbox/checkbox';
import { Form, useForm, yup, yupResolver } from '../form/form';
import { InputText } from '../inputtext/inputtext';
import { Select } from '../select/select';
import { TextArea } from '../textarea/textarea';
import { Fieldset, FieldsetProps } from './fieldset';

export default {
	component: Fieldset,
	title: 'Library/Form/Fieldset',
	decorators: [PaddedDecorator],
} as Meta;

const selectOptions = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' },
	{ value: 'three', label: 'Three' },
];

type FormValues = {
	checkbox?: boolean;
	datePicker?: string;
	email?: string;
	inputNumber?: string;
	unused?: string;
	inputText?: string;
	inputTextRequired?: string;
	select?: OneOf<typeof selectOptions>['value'];
	textarea?: string;
};

const schema = yup.object().shape({
	// full_name: yup.string().required('Please enter your name'),
	checkbox: yup.boolean().required(),
	inputText: yup.string(),
	unused: yup.string(),
	inputTextRequired: yup.string().required(),
	email: yup.string().email('Please enter a valid email').required(),
	textarea: yup.string(),
	select: yup.array().of(yup.object()).nullable(),
	inputNumber: yup.string(),
});

const Template: Story<
	FieldsetProps & {
		style?: React.CSSProperties;
		required?: boolean;
		disabled?: boolean;
		onSubmit?: (values: FormValues) => void;
	}
> = ({ style, disabled, required, onSubmit, ...args }) => {
	const form = useForm<FormValues>({
		defaultValues: {
			checkbox: false,
			inputText: '',
			unused: '',
			inputTextRequired: '',
			email: '',
			textarea: '',
			select: '',
			inputNumber: '',
		},
		resolver: yupResolver(schema),
	});

	const handleSubmit = useCallback(() => {
		onSubmit?.(form.getValues());
	}, []);

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} style={style}>
			<Fieldset {...args}>
				<Form.Controller
					name="inputTextRequired"
					control={form.control}
					render={({ field, fieldState }) => (
						<InputText
							fieldState={fieldState}
							label="First name"
							placeholder="Enter your first name"
							description="We need your first name to know what to call you"
							disabled={disabled}
							required={required || true}
							{...field}
						/>
					)}
				/>
				<Form.Controller
					name="email"
					control={form.control}
					render={({ field, fieldState }) => (
						<InputText
							fieldState={fieldState}
							label="Email"
							placeholder="Enter your email information"
							type="email"
							disabled={disabled}
							required={required}
							{...field}
						/>
					)}
				/>
				<Form.Controller
					name="inputNumber"
					control={form.control}
					render={({ field, fieldState }) => (
						<InputText
							fieldState={fieldState}
							label="Age"
							placeholder="Enter your age"
							type="number"
							disabled={disabled}
							{...field}
						/>
					)}
				/>
				<Form.Controller
					name="unused"
					control={form.control}
					render={({ field, fieldState }) => (
						<InputText
							{...field}
							fieldState={fieldState}
							label="Disabled field"
							value={'Readonly value in here'}
							disabled={disabled || true}
							required={required}
							readOnly
						/>
					)}
				/>{' '}
				<Form.Controller
					name="select"
					control={form.control}
					render={({ field, fieldState }) => (
						<Select
							fieldState={fieldState}
							label="Department"
							placeholder="Select a department"
							options={selectOptions}
							disabled={disabled}
							required={required}
							{...field}
						/>
					)}
				/>
				<Form.Controller
					name="textarea"
					control={form.control}
					render={({ field, fieldState }) => (
						<TextArea
							fieldState={fieldState}
							label="Comment"
							placeholder="Add a comment"
							rows={3}
							disabled={disabled}
							required={required}
							{...field}
						/>
					)}
				/>
				<Form.Controller
					name="checkbox"
					control={form.control}
					render={({ field: { value, ...field }, fieldState }) => (
						<Checkbox
							label="Comment"
							placeholder="Add a comment"
							fieldState={fieldState}
							checked={value}
							{...field}
						/>
					)}
				/>
			</Fieldset>
			<Fieldset.Center>
				<button type="submit" style={{ marginTop: 30, padding: 20 }}>
					Submit values
				</button>
			</Fieldset.Center>
		</form>
	);
};

export const Default = Template.bind({});

Default.args = {
	required: false,
	disabled: false,
};

Default.argTypes = {
	onSubmit: {
		action: 'submit',
	},
};
