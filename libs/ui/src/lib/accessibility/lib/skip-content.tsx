import styles from './skip-content.module.scss';

const defaultMainContentId = 'main_content';

type Props = {
	/**
	 * The ID of the main content, excluding the skip content.
	 *
	 * @example `main-content`
	 *
	 * @fallback {@link defaultMainContentId}
	 */
	mainContentId?: string;
	title?: string;
};

export const SkipToMainContent = ({ mainContentId = defaultMainContentId, title = 'Skip to main content' }: Props) => {
	return (
		<a className={styles.skipContent} href={`#${mainContentId}`}>
			{title}
		</a>
	);
};

SkipToMainContent.mainContentId = defaultMainContentId;
