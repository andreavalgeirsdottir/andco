# Fonts

### Nextjs - Adding custom fonts

The example app comes with an example of how to add custom fonts to your project.

#### 1. Add your fonts to the `/public/fonts` directory

#### 2. Update the [`FONTS`](/libs/theme/src/lib/ts/fonts.ts#L15) constant with your fonts.

Add your fonts to the [`FONTS`](/libs/theme/src/lib/ts/fonts.ts#L15) constant it will be responsible for loading the fonts as part of the HTML body served through SSR.

```tsx
export const FONTS: FontFace[] = [
	{
		src: '/fonts/Inter-Variable.ttf',
	},
	{
		src: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
	},
];
```

#### 3. (Optional) If you're hosting the font yourself, then you need to update the `@font-face` declarations in the [`fonts.scss`](/libs/theme/src/lib/sass/fonts.scss#L8) file, to match your fonts.

Adding the `@font-face` properties defines the CSS grouping of fonts. The `src` property defines the font file to use.

Read more about `@font-face` here: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face

```scss
@font-face {
	font-family: 'my-custom-font-normal';
	src: url('/fonts/my-custom-font-normal.woff2') format('woff2');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	// ...
}
```
