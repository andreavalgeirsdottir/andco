import fs from 'fs';

const testFolder = ['./src/lib/icon/assets'];
const outputFolder = './src/lib/icon/icons.ts';

let icons = [];

testFolder.forEach((folder) => {
	fs.readdirSync(folder).forEach((file) => {
		if (file.includes('.svg')) {
			icons.push(file.split('.')[0]);
		}
	});

	icons = [...new Set(icons)];

	let iconTypeFile = `/* eslint-disable @typescript-eslint/no-var-requires */

export const icons = {`;

	icons.forEach((icon) => {
		iconTypeFile += `\n  '${icon}': require('./assets/${icon}.svg').ReactComponent,`;
	});

	iconTypeFile = `${iconTypeFile}
};

export type Icons = keyof typeof icons;

export const iconsKey = Object.keys(icons) as Icons[];
`;

	console.log(`
Outputting icons to: "${outputFolder}"
`);

	fs.writeFileSync(outputFolder, iconTypeFile);
});
