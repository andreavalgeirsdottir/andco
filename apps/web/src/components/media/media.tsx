import { OmitStrict } from 'type-zoo/types';

import VimeoVideo, { VimeoVideoProps } from '@apps/web/src/components/vimeo-video/vimeo-video';
import { type SanityImage as SanityImageType } from '@apps/web/src/services/sanity/queries/types';
import { SanityImage, SanityImageProps } from '@web/components/sanity-image/sanity-image';

import { AspectRatio } from './aspectRatios';

export type MediaProps = {
	media:
		| {
				_type: 'media';
				type: 'none';
		  }
		| {
				_type: 'media';
				type: 'image';
				image: SanityImageType;
		  }
		| ({
				_type: 'media';
				type: 'video';
		  } & OmitStrict<VimeoVideoProps, 'className'>);
	aspectRatio?: AspectRatio;
	sizes?: string;
	className?: string;
	imageProps?: OmitStrict<SanityImageProps, 'image'>;
};

export function Media({
	media,
	aspectRatio = AspectRatio['16:9'],
	sizes,
	className,
	imageProps,
	...rest
}: MediaProps) {
	if (media?.type === 'none' || !Media.hasMedia(media)) {
		return null;
	}

	if (media?.type === 'image') {
		return (
			<SanityImage
				image={media.image}
				aspectRatio={aspectRatio}
				sizes={sizes}
				className={className}
				{...imageProps}
				{...rest}
			/>
		);
	}

	if (media?.type === 'video') {
		return <VimeoVideo className={className} {...media} />;
	}

	return (
		<pre className={className} {...rest}>
			{JSON.stringify(media, null, 4)}
		</pre>
	);
}

/**
 * @returns Whether an media exist
 */
Media.hasMedia = (media?: MediaProps['media']) => {
	if (media?.type === 'none') {
		return false;
	}

	if (media?.type === 'image') {
		return !!media.image?.asset;
	}

	if (media?.type === 'video') {
		return !!media.video;
	}

	return false;
};
