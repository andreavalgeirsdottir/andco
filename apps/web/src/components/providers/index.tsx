import React, { ReactNode } from 'react';

import { PortalProvider } from '@noa/ui';

import { ReactResponsiveProvider } from '@apps/web/src/components/providers/react-responsive';
import { ReactQueryProvider } from '@web/components/providers/react-query';
import { RecoilProvider } from '@web/components/providers/recoil';

type Props = { children: ReactNode };

const Providers = ({ children }: Props) => {
	return (
		<RecoilProvider>
			<ReactQueryProvider>
				<ReactResponsiveProvider>
					<PortalProvider>{children}</PortalProvider>
				</ReactResponsiveProvider>
			</ReactQueryProvider>
		</RecoilProvider>
	);
};

export default Providers;
