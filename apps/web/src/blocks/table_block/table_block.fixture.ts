import { TableBlockProps } from '@apps/web/src/blocks/table_block/table_block';

export const tableBlockFixture: TableBlockProps['block'] = {
	_key: 'key',
	_type: 'tableBlock',
	blockOptions: {
		firstRowAsHeader: true,
	},
	subtitle: [
		{
			_key: 'ccb346d10d63',
			_type: 'block',
			children: [
				{
					_key: 'b3ee6d80fd670',
					_type: 'span',
					marks: [],
					text: 'Our financial calendar shows the dates for the release of interim reports, year-end reports, conferences, seminars, and important events.',
				},
			],
			markDefs: [],
			style: 'normal',
		},
	],
	table: {
		_type: 'table',
		rows: [
			{
				_key: 'ebd84118-5912-4b64-9c71-ffd99af25f65',
				_type: 'tableRow',
				cells: ['Date', 'Event'],
			},
			{
				_key: '1efdcb9b-5a7b-4cb4-836d-8f93f1da0879',
				_type: 'tableRow',
				cells: ['February 17, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '931aead6-342d-468a-850e-6712eb335c56',
				_type: 'tableRow',
				cells: ['February 12, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '7c278aca-9c2b-45e1-a425-2ba676ff5170',
				_type: 'tableRow',
				cells: ['February 15, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '27dba699-dbeb-429a-ae80-1e5395895514',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '5f05e235-1345-464a-9146-48ba6b5ebbb4',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '45f2fe05-1cc8-4eb4-a2fa-34ebd582eebe',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: 'b7e14db8-16d9-469a-b052-cdf9c8091277',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: 'a92ef0f6-59e7-4f3e-98a8-e0dfc7af099c',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
			{
				_key: '4d887442-e2bb-49d7-b5d0-ccb345db38d1',
				_type: 'tableRow',
				cells: ['February 11, 2022', 'Interim Report, fourth quarter'],
			},
		],
	},
	title: 'Financial Calendar',
};
