import type { NextApiRequest, NextApiResponse } from 'next';

import { exitPreview } from '@noa/studio-ui';

export default function exit(req: NextApiRequest, res: NextApiResponse) {
	exitPreview(req, res);
}
