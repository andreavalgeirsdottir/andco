import { MediaProps } from '@apps/web/src/components/media/media';
import { vimeoFixture } from '@apps/web/src/services/sanity/__fixtures__/vimeo.fixture';

import { getImageFixture } from './image.fixture';

interface GetMediaFixtureInput {
	index?: number;
	type: MediaProps['media']['type'];
}

export function getMediaFixture(
	{ index = 0, type }: GetMediaFixtureInput = { index: 0, type: 'image' },
): MediaProps['media'] {
	if (type === 'none') {
		return {
			_type: 'media',
			type,
		};
	}

	if (type === 'video') {
		return {
			_type: 'media',
			type,
			video: vimeoFixture,
		};
	}

	return {
		_type: 'media',
		type,
		image: getImageFixture({ index }),
	};
}
