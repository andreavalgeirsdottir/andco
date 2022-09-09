import { ColumnsBlockProps } from '@apps/web/src/blocks/columns_block/columns_block';
import { internalLinkFixture } from '@apps/web/src/services/sanity/__fixtures__/link.fixture';
import { getMediaFixture } from '@apps/web/src/services/sanity/__fixtures__/media.fixture';
import { simpletextFixtureShort } from '@apps/web/src/services/sanity/__fixtures__/simpletext.fixture';

export function ColumnsBlockFixtures(): ColumnsBlockProps['block'] {
	return {
		_key: 'key',
		_type: 'columnsBlock',
		content: [
			{
				_key: '053c74d3d61c',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ type: 'image', index: 0 }),
				subtitle: simpletextFixtureShort as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'e0771514e3ee0a6dd387d6d5cabb03ed',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ type: 'image', index: 1 }),
				subtitle: simpletextFixtureShort as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
			{
				_key: 'b0e0139d1c76b28c8d7c8092af34e5f2',
				_type: 'column',
				cta: internalLinkFixture,
				image: getMediaFixture({ type: 'image', index: 2 }),
				subtitle: simpletextFixtureShort as Sanity.Schema.SimpleText,
				title: 'Lorem ipsum dolor sit amet, consectur adipiscing elit. Donec faucibus lob ortis ',
			},
		],
		cta: internalLinkFixture,
		title: 'Lorem ipsum dolor sit amet, consect',
	};
}
