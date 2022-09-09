import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

/**
 * Get Parsed Query.
 * Useful if you want your function to support both a parsed and stringified query string.
 */
export const getParsedQuery = <T extends object>(query: T | string): T => {
	// If the Query is a string, we parse it as JSON
	if (isString(query)) {
		return JSON.parse(query);
	}

	// If the Query is an object, we use it as is
	return query;
};

/**
 * A query property can either be a string or an array of strings.
 * Make sure that you only get a string, so if it's an array, we return the first element.
 */
export const getQueryString = (queryProperty: string | string[] | undefined): string | undefined => {
	if (!queryProperty) return undefined;

	if (isArray(queryProperty)) {
		return queryProperty[0];
	}

	return queryProperty;
};
