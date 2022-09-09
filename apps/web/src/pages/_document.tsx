import { Head, Html, Main, NextScript } from 'next/document';

import { FONTS } from '@noa/theme';
import { FontDocument } from '@noa/utils-next';

import { Favicon } from '@apps/web/src/components/utils/favicon';

/**
 * This is an example of a custom document with custom fonts.
 */
export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<FontDocument fonts={FONTS} />
				<Favicon />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
