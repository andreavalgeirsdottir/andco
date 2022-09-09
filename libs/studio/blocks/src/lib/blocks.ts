/**
 * This is a shared type between projects of the Blocks available in the Content Blocks Block of the Sanity Studio
 * It's been abstracted into a lib in order to get faster builds as web don't have studio as a dependency vice versa
 */
export const contentBlocks = [
	{
		type: 'richTextBlock',
	},
	{
		type: 'heroBlock',
	},
	{
		type: 'columnsBlock',
	},
	{
		type: 'breakerBlock',
	},
	{
		type: 'accordionBlock',
	},
	{
		type: 'tableBlock',
	},
	{
		type: 'listBlock',
	},
	{
		type: 'formsBlock',
	},
	{
		type: 'customBlock',
	},
] as const;

export type ContentBlocks = typeof contentBlocks[number]['type'];
