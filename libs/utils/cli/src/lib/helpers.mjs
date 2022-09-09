import chalk from 'chalk';
import { exec } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import camelCase from 'lodash/camelCase.js';
import snakeCase from 'lodash/snakeCase.js';
import startCase from 'lodash/startCase.js';
import ora from 'ora';

export const oraSpinner = (text, config) => ora({ text, isEnabled: true, ...config });

export const fsWrite = (path, data) => {
	const pathOnly = path.split('/').slice(0, -1).join('/');

	if (!existsSync(pathOnly)) {
		try {
			mkdirSync(pathOnly, { recursive: true });
			console.log(`\n✅ Created the directory ${pathOnly}`);
		} catch (err) {
			throw new Error('Failed creating directory', err);
		}
	}

	writeFileSync(path, data);
};

export const toSnakeCase = snakeCase;

export const toCamelCase = camelCase;
export const toPascalCase = (str) => startCase(camelCase(str)).replace(/ /g, '');

export const toTitleCase = (str) => startCase(camelCase(str));

export const success = (message, execPrettierOnPath) => {
	console.log(`\n${chalk.bgGreen.hex('#000').bold(' Success ')} ${message}\n`);

	if (execPrettierOnPath) {
		if (Array.isArray(execPrettierOnPath)) {
			execPrettierOnPath.forEach((path) => {
				exec(`prettier ${path} --write`);
			});
			return;
		}

		exec(`prettier ${execPrettierOnPath} --write`);
	}
};

export const successMinor = (string, template, ...arg) =>
	console.log(`\n✅  ${string}`, template ? `\n\n${template}\n\n` : '', ...arg);

export const error = (message) => {
	console.log(`\n${chalk.bgRed.hex('#000').bold(' Error ')} ${message}\n`);
};
export const errorMinor = (string, template, ...arg) =>
	console.log(`\n⛔️  ${string}`, template ? `\n\n${template}\n` : '', ...arg);
export const infoMinor = (string, template, ...arg) =>
	console.log(`\nℹ️  ${string}`, template ? `\n\n${template}\n` : '', ...arg);

export const titleOutput = (string) => console.log(`\n\n${string}\n`);

export const successOutput = (string) => console.log(`\n✅  ${string}`);

export const warnOutput = (string) => console.log(`\nℹ️   ${string}`);

export const errorOutput = (string) => console.log(`\n⛔️  ${string}`);
