import { HeroBlockProps } from '@apps/web/src/blocks/hero_block/hero_block';
import { internalLinkFixture } from '@apps/web/src/services/sanity/__fixtures__/link.fixture';
import { getMediaFixture } from '@apps/web/src/services/sanity/__fixtures__/media.fixture';

export function HeroBlockFixtures(): HeroBlockProps['block'] {
	return {
		_key: 'key',
		_type: 'heroBlock',
		backgroundImage: getMediaFixture({ index: 1, type: 'image' }),
		content: [
			{
				_key: '8284d302a859',
				_type: 'block',
				children: [
					{
						_key: '77d20c40c1e00',
						_type: 'span',
						marks: [],
						text: 'etiam ultrices egestas id. Cum dui aliquam, id sagittis. Faucibus eget si libero ipsum diam sed id eget. etiam ultrices egestas id. Cum dui aliquam, id sagittis. Faucibus eget si libero ipsum diam sed id eget.',
					},
				],
				markDefs: [],
				style: 'normal',
			},
		],
		cta: internalLinkFixture,
		foregroundImage: getMediaFixture({ index: 0, type: 'image' }),
		title: 'Lorem ipsum dolor sit amet',
	};
}
