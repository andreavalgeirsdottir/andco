# Theme

This is the theme including shared styling, variables and methods across apps.

## Commands

### `generate_variables`

Loops over the `src/lib/variables.scss` file, and outputs the variables as Typescript to the `src/generated/types.ts` file.

### `generate_schema`

Reads the `src/lib/css-tokens.css` file and generates the Theme Schema `src/generated/schema.scss` file.

This uses the colors of the `src/lib/css-tokens.css` file to generate the theme variables.

## Updating colors

1. Go to https://chromatone.vercel.app/
2. Either upload the `hct-color-config.json` as a `Template file` or create your complete own color scheme.
3. Adjust the colors for your needs.
4. Export the changes as `JSON` and `CSS` and override the `hct-color-config.json` and `css-tokens.css` files.
5. Execute the following command to update the variables.

```sh
yarn nx run theme:generate
```
