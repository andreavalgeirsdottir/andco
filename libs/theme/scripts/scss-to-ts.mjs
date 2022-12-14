import chalk from 'chalk';
import fs from 'fs';
import meow from 'meow';
import sass from 'sass';

/**
 * This is a Node Script to convert SCSS file to an Typescript Definition file.
 * @media queries are currently NOT supported.
 */

const cli = meow(
	`
 Usage
	 $ scssToTs <input> <output>

 Examples
	 $ scssToTs src/lib/variables.scss src/generated/types.ts
`,
	{
		importMeta: import.meta,
	},
);

const [input, output] = cli.input || ['', ''];

if (!input || !output) {
	cli.showHelp();
	process.exit(1);
}

const WARNING = `/**
* THIS FILE IS AUTOMATICALLY GENERATED FROM \`theme/src/lib/variables.scss\`.
* DO NOT UPDATE.
*
* To update please change the \`variables.scss\` and run the following command:
*
* \`\`\`sh
* $ yarn nx run theme:generate
* \`\`\`
*/`;

const isBreakpoint = (s) => s.includes('--bp-');
const extendVariable = (acc, key, value) => `${acc}'${key}': '${value.replace(/'/g, '"')}',\n`;

const load = async () => {
	try {
		let outputData = '\n';

		const result = sass.compile(input, { style: 'compressed' });
		const styles = result.css;
		const cleanedStyles = styles.split(/@media|:root{|}/g).filter(Boolean);

		const variables = cleanedStyles
			.map((style) => style.split(/;/g))
			.filter((style) => style.every(Boolean))
			.filter((s) => s.some((d) => d.includes('--')))
			.flat();

		outputData = `${outputData}${WARNING}\nexport const variables = {\n`;

		outputData = variables.reduce((_styles, style) => {
			if (isBreakpoint(style)) {
				return _styles;
			}

			const [key, value] = style.split(': ');

			if (_styles.includes(key)) return _styles;

			return extendVariable(_styles, key, value);
		}, outputData);

		outputData = `${outputData}} as const;\n\n`;
		outputData = `${outputData}export type Variables = typeof variables\n`;
		outputData = `${outputData}export type VariableKeys = keyof Variables;\n\n`;

		outputData = `${outputData}${WARNING}\nexport const breakpoints = {\n`;

		outputData = variables.reduce((_styles, style) => {
			if (!isBreakpoint(style)) {
				return _styles;
			}

			const [key, value] = style.split(': ');
			const keyName = key.replace('--bp-', '');

			return extendVariable(_styles, keyName, value);
		}, outputData);

		outputData = `${outputData}} as const;\n\n`;
		outputData = `${outputData}export type Breakpoints = typeof breakpoints\n`;
		outputData = `${outputData}export type BreakpointKeys = keyof Breakpoints;\n\n`;

		fs.writeFileSync(output, outputData);

		console.log(
			`\n${chalk.bgGreen
				.hex('#000')
				.bold(' Success ')} Generated TS types for CSS variables at ${chalk.underline(
				`libs/theme/${output}`,
			)}\n`,
		);
	} catch (err) {
		console.warn('Failed Error', err);
	}
};

load();
