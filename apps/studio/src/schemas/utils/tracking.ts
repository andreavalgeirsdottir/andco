export const trackingGroup = ({
	id,
	title,
	inputProps,
	booleanProps,
	..._rest
}: {
	id: string;
	title: string;
	inputProps?: Record<string, unknown>;
	booleanProps?: Record<string, unknown>;
} & Record<string, unknown>) => {
	const { options, ...rest } = _rest;

	return {
		title,
		name: id,
		type: 'object',
		options: {
			collapsed: true,
			collapsible: true,
			columns: 1,
			...((options as object) || {}),
		},
		fields: [
			{
				name: 'value',
				type: 'string',
				title,
				...inputProps,
			},
			{
				name: 'enabled',
				title: `Enable ${title}`,
				description: `Whether ${title} should be activate or not`,
				type: 'boolean',
				initialValue: true,
				...booleanProps,
			},
		],
		...rest,
	};
};
