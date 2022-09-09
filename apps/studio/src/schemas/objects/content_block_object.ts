import { contentBlocks } from '../../../../../libs/studio/blocks/src/lib/blocks';

export default {
	title: 'Content Block',
	name: 'contentBlock',
	type: 'array',
	of: contentBlocks,
} as const;
