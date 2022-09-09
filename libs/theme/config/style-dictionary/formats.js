const { fileHeader } = require('style-dictionary/lib/common/formatHelpers');
const StyleDictionary = require('style-dictionary');

const jsonFlat = function({ dictionary, prefix }) {
	return `{\n${dictionary.allTokens
		.map((token) => {
			return `  "${prefix || ''}${token.name}": ${JSON.stringify(token.value)}`;
		})
		.join(',\n')}\n}`;
};

StyleDictionary.registerFormat({
	name: 'javascript/css-variable-names',
	formatter({ dictionary, options, file }) {
		const variableName = options?.variableName || 'variables';

		return `${fileHeader({ file })}export const ${variableName} = ${jsonFlat({
			dictionary,
			prefix: '--',
		})} as const;`;
	},
});

StyleDictionary.registerFormat({
	name: 'javascript/react-native',
	formatter({ dictionary, options, file }) {
		const variableName = options?.variableName || 'variables';

		return `${fileHeader({ file })}export const ${variableName} = ${jsonFlat({ dictionary })} as const;`;
	},
});
