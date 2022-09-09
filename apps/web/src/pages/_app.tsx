import { AppProps } from 'next/app';

import Providers from '@web/components/providers';

import './global.scss';

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	);
}

export default CustomApp;
