import { StructureBuilder as S } from '@sanity/structure';
import type { DocumentFragmentResolveOptions } from '@sanity/structure/src/userDefinedStructure';
import { AiOutlineLock } from 'react-icons/ai';
import { GrCube, GrMultiple, GrSettingsOption } from 'react-icons/gr';
import { TbBoxMargin } from 'react-icons/tb';
import Iframe from 'sanity-plugin-iframe-pane';
import SeoPane from 'sanity-plugin-seo-pane';

import entities from '../schemas/documents/entities';
import global_components from '../schemas/documents/global_components';
import global_settings from '../schemas/documents/global_settings';
import pages from '../schemas/documents/pages';
import { schemaToDocumentItem, schemaToDocumentListItem } from '../schemas/utils/schema';
import resolvePreviewUrl from './resolvePreviewUrl';

const defaultViews = [
	S.view.form(),
	S.view.component(Iframe).options({ url: resolvePreviewUrl }).title('Preview'),
	S.view
		.component(SeoPane)
		.options({
			// Retrieve the keywords and synonyms at the given dot-notated strings
			keywords: 'seo.keywords',
			synonyms: 'seo.synonyms',
			url: resolvePreviewUrl,
		})
		.title('SEO check'),
];

export const getDefaultDocumentNode = ({ schemaType }: DocumentFragmentResolveOptions) => {
	if (['globalSettings'].includes(schemaType)) {
		return S.document();
	}

	return S.document().views(defaultViews);
};

export default () =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Settings')
				.icon(GrSettingsOption)
				.child(S.list().id('globalSettings').title('Settings').items(schemaToDocumentItem(global_settings))),
			S.listItem()
				.title('Global Components')
				.icon(GrCube)
				.child(
					S.list()
						.id('globalComponents')
						.title('Global Components')
						.items(schemaToDocumentItem(global_components)),
				),
			S.divider(),
			S.listItem()
				.title('Entities')
				.icon(TbBoxMargin)
				.child(S.list().id('entities').title('Entities').items(schemaToDocumentListItem(entities))),
			S.divider(),
			S.listItem()
				.title('Pages')
				.icon(GrMultiple)
				.child(
					S.list()
						.id('pages')
						.title('Pages')
						.items([
							...schemaToDocumentListItem(pages),
							S.listItem()
								.title('Locked Pages')
								.icon(AiOutlineLock)
								.child(
									S.documentList()
										.title('Locked Pages')
										.schemaType('page')
										.filter('_type == "page" && options.locked_slug == true'),
								),
						]),
				),
		]);
