export const template = `import { groq } from 'next-sanity';
import React from 'react';

import { blockGroq } from '@apps/web/src/services/sanity/groq';

import styles from './<%= blockNameTypeSnake; %>.module.scss';

export type <%= blockNameTypePascal; %>Props = {
	block: Sanity.Schema.<%= blockNameTypePascal; %>;
};

export const <%= blockNameTypePascal; %> = ({ block }: <%= blockNameTypePascal; %>Props) => {
	return (
		<div className={styles.<%= blockNameTypeCamel; %>}>
			{block.title}
		</div>
	);
};

<%= blockNameTypePascal; %>.groq = blockGroq({
	query: groq\`{
		...,
	}\`,
});
`;
