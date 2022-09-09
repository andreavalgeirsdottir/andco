import classNames from 'classnames';
import Img, { ImageProps } from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { OmitStrict } from 'type-zoo/types';

import { SanityImage as SanityImageType } from '@apps/web/src/services/sanity/queries/types';
import { AspectRatio } from '@web/components/media/aspectRatios';
import { getClient } from '@web/services/sanity/client';

import styles from './sanity-image.module.scss';

export type SanityImageProps = {
	image: SanityImageType;
	aspectRatio?: AspectRatio;
	className?: string;
	height?: number;
	width?: number;
} & OmitStrict<ImageProps, 'src' | 'width' | 'height'>;

export function SanityImage({
	image,
	aspectRatio,
	sizes = '100vw',
	layout = 'responsive',
	className,
	width: forceWidth,
	height: forceHeight,
	...rest
}: SanityImageProps) {
	const { width, height, ...imageProps } = useNextSanityImage(getClient(false), image, {
		imageBuilder: (imageUrlBuilder, options) => {
			const buildWidth = forceWidth || options.width || Math.min(options.originalImageDimensions.width, 1920);

			if (aspectRatio) {
				const buildHeight = forceHeight || Math.round(buildWidth / aspectRatio);

				return imageUrlBuilder
					.width(buildWidth)
					.height(buildHeight)
					.quality(options.quality || 75)
					.fit('clip');
			}

			return imageUrlBuilder
				.width(buildWidth)
				.quality(options.quality || 75)
				.fit('clip');
		},
	});

	return (
		<div className={classNames(styles.image, className)}>
			<Img
				alt={image.alt}
				objectFit="cover"
				quality="100"
				sizes={layout === 'responsive' || layout === 'fill' ? sizes : undefined}
				layout={layout}
				{...imageProps}
				{...rest}
				{...(layout !== 'fill' && {
					width,
					height,
				})}
			/>
		</div>
	);
}
