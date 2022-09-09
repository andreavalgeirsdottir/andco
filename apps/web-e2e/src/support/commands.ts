/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-console */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { TestIds } from '@noa/service-testing';

export {};

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
	namespace Cypress {
		interface Chainable {
			/**
			 * Custom command that returns the custom testing attribute
			 * @example cy.testId('footer')
			 */
			testId(ids: TestIds): Chainable<JQuery<Element>>;
			openMobileMenu(): Chainable<JQuery<Element>>;
		}
	}
}
Cypress.Commands.add('testId', (value) => {
	return cy.get(`[data-testid=${value}]`);
});

Cypress.Commands.add('openMobileMenu', () => {
	return cy.testId('header').find('[data-button][aria-label="Open the menu"]').click().wait(300);
});
