/* eslint-disable max-len */
import { execSync } from 'child_process';
import ejs from 'ejs';
import fs from 'fs';
import replace from 'replace-in-file';

import { cliPrompt } from '../../../utils/cli/src/lib/cli-prompt.mjs';
import {
	error,
	fsWrite,
	infoMinor,
	oraSpinner,
	success,
	successMinor,
	toCamelCase,
	toPascalCase,
	toSnakeCase,
	toTitleCase,
} from '../../../utils/cli/src/lib/helpers.mjs';
import { template as reactFixtureTemplate } from './templates/react_component.fixture.mjs';
import { template as reactTemplate } from './templates/react_component.mjs';
import { template as reactScssTemplate } from './templates/react_component.scss.mjs';
import { template as reactStorybookTemplate } from './templates/react_component.storybook.mjs';
import { template as sanitySchemaTemplate } from './templates/sanity_schema_object.mjs';

const schemaTypePaths = {
	block: 'blocks',
	object: 'objects',
	document: 'documents',
};

const schemaTypes = {
	block: 'object',
	object: 'object',
	document: 'document',
};

const load = async () => {
	try {
		const cli = await cliPrompt({
			flags: {
				schemaType: {
					type: 'string',
					required: true,
					description: 'Enter the Sanity Schema Type (block/object/document)',
					default: 'block',
					pattern: /block|object|document$/,
					message: 'The schema type must either be block, object or document',
				},
				blockName: {
					type: 'string',
					required: true,
					description: 'Enter the name of the block/object/document (eg. hero)',
				},
				blockPath: {
					type: 'string',
					required: true,
				},
				contentBlockComponentPath: {
					type: 'string',
				},
				contentBlockSchemaPath: {
					type: 'string',
				},
				addToContentBlock: {
					type: 'string',
					required: true,
					description: 'Do you want to add the block to the Content Block Sanity schema and Component?',
					pattern: /yes|y|no|n$/,
					default: 'yes',
					message: 'You must enter either yes|y or no|n',
				},
				studioSchemasPath: {
					type: 'string',
					required: true,
				},
				skipStudioTypeGeneration: {
					type: 'boolean',
					default: false,
				},
				args: {
					type: 'string',
				},
				help: {
					type: 'boolean',
				},
				dry: {
					type: 'boolean',
				},
			},
			help: `Usage
$ generateSanityModule

Options
--blockName The name of the Block
--blockPath The path to blocks components folder (e.g. "apps/web/src/blocks")
--studioSchemasPath The path to Sanity Studio Schemas folder (e.g. "apps/studio/src/schemas")
--help Show help

Examples
$ generateSanityModule
$ generateSanityModule --blockPath=apps/web/src/blocks --studioSchemasPath=apps/studio/src/schemas`,
		});

		const [] = cli.input || [''];

		const {
			dry,
			dev,
			schemaType: schemaTypeFlag,
			blockName: blockNameFlag,
			blockPath: blockPathFlag,
			studioSchemasPath: studioSchemasPathFlag,
			skipStudioTypeGeneration: skipStudioTypeGenerationFlag,
			contentBlockComponentPath: contentBlockComponentPathFlag,
			contentBlockSchemaPath: contentBlockSchemaPathFlag,
			addToContentBlock: addToContentBlockFlag,
		} = cli.flags;

		const schemaType = schemaTypes[schemaTypeFlag];
		const schemaTypePascal = toPascalCase(schemaTypeFlag);
		const schemaTypePath = schemaTypePaths[schemaTypeFlag];
		const blockNameFlagTitle = toTitleCase(blockNameFlag);
		const blockNameFlagPascal = toPascalCase(blockNameFlagTitle);
		const blockNameType = `${blockNameFlagTitle} ${schemaTypePascal}`;
		const blockNameTypeSnake = toSnakeCase(blockNameType);
		const blockNameTypePascal = toPascalCase(blockNameType);
		const blockNameTypeCamel = toCamelCase(blockNameType);

		const templateProps = {
			blockNameFlag,
			blockNameFlagPascal,
			blockNameFlagTitle,
			blockNameType,
			blockNameTypeCamel,
			blockNameTypePascal,
			blockNameTypeSnake,
			schemaType,
			schemaTypeFlag,
		};

		const studioSchemasBlocksIndexPath = `${studioSchemasPathFlag}/${schemaTypePath}/index.ts`;
		const studioSchemasBlocksImport = `import ${blockNameTypeCamel} from './${blockNameTypeSnake}';`;
		const blockPath = `${blockPathFlag}/${blockNameTypeSnake}`;

		if (dry) {
			console.log('Template names:', templateProps);
		}

		const componentTemplatePath = `${blockPath}/${blockNameTypeSnake}.tsx`;
		const componentTemplateScssPath = `${blockPath}/${blockNameTypeSnake}.module.scss`;
		const componentStorybookTemplatePath = `${blockPath}/${blockNameTypeSnake}.stories.tsx`;
		const componentFixtureTemplatePath = `${blockPath}/${blockNameTypeSnake}.fixture.ts`;

		//
		// Block Component
		//
		if (blockPathFlag && schemaTypeFlag === 'block') {
			// Write the React Component for the Block
			const componentTemplate = ejs.render(reactTemplate, templateProps);
			if (dry) {
				infoMinor(`Dry: Would write to: ${componentTemplatePath}`, componentTemplate);
			} else {
				fsWrite(`${componentTemplatePath}`, componentTemplate);
				successMinor(`Created/updated the React Sanity Block (@see ${componentTemplatePath})`);
			}

			// Write the React Component for the Block
			const componentTemplateScss = ejs.render(reactScssTemplate, templateProps);
			if (dry) {
				infoMinor(`Dry: Would write to: ${componentTemplateScssPath}`, componentTemplateScss);
			} else {
				fsWrite(componentTemplateScssPath, componentTemplateScss);
				successMinor(`Created/updated the React Sanity SCSS (@see ${componentTemplateScssPath})`);
			}

			// Write the Storybook Component for the Block
			const componentStorybookTemplate = ejs.render(reactStorybookTemplate, templateProps);
			if (dry) {
				infoMinor(`Dry: Would write to: ${componentStorybookTemplatePath}`, componentStorybookTemplate);
			} else {
				fsWrite(`${componentStorybookTemplatePath}`, componentStorybookTemplate);
				successMinor(`Created/updated the Storybook Sanity Block (@see ${componentStorybookTemplatePath})`);
			}

			// Write the Storybook Component for the Block
			const componentFixtureTemplate = ejs.render(reactFixtureTemplate, templateProps);
			if (dry) {
				infoMinor(`Dry: Would write to: ${componentFixtureTemplatePath}`, componentFixtureTemplate);
			} else {
				fsWrite(`${componentFixtureTemplatePath}`, componentFixtureTemplate);
				successMinor(`Created/updated the Storybook Fixture (@see ${componentFixtureTemplatePath})`);
			}

			//
			// Content Block
			//
			if (
				(addToContentBlockFlag === 'y' || addToContentBlockFlag === 'yes') &&
				contentBlockComponentPathFlag &&
				contentBlockSchemaPathFlag
			) {
				if (contentBlockComponentPathFlag) {
					const from1 =
						"import { AccordionBlock } from '@apps/web/src/blocks/accordion_block/accordion_block';";

					const to1 = `${from1}\nimport { ${blockNameTypePascal} } from '@apps/web/src/blocks/${blockNameTypeSnake}/${blockNameTypeSnake}';`;
					const from2 = '| typeof AccordionBlock';
					const to2 = `${from2}\n	| typeof ${blockNameTypePascal}`;
					const from3 = 'accordionBlock: AccordionBlock,';
					const to3 = `${from3}\n	${blockNameTypeCamel}: ${blockNameTypePascal},`;

					if (dry) {
						infoMinor(`Dry: Would write to: ${contentBlockComponentPathFlag}`, to1);
						infoMinor(`Dry: Would write to: ${contentBlockComponentPathFlag}`, to2);
						infoMinor(`Dry: Would write to: ${contentBlockComponentPathFlag}`, to3);
					} else {
						replace.sync({
							files: contentBlockComponentPathFlag,
							from: from1,
							to: to1,
						});
						replace.sync({
							files: contentBlockComponentPathFlag,
							from: from2,
							to: to2,
						});
						replace.sync({
							files: contentBlockComponentPathFlag,
							from: from3,
							to: to3,
						});
					}

					successMinor(
						`Added the ${blockNameTypePascal} to the Content Block Component (@see ${studioSchemasBlocksIndexPath})`,
					);
				}

				if (contentBlockSchemaPathFlag) {
					const from = '] as const;';

					const to = `	{
		type: '${blockNameTypeCamel}',
	},
${from}`;

					if (dry) {
						infoMinor(`Dry: Would write to: ${contentBlockSchemaPathFlag}`, to);
					} else {
						// Add the import to the index file
						replace.sync({
							files: contentBlockSchemaPathFlag,
							from,
							to,
						});
					}

					successMinor(
						`Added the ${blockNameTypePascal} to the Content Block Schema (@see ${contentBlockSchemaPathFlag})`,
					);
				}
			}
		}

		const sanityTemplatePath = `${studioSchemasPathFlag}/${schemaTypePath}/${blockNameTypeSnake}.ts`;

		//
		// Sanity Studio Schemas
		//
		if (studioSchemasPathFlag) {
			// Write the Sanity Schema for the Block
			const sanityTemplate = ejs.render(sanitySchemaTemplate, templateProps);

			if (dry) {
				infoMinor(`Dry: Would write to: ${sanityTemplatePath}`, sanityTemplate);
			} else {
				fsWrite(`${sanityTemplatePath}`, sanityTemplate);

				// Import the new schema if it doesn't already exist
				if (!fs.readFileSync(studioSchemasBlocksIndexPath, 'utf8').includes(studioSchemasBlocksImport)) {
					// Add the import to the index file
					replace.sync({
						files: studioSchemasBlocksIndexPath,
						from: /import/,
						to: `${studioSchemasBlocksImport}\nimport`,
					});

					// Add the export to the index file
					replace.sync({
						files: studioSchemasBlocksIndexPath,
						from: /export default \[/,
						to: `export default [${blockNameTypeCamel}, `,
					});
					successMinor(
						`Added the ${schemaTypePascal} to the Sanity Schema (@see ${studioSchemasBlocksIndexPath})`,
					);
				} else {
					successMinor(
						`Did nothing - The ${schemaTypePascal} was already added to the Sanity Schema (@see ${studioSchemasBlocksIndexPath})`,
					);
				}
			}

			if (!skipStudioTypeGenerationFlag && !dry) {
				console.log('');
				const spinner = oraSpinner('  Generating the Sanity Studio Type...').start();

				execSync('yarn nx run studio-types:generate_schema');

				spinner.succeed();

				successMinor('Updated the Sanity Studio Types');
			}

			successMinor(`Created/updated the Sanity Schema (@see ${sanityTemplatePath})`);
		}

		success('Generated your new module', [
			studioSchemasBlocksIndexPath,
			blockPath,
			sanityTemplatePath,
			contentBlockComponentPathFlag,
			contentBlockSchemaPathFlag,
		]);

		if (!dev) {
			process.exit(0);
		}
	} catch (err) {
		error(err);
		process.exit(1);
	}
};

load();
