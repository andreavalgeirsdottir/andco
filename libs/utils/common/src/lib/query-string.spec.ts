import { getParsedQuery, getQueryString } from './query-string';

const testObject = {
	age: 12,
	name: 'foo',
	country: undefined,
	nestedObject: {
		age: 12,
		name: 'foo',
	},
};

const stringifiedTestObject = JSON.stringify(testObject);

describe('Query String', () => {
	it('getParsedQuery', () => {
		// `testObject` is of type Object
		expect(typeof testObject).toBe('object');

		// `stringifiedTestObject` is of type String
		expect(typeof stringifiedTestObject).toBe('string');
		expect(stringifiedTestObject).toBe('{"age":12,"name":"foo","nestedObject":{"age":12,"name":"foo"}}');

		// GetParsedQuery of `testObject` is of type Object
		expect(typeof getParsedQuery(testObject)).toBe('object');

		// GetParsedQuery of `stringifiedTestObject` is of type Object
		expect(typeof getParsedQuery(stringifiedTestObject)).toBe('object');
	});
	it('getDeepParsedQuery', () => {
		const queryPropertyAsArray = ['testA', 'testB', 'testC'];
		const queryPropertyAsString = 'testD';

		expect(getQueryString(queryPropertyAsArray)).toEqual('testA');
		expect(getQueryString(queryPropertyAsString)).toEqual('testD');
	});
});
