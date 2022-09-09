import React, { ReactNode, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import { setColorScheme } from '@noa/theme';

type Props = { children: ReactNode };

export const RecoilProvider = ({ children }: Props) => {
	return (
		<RecoilRoot>
			<Effect>{children}</Effect>
		</RecoilRoot>
	);
};

const Effect = ({ children }: Props) => {
	useEffect(() => setColorScheme('light'), []);

	return <>{children}</>;
};
