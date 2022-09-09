import { useIsMounted } from '@noaignite-dk/utils-next';
import isNumber from 'lodash/isNumber';
import RRMediaQuery, { useMediaQuery } from 'react-responsive';
import { Param0 } from 'type-zoo/types';

type Props = {
	children: React.ReactNode;
	onlyClientSide?: boolean;
} & Param0<typeof RRMediaQuery>;

/**
 * Media Query Component extends React-Responsive's MediaQuery component.
 *
 * ### Usage
 * This example shows usage of the Breakpoint being read from the MediaQuery object itself
 *
 * #### Simple
 *
 * @example
 * ```tsx
    <MediaQuery minWidth={MediaQuery.bps['768px']}>
      {content}
    </MediaQuery>
 * ```
 *
 * #### Complex
 * This example shows usage of the Breakpoint being read from the `SCSS` file, using the `modules` feature `:export {}`
 *
 * @example
 * ##### `scss`
 * ```scss
  :export {
    bp-m: 768px;
  }
 * ```
 *
 * ##### `React`
 * ```tsx
  import styles from './styles.module.scss';

  const Component = () => (
    <MediaQuery minWidth={styles['bp-m']}>
      {content}
    </MediaQuery>
	);
 * ```
 */
export const MediaQuery = ({ children, maxWidth, maxHeight, ...rest }: Props) => {
	return (
		<RRMediaQuery
			maxWidth={isNumber(maxWidth) ? maxWidth - 1 : adjustBreakpoints(maxWidth, -1)}
			maxHeight={isNumber(maxHeight) ? maxHeight - 1 : adjustBreakpoints(maxHeight, -1)}
			{...rest}
		>
			{children}
		</RRMediaQuery>
	);
};

MediaQuery.useMediaQuery = useMediaQuery;

MediaQuery.useIsMounted = useIsMounted;

const adjustBreakpoints = (breakpoint: string, adjust: number) => {
	const rawValue = Number(breakpoint?.split('px')[0]);

	if (Number.isNaN(rawValue)) {
		return breakpoint;
	}

	return `${rawValue + adjust}px`;
};

MediaQuery.adjustBreakpoints = adjustBreakpoints;
