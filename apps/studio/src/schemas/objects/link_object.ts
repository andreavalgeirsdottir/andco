import { Path, Rule, ValidationError } from '@sanity/types/dist/dts';
import { isArray } from 'lodash';
import { AiOutlineLink } from 'react-icons/ai';

const fieldPath = (paths: string | string[]): Path[] =>
	(isArray(paths) ? paths : [paths]) as unknown as Path[];

export const linkValidation = (rule: Rule, optional?: boolean | Record<string, boolean>) =>
	rule.custom((fields): ValidationError | true => {
		if (optional !== false) {
			// If the field is set to optional, then we only want to validate if they've actually entered something
			if (fields?.['title'] && fields?.['type']) {
				if (fields?.['type'] === 'internal' && !fields?.['internalLink']) {
					return {
						message:
							"You've entered a title, but haven't selected a link. Select a link or remove the title.",
						paths: fieldPath('internalLink'),
					};
				}

				if (fields?.['type'] === 'external' && !fields?.['externalLink']) {
					return {
						message:
							"You've entered a title, but haven't selected a link. Select a link or remove the title.",
						paths: fieldPath('externalLink'),
					};
				}

				if (fields?.['type'] === 'file' && !fields?.['file']?.asset) {
					return {
						message:
							"You've entered a title, but haven't selected a link. Select a link or remove the title.",
						paths: fieldPath('file'),
					};
				}
			}

			if (fields?.['internalLink'] || fields?.['externalLink'] || fields?.['file']?.asset) {
				if (!fields?.['title'] && !optional?.['title']) {
					return {
						message:
							"You've selected a link, but haven't provided a title. Provide a title or remove the link.",
						paths: fieldPath('title'),
					};
				}
			}

			return true;
		}

		if (!fields['type']) {
			return {
				message: 'You need to provide a type',
				paths: fieldPath('type'),
			};
		}

		if (!fields['title'] && optional?.['title'] !== true) {
			return {
				message: 'You need to provide a title',
				paths: fieldPath('title'),
			};
		}

		if (fields['type'] === 'internal' && optional?.['internal'] !== true) {
			if (!fields['internalLink']) {
				return {
					message: 'You need to provide a link',
					paths: fieldPath('internalLink'),
				};
			}
		}

		if (fields['type'] === 'external' && optional?.['external'] !== true) {
			if (!fields['externalLink']) {
				return {
					message: 'You need to provide a link',
					paths: fieldPath('externalLink'),
				};
			}

			if (!['http', 'https', 'tel:', 'mailto:'].some((valid) => fields['externalLink'].includes(valid))) {
				return {
					message: 'The link must start with http, https, tel: or mailto:',
					paths: fieldPath('externalLink'),
				};
			}
		}

		if (fields['type'] === 'file' && optional?.['file'] !== true) {
			if (!fields?.['file']?.asset) {
				return {
					message: 'You need to provide a file',
					paths: fieldPath('file'),
				};
			}
		}

		return true;
	});

export default {
	title: 'Link',
	name: 'link',
	icon: AiOutlineLink,
	type: 'object',
	initialValue: { type: 'internal' },
	validation: linkValidation,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			options: {
				list: ['internal', 'external', 'file', 'mailto'],
			},
		},
		{
			title: 'Internal Link',
			name: 'internalLink',
			type: 'internalLink',
			hidden: ({ parent }) => !parent || parent.type !== 'internal',
		},
		{
			title: 'Anchor Point',
			name: 'anchor',
			type: 'string',
			description: 'Add an anchor point to the link',
			hidden: ({ parent }) => !parent || parent.type !== 'internal',
		},
		{
			title: 'External Link',
			name: 'externalLink',
			type: 'url',
			validation: (rule: Rule) =>
				rule.uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
				}),
			hidden: ({ parent }) => !parent || parent.type !== 'external',
		},
		{
			title: 'Mail to',
			name: 'mailto',
			type: 'reference',
			to: [{ type: 'employee' }],
			hidden: ({ parent }) => !parent || parent.type !== 'mailto',
		},
		{
			title: 'File',
			name: 'file',
			type: 'file',
			hidden: ({ parent }) => !parent || parent.type !== 'file',
		},
	],
	preview: {
		select: {
			title: 'title',
			type: 'type',
		},
		prepare: ({ title, type }) => ({
			title,
			subtitle: `${type[0].toUpperCase()}${type.substring(1)} link`,
		}),
	},
};
