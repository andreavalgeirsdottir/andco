import { Rule } from '@sanity/types';
import dayjs from 'dayjs';

export const FORMATS = {
	'YYYY-MM-DD': 'YYYY-MM-DD',
};

export default {
	title: 'Date',
	name: 'dateObject',
	type: 'date',
	validation: (rule: Rule) => rule.required(),
	codegen: { required: true },
	initialValue: dayjs(new Date()).format(FORMATS['YYYY-MM-DD']),
};
