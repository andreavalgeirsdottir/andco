import { render } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
	it('should render successfully', async () => {
		const { baseElement } = render(<Button/>);
		expect(baseElement).toBeTruthy();
	});

	it('should call onClick when clicked', async () => {
		const callback = jest.fn();
		const { findByTestId } = render(<Button data-testid="button" onClick={callback} />);
		expect(callback).toBeCalledTimes(0);

		const button = await findByTestId('button');
		button.click();
		expect(callback).toBeCalledTimes(1);
	});
});
