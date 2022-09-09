export default {
	title: 'Locked Slug',
	name: 'lockedSlugObject',
	type: 'boolean',
	description:
		"This is used to lock specific locked slugs (often necessary due to linking from Frontend) as internal links. If you're unsure what this means, then don't touch it 😅",
	initialValue: false,
};

export const showWhenLockedSlug = {
	hidden: (v) => v?.parent?.options?.locked_slug !== true,
};

export const hideWhenLockedSlug = {
	hidden: (v) => v?.parent?.options?.locked_slug === true,
};

export const readonlyWhenLockedSlug = {
	readOnly: (v) => v?.parent?.options?.locked_slug === true,
};
