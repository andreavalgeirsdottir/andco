import { NextApiRequest, NextApiResponse } from 'next';

import Config from '@apps/web/src/config';
import { seedSanity } from '@apps/web/src/services/meiliseach/indexes';

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		if (!req?.headers['authorization']?.includes(Config.MEILISEARCH_API_KEY)) {
			throw new Error('Unauthorized');
		}

		await Promise.all([seedSanity()]);

		console.info(`Seeded the MeiliSearch indexes [${Config.MEILISEARCH_HOST}]`);

		return res.status(200).json({ status: 'success' });
	} catch (error) {
		console.error('Error: %s', error);

		if (error instanceof Error) {
			return res.status(500).json({
				name: error.name,
				message: error.message,
				cause: error.cause,
			});
		}

		return res.status(500).json({ error, message: error.message });
	}
}

export default handle;
