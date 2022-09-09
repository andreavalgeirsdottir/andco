import { FontFace } from '@noa/theme';

/**
	* This includes the Fonts in the Document which will make it included both Client and Server side.
	*
	* @example
	* ```tsx
import { Head, Html, Main, NextScript } from 'next/document';

import { FontDocument } from '@noa/theme';

export default function Document() {
	return (
		<Html>
			<Head>
				<FontDocument
					fonts={[
						{ src: '/fonts/EurostyleLTStd.otf' },
						{ src: '/fonts/EurostyleLTStd-Bold.otf' },
						{ src: '/fonts/EurostyleLTStd-Demi.otf' },
					]}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
	* ```
	*/
export const FontDocument = ({ fonts }: { fonts: FontFace[] }) => (
	<>
		{fonts.map((font) => {
			return <link key={font.src} href={font.src} rel="stylesheet" type="text/css" />;
		})}
	</>
);
