import { render } from '@testing-library/react';

import { sanityImageFixture } from '@web/services/sanity/__fixtures__/image.fixture';

import { SanityImage } from './sanity-image';

describe('SanityImage', () => {
	it('should render successfully', () => {
		const { baseElement } = render(
			<SanityImage
				image={sanityImageFixture}
			/>,
		);
		expect(baseElement).toBeTruthy();
	});
});
