import React, { createContext, useContext } from 'react';

import { ProjectedGlobalComponents } from '@web/services/sanity/queries/global_components';
import { ProjectedGlobalSettings } from '@web/services/sanity/queries/global_settings';
import { TemplateKey, TemplateMap } from '@web/templates';

interface PageContextProps {
	pageData: TemplateMap[TemplateKey];
	children: React.ReactNode;
}

export const PageContext = createContext<{
	pageData: TemplateMap[TemplateKey];
}>({} as PageContextProps);

/**
 * @see {@link PageContextProps}
 */
export function usePageContext() {
	const context = useContext(PageContext);

	return context;
}

export function PageContextProvider({ pageData, children }: PageContextProps) {
	return <PageContext.Provider value={{ pageData }}>{children}</PageContext.Provider>;
}

interface GlobalContextProps {
	globalSettings: ProjectedGlobalSettings;
	globalComponents: ProjectedGlobalComponents;
	children: React.ReactNode;
}

export const GlobalContext = createContext<{
	globalSettings: ProjectedGlobalSettings;
	globalComponents: ProjectedGlobalComponents;
}>({} as GlobalContextProps);

/**
 * @see {@link GlobalContextProps}
 */
export function useGlobalContext() {
	const context = useContext(GlobalContext);

	return context;
}

export function GlobalContextProvider({ globalComponents, globalSettings, children }: GlobalContextProps) {
	return (
		<GlobalContext.Provider value={{ globalComponents, globalSettings }}>{children}</GlobalContext.Provider>
	);
}
