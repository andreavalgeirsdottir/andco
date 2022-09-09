import { SanityVimeoVideo } from '@apps/web/src/services/sanity/queries/vimeoVideo';

export const vimeoFixture: SanityVimeoVideo = {
	asset: {
		playbackSrc:
			'https://player.vimeo.com/external/728791381.m3u8?s=09d8fe7bf39136c743e652c579d8c938e53f9211',
		fallbackPlaybackSrc:
			'https://player.vimeo.com/progressive_redirect/playback/728791381/rendition/720p/file.mp4?loc=external&signature=4a82392d184c795f993b1f5a9a3a3e2cc8f20de3698ed9e48c187ffc66225f56',
	},
};
