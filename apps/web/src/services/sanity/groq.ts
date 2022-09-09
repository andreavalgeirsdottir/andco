export type GROQQuery<Params extends object = { [key: string]: unknown }> = {
	query: string;
	params?: Params;
};

export const blockGroq = <Params extends object = { [key: string]: unknown }>({
	query,
	params,
}: {
	query: string;
	params?: Params;
}): GROQQuery => ({
	query,
	params: params || {},
});
