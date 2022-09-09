const {
	utils: { getProjects },
} = require('@commitlint/config-nx-scopes');
const fs = require('fs');

const githubWorkflows = async (context) => {
	const ctx = context || {};
	const cwd = ctx.cwd || process.cwd();
	let projects = ['gh'];

	try {
		const workflows = fs.readdirSync(`${cwd}/.github/workflows`);

		if (workflows.length > 0) {
			return [...projects, ...workflows.map((w) => `gh:${w}`.replace('.yml', ''))];
		}

		return projects;
	} catch (err) {
		if (!err.message.includes('no such file or directory')) {
			console.error(err);
		}

		return projects;
	}
};

module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'scope-enum': async (ctx) => {
			return [
				2,
				'always',
				[
					...(await getProjects(ctx, ({ name, projectType }) => !name.includes('e2e'))),
					...(await githubWorkflows(ctx)),
				],
			];
		},
	},
};
