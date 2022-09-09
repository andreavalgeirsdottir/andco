import { render } from '@testing-library/react';

import { getMediaFixture } from '@web/services/sanity/__fixtures__/media.fixture';

import { MediaBlock } from './media-block';

describe('MediaBlock', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<MediaBlock block={getMediaFixture()} />);
		expect(baseElement).toBeTruthy();
	});
});
