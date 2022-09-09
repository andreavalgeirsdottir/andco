export type Link = {
	slug: string;
	title: string;
};

export type LevelGroup = {
	_type: 'level';
	title?: string;
	items?: LinksOrLevelsGroup[];
};

export type LinksOrLevelsGroup = Link | LevelGroup;

export function hrefFromLink(item: Link): string {
	return item.slug;
}
