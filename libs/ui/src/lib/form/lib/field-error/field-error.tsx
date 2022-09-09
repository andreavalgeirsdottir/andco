import { usePreserveString } from '@noaignite-dk/utils-next';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ControllerFieldState } from 'react-hook-form';

import { MOTIONS } from '@noa/utils-animations';

import styles from './field-error.module.scss';

export type FieldErrorProps = { className?: string } & Pick<ControllerFieldState, 'error'>;

/**
 * FieldError component
 */
export const FieldError = ({ error, className }: FieldErrorProps) => {
	const preservedError = usePreserveString(error?.message);

	return (
		<AnimatePresence>
			{error && (
				<motion.p {...MOTIONS.fade.fade} className={classNames(styles.error, className)} data-error>
					{preservedError}
				</motion.p>
			)}
		</AnimatePresence>
	);
};
