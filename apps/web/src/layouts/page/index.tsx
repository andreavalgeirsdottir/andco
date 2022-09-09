import { SkipToMainContent } from '@noa/ui';

import { Footer } from '@web/components/footer/footer';
import { Header } from '@web/components/header/header';
import { TemplateKey, TemplateMap } from '@web/templates';

import { PageContextProvider } from './context';
import { SeoTags } from './seo-tags';

interface PageProps<T extends TemplateKey = TemplateKey> {
	pageData: TemplateMap[T];
	children: React.ReactNode;
}

export default function Page({ pageData, children }: PageProps) {
	return (
		<PageContextProvider pageData={pageData}>
			<SeoTags />
			<SkipToMainContent />
			<Header />
			<main role={'main'} id={SkipToMainContent.mainContentId}>
				{children}
			</main>
			<Footer />
		</PageContextProvider>
	);
}
