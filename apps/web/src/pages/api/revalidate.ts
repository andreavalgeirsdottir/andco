import { isValidRequest } from '@sanity/webhook';
// import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import Config from '@apps/web/src/config';

type Data = {
	message?: string;
	revalidated?: boolean;
};

const whitelistedCallers = ['revalidate-studio'];
const secret = Config.SANITY_WEBHOOK_SECRET;

/**
 * On-demand ISR API to revalidate a page after build
 * This APi is typically called by GROQ webhook from Sanity.
 *
 * Please refer to web/README.md ## API - validate-content for more information
 *
 * TODO: Implement more secured auth
 */
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		console.error('Must be a POST request');
		return res.status(401).json({ message: 'Must be a POST request' });
	}

	const shouldAllowInternalValidator = whitelistedCallers.includes(req.headers?.caller?.toString());

	if (!isValidRequest(req, secret) && !shouldAllowInternalValidator) {
		console.error('Invalid Sanity signature');
		res.status(401).json({ message: 'Invalid Sanity signature' });
		return;
	}

	try {
		const { type, slug } = req.body;

		console.info(`Revalidation triggered for type "${type}" on page "${slug}"`);

		// We can check `type` to decide what to do specifically to a certain type too. For now, just revalidate every time the API is called
		await res.revalidate(`/${slug}`);

		return res.status(200).json({ revalidated: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send({ message: `Error revalidating ${JSON.stringify(err)}` });
	}
}

export default handler;
