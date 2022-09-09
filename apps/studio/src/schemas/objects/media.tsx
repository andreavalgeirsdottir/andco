import React from 'react';
import { AiOutlinePicture } from 'react-icons/ai';

export default {
	title: 'Media',
	name: 'media',
	icon: AiOutlinePicture,
	type: 'object',
	fields: [
		{
			title: 'Type',
			name: 'type',
			type: 'string',
			initialValue: 'image',
			options: {
				list: [
					{ title: 'None', value: undefined },
					{ title: 'Image', value: 'image' },
					{ title: 'Video', value: 'video' },
				],
			},
		},
		{
			title: 'Image',
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				{
					title: 'Alternative Text',
					description: 'A short description of the image, which provides context of what image is showing',
					name: 'alt',
					type: 'string',
				},
				{
					title: 'Attribution',
					description: 'Overrides default Attribution from media library',
					name: 'attribution',
					type: 'string',
				},
			],
			hidden: ({ parent }) => !parent || parent.type !== 'image',
		},
		{
			title: 'Video',
			name: 'video',
			type: 'vimeoObject',
			hidden: ({ parent }) => !parent || parent.type !== 'video',
		},
		{
			title: 'Video Settings',
			name: 'settings',
			type: 'object',
			hidden: ({ parent }) => !parent || parent.type !== 'video',
			options: {
				collapsible: true,
				collapsed: false,
				columns: 2,
			},
			fields: [
				{
					title: 'Show Controls',
					name: 'controls',
					type: 'boolean',
					initialValue: false,
				},
				{
					title: 'Muted',
					name: 'muted',
					type: 'boolean',
					initialValue: true,
				},
				{
					title: 'Autoplay',
					name: 'autoPlay',
					description: 'Video cannot autoplay, if not muted.',
					type: 'boolean',
					initialValue: false,
				},
				{
					title: 'Loop',
					name: 'loop',
					type: 'boolean',
					initialValue: false,
				},
			],
		},
	],
	preview: {
		select: {
			type: 'type',
			image: 'image',
			video: 'video.asset.playbackId',
		},
		prepare({ type, image, video }: { type: 'image' | 'video' | undefined; image: unknown; video: string }) {
			if (!type) {
				return {
					title: '[Media]',
				};
			}

			return {
				title: `[Media | ${type === 'image' ? 'Image' : 'Video'}]`,
				media:
					type === 'image' ? (
						image
					) : video ? (
						<img src={`https://image.mux.com/${video}/thumbnail.jpg?time=0`} />
					) : undefined,
			};
		},
	},
};
