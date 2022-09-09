import { groq } from 'next-sanity';

import { useBlockContext } from '@apps/web/src/blocks/content-block/provider';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { AspectRatio } from '@web/components/media/aspectRatios';
import { Media, MediaProps } from '@web/components/media/media';

export interface MediaBlockProps {
	block: MediaProps['media'];
}

export function MediaBlock({ block }: MediaBlockProps) {
	const { columns } = useBlockContext();
	const screenspace = `${Math.floor(100 / columns)}vw`;

	return (
		<Media
			media={block}
			aspectRatio={columns === 1 ? AspectRatio['12:5'] : AspectRatio['16:9']}
			sizes={`(min-width: '768px') ${screenspace}, 100vw`}
		/>
	);
}

MediaBlock.groq = blockGroq({
	query: groq`{
	...,
	...select(
		type == 'image' => {
			"image": {
				...image,
				"asset": image.asset->
			}
		},
		type == 'video' => {
			"video": {
				...video,
			}
		}
	)
}`,
});
