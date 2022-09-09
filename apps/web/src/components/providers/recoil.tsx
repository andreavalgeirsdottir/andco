import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import { useColorSchemeFromPrefersColorSchemeEffect } from '@noa/theme';

type Props = { children: ReactNode };

export const RecoilProvider = ({ children }: Props) => {
	return (
		<RecoilRoot>
			<Effect>{children}</Effect>
		</RecoilRoot>
	);
};

const Effect = ({ children }: Props) => {
	useColorSchemeFromPrefersColorSchemeEffect('light');

	return <>{children}</>;
};
