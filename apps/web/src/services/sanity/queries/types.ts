import { TemplateKey } from '@apps/web/src/templates';

export type SanityImage = {
	_type: 'image';
	asset: {
		_createdAt: string;
		_id: string;
		_rev: string;
		_type: 'sanity.imageAsset';
		_updatedAt: string;
		assetId: string;
		extension: string;
		metadata: Metadata;
		mimeType: string;
		originalFilename: string;
		path: string;
		sha1hash: string;
		size: number;
		uploadId: string;
		url: string;

		// Sanity media library content
		title?: string;
		alt?: string;
		tags?: string[];
		attribution?: string;
	};
	crop?: Sanity.ImageCrop;
	hotspot?: Sanity.ImageHotspot;
	alt?: string;
	attribution?: string;
};

interface Metadata {
	_type: 'sanity.imageMetadata';
	blurHash: string;
	dimensions: Dimensions;
	hasAlpha: boolean;
	isOpaque: boolean;
	lqip: string;
	palette: Palette;
}

interface Palette {
	_type: 'sanity.imagePalette';
	darkMuted: PaletteSwatc;
	darkVibrant: PaletteSwatc;
	dominant: PaletteSwatc;
	lightMuted: PaletteSwatc;
	lightVibrant: PaletteSwatc;
	muted: PaletteSwatc;
	vibrant: PaletteSwatc;
}

interface PaletteSwatc {
	_type: 'sanity.imagePaletteSwatch';
	background: string;
	foreground: string;
	population: number;
	title: string;
}

interface Dimensions {
	_type: 'sanity.imageDimensions';
	aspectRatio: number;
	height: number;
	width: number;
}

export type SanityFile = {
	_createdAt: string;
	_id: string;
	_rev: string;
	_type: 'sanity.fileAsset';
	_updatedAt: string;
	assetId: string;
	extension: string;
	mimeType: string;
	originalFilename: string;
	path: string;
	sha1hash: string;
	size: number;
	uploadId: string;
	url: string;
};

export type SanityTable = {
	_type: 'table';
	rows: Row[];
};

type Row = {
	_key: string;
	_type: 'tableRow';
	cells: string[];
};

export type SlugMap<Queries extends object = {}> = {
	docType: TemplateKey | undefined;
	queryParams: Queries & { slug: string };
};
