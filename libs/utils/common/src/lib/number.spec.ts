import { randomRange } from './number';

describe('Number', () => {
	it('randomRange', async () => {
		expect(randomRange(0, 0)).toEqual(0);
		expect(randomRange(100, 100)).toEqual(100);
		expect(randomRange(0, 100)).toBeGreaterThanOrEqual(0);
		expect(randomRange(0, 100)).toBeLessThanOrEqual(100);
	});
});
