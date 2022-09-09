type Url = string;
type Directory = string;

export type FontFace = {
	/**
	 * Either a URL or a path to a local file in the apps public folder.
	 */
	src: Url | Directory;
};

/**
 * Fonts constant
 * This can be imported in the different places where you need to load fonts.
 */
export const FONTS: FontFace[] = [{ src: '/fonts/Inter-Variable.ttf' }];
