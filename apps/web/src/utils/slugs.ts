export type RouteSlug = {
	slug: string;
} & Pick<Sanity.Schema.Page, 'options'>;
