import { StructureBuilder as S } from '@sanity/structure';
import { IconType } from 'react-icons';
import { AiOutlineCode } from 'react-icons/ai';

type Schema = {
	title: string;
	name: string;
	type: string;
	icon: IconType;
	excludeFromDeskStructure?: boolean;
};

export const schemaToDocumentItem = <T extends Schema>(schema: T[]) =>
	schema
		.filter((item) => item.excludeFromDeskStructure !== true)
		.map((item) => {
			const title = item.title || 'Schema is missing title';

			return S.listItem()
				.title(title)
				.icon(item?.icon || AiOutlineCode)
				.child(S.document().title(title).schemaType(item.name));
		});

export const schemaToDocumentListItem = <
	T extends Schema & {
		filter?: string;
	},
>(
	schema: T[],
) =>
	schema
		.filter((item) => item.excludeFromDeskStructure !== true)
		.map((item) => {
			const title = item.title || 'Schema is missing title';

			return S.listItem()
				.title(title)
				.icon(item?.icon || AiOutlineCode)
				.child(S.documentList().title(title).schemaType(item.name).filter(item.filter));
		});
