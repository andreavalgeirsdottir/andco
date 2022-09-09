import { render } from '@testing-library/react';

import { getMediaFixture } from '@web/services/sanity/__fixtures__/media.fixture';

import { Media } from './media';

describe('Media', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<Media media={getMediaFixture()} />);
		expect(baseElement).toBeTruthy();
	});
});
