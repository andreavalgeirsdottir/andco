# UI Library

## Icon

### `yarn icon_generate` or `nx run ui:icon_svgo`

Reads all the `svg` files in the [`icon/assets`](src/lib/icon/assets) directory and execute `SVGO` on them.

All the `svg` you add should have either a `stroke="currentColor` or `fill="currentColor"` attribute.

That way the `svg` will use the `CSS` `color` property to change the color of the icon.

If the `svg` `stroke` or `fill` attribute is set to `black` then it will automatically be converted to `currentColor` when you run the [`generate.mjs`](src/lib/icon/scripts/generate.mjs) script.

### `yarn icon_svgo` or `nx run ui:icon_generate`

This first executes `yarn icon_svgo` script and then executes the [`icon/scripts/generate.mjs`](src/lib/icon/scripts/generate.mjs) node script which updates the [`icon/icons.ts`](src/lib/icon/icons.ts) with all the icons.

The `icons.ts` includes and object with all the icon and types

The `icons.ts` file is imported in the [`<Icon />`](src/lib/icon/lib/icon.tsx) component and controls the available icons.
