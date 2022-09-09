import { SanityImage as SanityImageType } from '@apps/web/src/services/sanity/queries/types';

import { getByRolloverIndex } from './helpers';

/* eslint-disable max-len */
const images: SanityImageType[] = [
	{
		_type: 'image',
		alt: 'Alt text override',
		asset: {
			_createdAt: '2022-04-27T13:59:28Z',
			_id: 'image-177901ea46b9724fb242e4b7fd5f6d1362a231f9-1728x2160-jpg',
			_rev: '2Ogqgd9eeFhc2y0WBEZUmR',
			_type: 'sanity.imageAsset',
			_updatedAt: '2022-04-27T14:00:13Z',
			alt: 'Foto af vishal amin',
			assetId: '177901ea46b9724fb242e4b7fd5f6d1362a231f9',
			extension: 'jpg',
			metadata: {
				_type: 'sanity.imageMetadata',
				blurHash: 'dUEy_6M{DiX9~VIURkV@_3R*WBbH?ukCRPWBDioex]oL',
				dimensions: {
					_type: 'sanity.imageDimensions',
					aspectRatio: 0.8,
					height: 2160,
					width: 1728,
				},
				hasAlpha: false,
				isOpaque: true,
				lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAZABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUDBwgG/8QAKBAAAgEDAwMCBwAAAAAAAAAAAQIDAAQFBhEhEjFxExUHIjI1QVFy/8QAGAEBAAMBAAAAAAAAAAAAAAAAAwABAgT/xAAfEQACAQQCAwAAAAAAAAAAAAAAARECAxITITFBUVL/2gAMAwEAAhEDEQA/AJPhbrQXax2GavTGsQ2Q/hvJq3fd7H0iS46duG3B2rG9tecyPEgClvlTnceKbHM5exiQO11HC44EgOx8VWpN9wBVcqXiTSdxq7CWkpia6d2Hcgb0VmR8xdyt1qwANFTVR7M7bnyWLhMnpXTOOj90jilyTsHKKgYIP1XQSa1wGZtx6xtXVPpjlQAiqBy/3OX+qjfuKTKGHpTShwNc3drJlLh4REsbOSqoOAKKSv3oosU+ToXB/9k=',
				palette: {
					_type: 'sanity.imagePalette',
					darkMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#335c5b',
						foreground: '#fff',
						population: 4.69,
						title: '#fff',
					},
					darkVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#042521',
						foreground: '#fff',
						population: 0.04,
						title: '#fff',
					},
					dominant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#c0ccc2',
						foreground: '#000',
						population: 8.38,
						title: '#fff',
					},
					lightMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#c0ccc2',
						foreground: '#000',
						population: 8.38,
						title: '#fff',
					},
					lightVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#94d4dc',
						foreground: '#000',
						population: 0,
						title: '#fff',
					},
					muted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#60a7a9',
						foreground: '#fff',
						population: 1.02,
						title: '#fff',
					},
					vibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#2e636c',
						foreground: '#fff',
						population: 0.64,
						title: '#fff',
					},
				},
			},
			mimeType: 'image/jpeg',
			originalFilename: 'pexels-vishal-amin-910307.jpg',
			path: 'images/tevzf6ev/production/177901ea46b9724fb242e4b7fd5f6d1362a231f9-1728x2160.jpg',
			sha1hash: '177901ea46b9724fb242e4b7fd5f6d1362a231f9',
			size: 621659,
			tags: ['canada'],
			title: 'Peyto lake',
			uploadId: 'eCmJeCMgqggxTHjaxUSPv5ZW9jIPhFFP',
			url: 'https://cdn.sanity.io/images/f0s2yiwy/production/51b14d4fccf2997d69f5462a686ee54556986c6c-1792x1024.png',
		},
		crop: {
			_type: 'sanity.imageCrop',
			bottom: 0.0024539877300607804,
			left: 0,
			right: 0.009202453987729675,
			top: 0,
		},
		hotspot: {
			_type: 'sanity.imageHotspot',
			height: 0.403680981595092,
			width: 0.47852760736196354,
			x: 0.7269938650306743,
			y: 0.780981595092024,
		},
	},
	{
		_type: 'image',
		asset: {
			_createdAt: '2022-04-27T13:57:22Z',
			_id: 'image-68404a772e167a8232dfa6489760206b9b3dfcf1-4226x2847-jpg',
			_rev: '2Ogqgd9eeFhc2y0WBEZ9re',
			_type: 'sanity.imageAsset',
			_updatedAt: '2022-04-27T13:59:17Z',
			alt: 'Foto af James Wheeler',
			assetId: '68404a772e167a8232dfa6489760206b9b3dfcf1',
			extension: 'jpg',
			metadata: {
				_type: 'sanity.imageMetadata',
				blurHash: 'VW9IoIRnNawcax-UWVRjoKayyZaJW=jYj]t-ayV@ofn$',
				dimensions: {
					_type: 'sanity.imageDimensions',
					aspectRatio: 1.4843695117667721,
					height: 2847,
					width: 4226,
				},
				hasAlpha: false,
				isOpaque: true,
				lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIDBAUG/8QAIxAAAgEEAQMFAAAAAAAAAAAAAQIDAAQFESEGEzEHEiJBcf/EABYBAQEBAAAAAAAAAAAAAAAAAAMFBv/EAB4RAAEEAQUAAAAAAAAAAAAAAAEAAgQRBQMhIjGB/9oADAMBAAIRAxEAPwDkbDP5a2lmV7p5JEX3bPINX29RZ+2FkSZhrkBfv9rKe0W1U/Jn353UsmQkig7ZSJ1IA0UHiq+tEfVByzEbKNJPEJLvqnPXkxlt7qOGMjQQsNiinvOm8fdyiYRtEWUbVW43RQHHzr2ehGWinsV4v//Z',
				palette: {
					_type: 'sanity.imagePalette',
					darkMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#3f5a62',
						foreground: '#fff',
						population: 6.24,
						title: '#fff',
					},
					darkVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#057b9b',
						foreground: '#fff',
						population: 6.33,
						title: '#fff',
					},
					dominant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#057b9b',
						foreground: '#fff',
						population: 6.33,
						title: '#fff',
					},
					lightMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#87adc9',
						foreground: '#000',
						population: 0.78,
						title: '#fff',
					},
					lightVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#60b1f0',
						foreground: '#000',
						population: 0.22,
						title: '#fff',
					},
					muted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#bf8f86',
						foreground: '#000',
						population: 5.1,
						title: '#fff',
					},
					vibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#089fca',
						foreground: '#fff',
						population: 4.35,
						title: '#fff',
					},
				},
			},
			mimeType: 'image/jpeg',
			originalFilename: 'pexels-james-wheeler-417074.jpg',
			path: 'images/tevzf6ev/production/68404a772e167a8232dfa6489760206b9b3dfcf1-4226x2847.jpg',
			sha1hash: '68404a772e167a8232dfa6489760206b9b3dfcf1',
			size: 2304808,
			tags: ['canada'],
			title: 'Lake moraine',
			uploadId: '43Ldp7tZ40luDXKHKuLQVXfdV65Iv106',
			url: 'https://cdn.sanity.io/images/f0s2yiwy/production/f5b6462a0a857501fb18dbb6c7e46b2baa75fa6b-1792x1024.png',
		},
		crop: {
			_type: 'sanity.imageCrop',
			bottom: 0,
			left: 0,
			right: 0,
			top: 0,
		},
		hotspot: {
			_type: 'sanity.imageHotspot',
			height: 0.47078100510899934,
			width: 0.4623287671232875,
			x: 0.7294520547945197,
			y: 0.2532007571902545,
		},
	},
	{
		_type: 'image',
		asset: {
			_createdAt: '2022-04-27T13:57:22Z',
			_id: 'image-68404a772e167a8232dfa6489760206b9b3dfcf1-4226x2847-jpg',
			_rev: '2Ogqgd9eeFhc2y0WBEZ9re',
			_type: 'sanity.imageAsset',
			_updatedAt: '2022-04-27T13:59:17Z',
			alt: 'Foto af James Wheeler',
			assetId: '68404a772e167a8232dfa6489760206b9b3dfcf1',
			extension: 'jpg',
			metadata: {
				_type: 'sanity.imageMetadata',
				blurHash: 'VW9IoIRnNawcax-UWVRjoKayyZaJW=jYj]t-ayV@ofn$',
				dimensions: {
					_type: 'sanity.imageDimensions',
					aspectRatio: 1.4843695117667721,
					height: 2847,
					width: 4226,
				},
				hasAlpha: false,
				isOpaque: true,
				lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIDBAUG/8QAIxAAAgEEAQMFAAAAAAAAAAAAAQIDAAQFESEGEzEHEiJBcf/EABYBAQEBAAAAAAAAAAAAAAAAAAMFBv/EAB4RAAEEAQUAAAAAAAAAAAAAAAEAAgQRBQMhIjGB/9oADAMBAAIRAxEAPwDkbDP5a2lmV7p5JEX3bPINX29RZ+2FkSZhrkBfv9rKe0W1U/Jn353UsmQkig7ZSJ1IA0UHiq+tEfVByzEbKNJPEJLvqnPXkxlt7qOGMjQQsNiinvOm8fdyiYRtEWUbVW43RQHHzr2ehGWinsV4v//Z',
				palette: {
					_type: 'sanity.imagePalette',
					darkMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#3f5a62',
						foreground: '#fff',
						population: 6.24,
						title: '#fff',
					},
					darkVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#057b9b',
						foreground: '#fff',
						population: 6.33,
						title: '#fff',
					},
					dominant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#057b9b',
						foreground: '#fff',
						population: 6.33,
						title: '#fff',
					},
					lightMuted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#87adc9',
						foreground: '#000',
						population: 0.78,
						title: '#fff',
					},
					lightVibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#60b1f0',
						foreground: '#000',
						population: 0.22,
						title: '#fff',
					},
					muted: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#bf8f86',
						foreground: '#000',
						population: 5.1,
						title: '#fff',
					},
					vibrant: {
						_type: 'sanity.imagePaletteSwatch',
						background: '#089fca',
						foreground: '#fff',
						population: 4.35,
						title: '#fff',
					},
				},
			},
			mimeType: 'image/jpeg',
			originalFilename: 'pexels-james-wheeler-417074.jpg',
			path: 'images/tevzf6ev/production/68404a772e167a8232dfa6489760206b9b3dfcf1-4226x2847.jpg',
			sha1hash: '68404a772e167a8232dfa6489760206b9b3dfcf1',
			size: 2304808,
			tags: ['canada'],
			title: 'Lake moraine',
			uploadId: '43Ldp7tZ40luDXKHKuLQVXfdV65Iv106',
			url: 'https://cdn.sanity.io/images/f0s2yiwy/production/34bc295adec3cc1dfaf6adabe8c8fee3e94794d4-1792x1024.png',
		},
		crop: {
			_type: 'sanity.imageCrop',
			bottom: 0,
			left: 0,
			right: 0,
			top: 0,
		},
		hotspot: {
			_type: 'sanity.imageHotspot',
			height: 0.47078100510899934,
			width: 0.4623287671232875,
			x: 0.7294520547945197,
			y: 0.2532007571902545,
		},
	},
];
/* eslint-enable max-len */

export const sanityImageFixture: SanityImageType = images[0];

interface GetImageFixtureInput {
	index?: number;
	crop?: boolean;
	hotspot?: boolean;
}

export function getImageFixture({ index = 0, crop = true, hotspot = true }: GetImageFixtureInput = {}) {
	const { crop: cropData, hotspot: hotspotData, ...img } = getByRolloverIndex(images, index);
	const result: SanityImageType = { ...img };

	if (crop) {
		Object.assign(result, { crop: cropData });
	}

	if (hotspot) {
		Object.assign(result, { hotspot: hotspotData });
	}

	return result;
}
