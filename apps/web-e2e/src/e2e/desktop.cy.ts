export const NAVIGATE_WAIT = 150;

describe('Desktop', () => {
	beforeEach(() => cy.viewport('macbook-13').visit('/'));

	it('Can render /', () => {
		cy.get('#__next');
	});

	describe('Header', () => {
		it('Exists', () => {
			cy.testId('header').contains("I'm the header", { matchCase: false }).should('exist');
		});
	});

	describe('Layout', () => {
		it('Exists', () => {
			cy.testId('template_layout').contains('Index', { matchCase: false }).should('exist');
		});
	});

	describe('Footer', () => {
		it('Exists', () => {
			cy.testId('footer').contains("I'm the footer", { matchCase: false }).should('exist');
		});
	});
});
