import { BreakerBlockProps } from '@apps/web/src/blocks/breaker_block/breaker_block';
import { internalLinkFixture } from '@apps/web/src/services/sanity/__fixtures__/link.fixture';
import { getMediaFixture } from '@apps/web/src/services/sanity/__fixtures__/media.fixture';

export const breakerBlockFixtures: BreakerBlockProps['block'] = {
	_key: 'key',
	_type: 'breakerBlock',
	backgroundImage: getMediaFixture({ type: 'image', index: 1 }),
	blockOptions: {
		variants: 'text-left',
	},
	content: [
		{
			_key: 'ae702535c679',
			_type: 'block',
			children: [
				{
					_key: '3ece9507d2cc0',
					_type: 'span',
					marks: [],
					text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Malesuada ornare est sed sem elementum mattis. Nunc in risus, tristique leo purus aliquet in faucibus.',
				},
			],
			markDefs: [],
			style: 'normal',
		},
	],
	cta: internalLinkFixture,
	foregroundImage: getMediaFixture({ type: 'image', index: 0 }),
	title: 'Lorem ipsum dolor sit amet, consect',
};
