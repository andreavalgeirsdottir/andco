import { PortableText, PortableTextMarkComponent, PortableTextReactComponents } from '@portabletext/react';
import classNames from 'classnames';

import { SanityLink } from '@web/components/sanity-link/sanity-link';
import { Link } from '@web/services/sanity/queries/objects';

import styles from './simpletext.module.scss';

export const simpleTextComponents: Partial<PortableTextReactComponents> = {
	block: {
		normal: ({ children }) => <p>{children}</p>,
		small: ({ children }) => <small>{children}</small>,
		h1: ({ children }) => <h1>{children}</h1>,
		h2: ({ children }) => <h2>{children}</h2>,
		h3: ({ children }) => <h3>{children}</h3>,
		h4: ({ children }) => <h4>{children}</h4>,
		h5: ({ children }) => <h5>{children}</h5>,
		h6: ({ children }) => <h6>{children}</h6>,
	},
	marks: {
		center: ({ children }) => <span className={styles.center}>{children}</span>,
		sup: ({ children }: { children: React.ReactNode }) => <sup>{children}</sup>,
		link: (({ children, value }: { children: React.ReactNode; value: Link }) => (
			<SanityLink link={value} children={children} />
		)) as unknown as PortableTextMarkComponent<Link>,
	},
};

export interface SimpleTextProps {
	textBlocks: Sanity.Block[];
	className?: string;
}

export function SimpleText({ textBlocks, className }: SimpleTextProps) {
	return (
		<div className={classNames(styles.block, className)}>
			<PortableText value={textBlocks} components={simpleTextComponents} />
		</div>
	);
}
