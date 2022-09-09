import { AppProps } from 'next/app';

// import { useInitGtm } from '@noa/service-tracking';
import Providers from '@web/components/providers';

import './global.scss';

function CustomApp({ Component, pageProps }: AppProps) {
	// useInitGtm('GTM-key'); <-- Add GTM Key

	return (
		<Providers>
			<Component {...pageProps} />
		</Providers>
	);
}

export default CustomApp;
