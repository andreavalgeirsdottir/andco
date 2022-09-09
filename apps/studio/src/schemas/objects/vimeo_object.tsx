import { Rule } from '@sanity/types/dist/dts';
import { ImFilePlay } from 'react-icons/im';

export default {
	title: 'Video',
	name: 'vimeoObject',
	type: 'object',
	icon: ImFilePlay,
	fields: [
		{
			title: 'Asset',
			name: 'asset',
			type: 'object',
			options: {
				collapsible: true,
				collapsed: false,
			},
			fields: [
				{
					type: 'string',
					name: 'playbackSrc',
					title: 'Playback Source (HLS)',
					description:
						'The "HLS" Distribution source. (1) Go to https://vimeo.com/manage/videos (2) Press the 3 dots (More actions) (3) Press Analytics (4) Go the left Distribution tab (5) Press "Copy link" next to "HLS (m3u8)" (6) Paste it here',
					validation: (rule: Rule) => rule.required(),
					codegen: { required: true },
				},
				{
					type: 'string',
					name: 'fallbackPlaybackSrc',
					title: 'Fallback Playback Source (older devices)',
					description:
						'The "HD 720p" Distribution source. (1) Go to https://vimeo.com/manage/videos (2) Press the 3 dots (More actions) (3) Press Analytics (4) Go the left Distribution tab (5) Press "Copy link" next to "HD 720p (mp4, 1280x720)" (6) Paste it here',
				},
			],
		},
	],
};
