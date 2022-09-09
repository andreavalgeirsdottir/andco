import isObject from 'lodash/isObject';
import { NextApiRequest, NextApiResponse } from 'next';

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	try {
		return res.status(200).json({});
	} catch (error) {
		console.error('Error: %s', error);

		if (isObject(error)) {
			return res.status(500).json({ error: 'Bad request', message: error });
		}

		return res.status(500).json({ error, message: error.message });
	}
}

export default handle;
