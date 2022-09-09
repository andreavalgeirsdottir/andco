import React, { createContext, useContext } from 'react';

const ContentBlock = createContext<{
	columns: number;
}>({
	columns: 1,
});

export function useBlockContext() {
	const context = useContext(ContentBlock);

	return context;
}

interface ContentBlockProps {
	columns: number;
	children: React.ReactNode;
}

export function ContentBlockProvider({ columns, children }: ContentBlockProps) {
	return <ContentBlock.Provider value={{ columns }}>{children}</ContentBlock.Provider>;
}
