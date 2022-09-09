/**
 * This is a shared type between projects of the Blocks available in the Content Blocks Block of the Sanity Studio
 * It's been abstracted into a lib in order to get faster builds as web don't have studio as a dependency vice versa
 */
export const innerWidth = ['small', 'medium', 'large', 'full'] as const;

export type InnerWidth = typeof innerWidth[number];
