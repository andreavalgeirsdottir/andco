import { AnimatePresence } from 'framer-motion';

/**
 * Conditional render the `id` of the `render` `object`
 *
 * @example
 * ```tsx
type PageTypes = 'news' | 'press' | 'bla';

const Component: NextPage<Props> = ({ pageData }) => {
	const [pageType, setPageType] = useState<PageTypes>('bla');

	return (
		<RecordRender
			id={pageType}
			render={{
				bla: (
					<motion.div key="bla" {...MOTIONS.templates.left}>
						<h3>bla</h3>
						...
					</motion.div>
				),
				news: (
					<motion.div key="news" {...MOTIONS.fade}>
						<h3>news</h3>
						...
					</motion.div>
				),
				press: (
					<motion.div key="press" {...MOTIONS.fade}>
						<h3>press</h3>
						...
					</motion.div>
				),
			}}
		/>
	);
};
 * ```
 */
export const RecordRender = <T extends string | number>({
	render,
	id,
	animatePresence = true,
}: {
	render?: Record<T, React.ReactNode>;
	id: T;
	animatePresence?: boolean;
}) => {
	if (!render?.[id]) return null;

	if (!animatePresence) {
		return <>{render[id]}</>;
	}

	return <AnimatePresence exitBeforeEnter>{render[id]}</AnimatePresence>;
};
