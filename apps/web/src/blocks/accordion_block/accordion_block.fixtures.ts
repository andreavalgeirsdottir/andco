import { AccordionBlockProps } from '@apps/web/src/blocks/accordion_block/accordion_block';
import { richtextFixture } from '@apps/web/src/services/sanity/__fixtures__/richtext.fixture';

export const accordionBlockFixture: AccordionBlockProps['block'] = {
	_key: 'key',
	_type: 'accordionBlock',
	title: 'Questions regarding the CADScor®System',
	blockOptions: { multiple: true },
	items: [
		{
			_type: 'item',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			_key: '1',
			content: richtextFixture as Sanity.Schema.RichText,
		},
		{
			_type: 'item',
			title:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra nunc mattis amet libero arcu pharetra.',
			_key: '2',
			content: richtextFixture as Sanity.Schema.RichText,
		},
		{
			_type: 'item',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			_key: '3',
			content: richtextFixture as Sanity.Schema.RichText,
			defaultOpen: true,
		},
		{
			_type: 'item',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			_key: '4',
			content: richtextFixture as Sanity.Schema.RichText,
		},
		{
			_type: 'item',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			_key: '5',
			content: richtextFixture as Sanity.Schema.RichText,
		},
		{
			_type: 'item',
			title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			_key: '6',
			content: richtextFixture as Sanity.Schema.RichText,
		},
	],
};
