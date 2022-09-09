import chalk from 'chalk';
import fs from 'fs';
import max from 'lodash/max.js';
import meow from 'meow';
import sass from 'sass';

import { infoMinor } from '../../utils/cli/src/lib/helpers.mjs';

const cli = meow(
	`
 Usage
	 $ generateSchema <input> <output>

 Examples
	 $ generateSchema src/lib/css-tokens.css src/generated/schema.scss
	 $ generateSchema src/lib/css-tokens.css src/generated/schema.scss --defaultSchema=dark
`,
	{
		importMeta: import.meta,
		flags: {
			createTsTypes: {
				type: 'boolean',
				default: true,
			},
			defaultSchema: {
				type: 'string',
				alias: 'ds',
				default: 'light',
			},
			schemaIdentifier: {
				type: 'string',
				default: '--c-schemes-',
			},
		},
	},
);

const [input, output] = cli.input || ['', ''];
const { defaultSchema, schemaIdentifier, createTsTypes } = cli.flags;

if (!input || !output) {
	cli.showHelp();
	process.exit(1);
}

const header = `/**
* This file is generated - Do not edit directly
*/`;

const load = async () => {
	try {
		let sassOutputData = `${header}\n:root {\n`;
		let tsOutputData = `${header}\n`;
		const result = sass.compile(input);
		const styles = result.css;

		const formattedStyles = styles
			.replace(/:root {/, '{;')

			.replace(/ {2}|\n/g, '')
			.split('@media')?.[0]
			.split(';')
			.filter((p) => p.includes('schemes'));

		const schemes = formattedStyles.reduce((_styles, s) => {
			const cleanedKeys = s.split(schemaIdentifier)[1];
			const schemaName = cleanedKeys.split('-')[0];
			const valueName = cleanedKeys.replace(`${schemaName}-`, '').split(':')[0];
			const schemaVariableName = `--c-${valueName}`;
			const valueVariableName = s.split(':')[0];
			const schema = _styles[schemaName];

			if (schema) {
				return {
					..._styles,
					[schemaName]: {
						...schema,
						[schemaVariableName]: `var(${valueVariableName});`,
					},
				};
			}

			return { ..._styles, [schemaName]: { [schemaVariableName]: `var(${valueVariableName});` } };
		}, {});

		const getCSSVariable = ([key, value]) => `  ${key}: ${value}`;
		const schemeEntries = Object.entries(schemes);
		const defaultSchemeValues = Object.entries(schemes[defaultSchema]);
		const levels = defaultSchemeValues.map(([k]) => Number(k.split('level')[1]));
		const maxLevel = max(levels);

		sassOutputData = `${sassOutputData}${defaultSchemeValues.map(getCSSVariable).join('\n')}`;

		if (createTsTypes) {
			tsOutputData = `${tsOutputData}\nexport const scheme = [`;

			tsOutputData = schemeEntries.reduce((schemas, [schema], index) => {
				return [schemas, `  "${schema}"`].join(index === 0 ? '\n' : ',\n');
			}, tsOutputData);

			tsOutputData = `${tsOutputData}\n] as const;\n\n`;
			tsOutputData = `${tsOutputData}export type Scheme = typeof scheme[number];\n\n`;
			tsOutputData = `${tsOutputData}\nexport const levels = [${Array.from(Array(maxLevel + 1).keys()).join(
				', ',
			)}] as const\n\n`;
			tsOutputData = `${tsOutputData}export type Levels = typeof levels[number];\n\n`;

			infoMinor(`Generated media queries for schemes: [${schemeEntries.flatMap(([key]) => key).join(', ')}]`);
		}

		sassOutputData = `${sassOutputData}\n}\n`;

		fs.writeFileSync(`${output}.scss`, sassOutputData);

		fs.writeFileSync(`${output}.ts`, tsOutputData);

		console.log(
			`\n${chalk.bgGreen
				.hex('#000')
				.bold(' Success ')} Generated Schema for CSS tokens from ${input}:\n\n  - ${chalk.underline(
				`libs/theme/${output}.scss`,
			)}\n  - ${chalk.underline(`libs/theme/${output}.ts`)}\n`,
		);
	} catch (err) {
		console.warn('Failed Error', err);
	}
};

load();
