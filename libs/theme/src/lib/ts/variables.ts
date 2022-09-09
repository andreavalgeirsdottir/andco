import { entries, KeyOf } from '@noa/utils-common';

import { variables } from '../../generated/variables.web';

export type Variables = typeof variables;
export type VariableKeys = keyof Variables;

/**
 * @returns The CSS variable
 *
 * The available CSS variables from the `theme/src/lib/variables.scss` file.
 *
 *  @see {@link variables}
 *
 * @example
 * ```tsx
 * const black = variablesValue['--c-on-level0']; // var(--c-on-level0);
 * ```
 */
export const variablesVars = entries(variables).reduce((vars, [key]) => {
	return { ...vars, [key]: `var(${key})` };
}, {} as Variables);

export type VariableKey<U extends VariableKeys = VariableKeys> = KeyOf<Variables, U>;
