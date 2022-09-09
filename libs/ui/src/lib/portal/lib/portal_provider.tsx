import { ReactNode } from 'react';

import styles from './portal_provider.module.scss';

type Props = { children: ReactNode };

export const PortalProvider = ({ children }: Props) => {
	return (
		<>
			{children}
			<div id={id} className={styles['portal']} />
		</>
	);
};

const id = 'app_portal';

PortalProvider.id = id;
