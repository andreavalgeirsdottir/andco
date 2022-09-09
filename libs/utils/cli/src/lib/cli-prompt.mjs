import meow from 'meow';
import prompt from 'prompt';

import { error, infoMinor } from './helpers.mjs';

/**
 * @see https://github.com/sindresorhus/meow#flags
 *
 * This includes checks for `dry` and `help` flags
 */
const handleMeow = async (input, flags, help) => {
	const flagsAsEntries = Object.entries(flags);

	const prepareFlagsForMeow = flagsAsEntries.reduce((acc, [key, value]) => {
		const flag = {};

		if (value?.type !== undefined) {
			flag.type = value.type;
		}

		if (value.requiredWhenInit) {
			if (value?.default !== undefined) {
				flag.default = value.default;
			}

			if (value?.required !== undefined) {
				flag.isRequired = true;
			}
		}

		return { ...acc, [key]: flag };
	}, {});

	const cli = meow(help, {
		importMeta: import.meta,
		flags: prepareFlagsForMeow,
	});

	if (cli?.flags?.dry) {
		infoMinor('Dry mode enabled. Nothing will be emitted\n');
	}

	if (cli?.flags?.help === true || cli?.flags?.args?.help === true) {
		cli.showHelp();
		process.exit(0);
	}

	if (input?.length > cli?.input?.length) {
		error('Too few inputs');
		cli.showHelp();
		process.exit(0);
	}

	const flagsToPrompt = flagsAsEntries.reduce((acc, [key, value]) => {
		if (value.required && !cli?.flags?.[key]) {
			return [...acc, key];
		}

		return acc;
	}, []);

	return { ...cli, flagsToPrompt };
};

/**
 * @see https://github.com/terkelg/prompts
 */
const handlePrompt = async (cli, flags) => {
	try {
		prompt.start();

		if (cli.flagsToPrompt.length > 0) {
			const flatsAsPromptProperties = cli.flagsToPrompt.reduce((acc, key) => {
				const flag = {};
				const value = flags?.[key];

				if (value?.description !== undefined) {
					flag.description = value.description;
				}

				if (value?.default !== undefined) {
					flag.default = value.default;
				}

				if (value?.pattern !== undefined) {
					flag.pattern = value.pattern;
				}

				if (value?.message !== undefined) {
					flag.message = value.message;
				}

				return { ...acc, [key]: flag };
			}, {});

			const promptResponse = await prompt.get({
				properties: flatsAsPromptProperties,
			});

			return promptResponse;
		}
	} catch (err) {
		error(err);
		process.exit(1);
	}
};

/**
 * ##### CLI Prompt
 * Combines the meow and prompt libraries to create a CLI prompt.
 *
 * @param input {string[]} - The input from the CLI
 *
 * @param flags.type {string|boolean|number} - The type of the flag
 * @param flags.required {boolean} - Whether the field is required
 * @param flags.requiredWhenInit {boolean} - Whether the field must be available when the script is initialized
 * @param flags.description {string} - The description of the field (used during `prompt`)
 * @param flags.default {string} - The default value of the field (used during `prompt`)
 * @param flags.pattern {RegExp} - The validation pattern of the field (used during `prompt`)
 * @param flags.message {string} - The message if the validation is unsuccessful (used during `prompt`)
 *
 * @param help {string} - The help message
 *
 * TODO: Multi selection is not supported yet
 *
 * @author mthines
 *
 * @version 1.0.0
 *
 * @returns {Promise<{ input: string[]; flags: Record<string, T>, unnormalizedFlags: Record<string, T>, }>}
 */
export const cliPrompt = async ({
	/**
	 * The mandatory input properties
	 */
	input,
	/**
	 * The optional flags
	 */
	flags,
	/**
	 * Help message
	 */
	help,
}) => {
	const cli = await handleMeow(input, flags, help);
	const promptFlags = await handlePrompt(cli, flags);

	return {
		input: cli.input,
		flags: { ...promptFlags, ...cli.flags },
		unnormalizedFlags: { ...promptFlags, ...cli.unnormalizedFlags },
	};
};
