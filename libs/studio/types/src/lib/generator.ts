import fs = require('fs/promises');
import path = require('path');
import process = require('process');

import { generateSchemaTypes, schemaExtractor } from '@sanity-codegen/schema-codegen';

async function main() {
	const normalizedSchema = await schemaExtractor({
		schemaPath: require.resolve('../../../../../apps/studio/src/schemas/index'),
	});

	const typescriptSource = await generateSchemaTypes({ normalizedSchema });
	await writeTypeFile('../generated/schema.d.ts', typescriptSource);
}

async function writeTypeFile(filePath: string, source: string) {
	const formattedSource = source.replace(/ {2}/g, '\t');
	await fs.writeFile(path.join(__dirname, filePath), formattedSource);
}

main()
	.then(() => console.log('success!'))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
