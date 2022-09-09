export const NAVIGATE_WAIT = 150;

describe('Desktop', () => {
	beforeEach(() => cy.viewport('macbook-13').visit('/'));

	it('Can render /', () => {
		cy.get('#__next');
		cy.wait(1000).testId('block_heroBlock').contains('A good starting point', { matchCase: false });
	});

	describe('Navigation', () => {
		describe('Header', () => {
			it('Home', () => {
				cy.testId('header').find('li').contains('Get started', { matchCase: false }).click();
				cy.testId('header')
					.find('ul[data-only-links="true"]')
					.contains('Get started', { matchCase: false })
					.click();
				cy.wait(NAVIGATE_WAIT)
					.testId('block_heroBlock')
					.contains('A good starting point', { matchCase: false });
			});
			describe('News', () => {
				it('News', () => {
					cy.testId('header').find('li').contains('News', { matchCase: false }).click();
					cy.testId('header')
						.find('ul[data-only-links="true"]')
						.contains('All news', { matchCase: false })
						.click();
					cy.wait(NAVIGATE_WAIT).testId('block_listBlock').contains('News', { matchCase: false });
				});
			});
			describe('Logo', () => {
				it('Logo go home', () => {
					cy.testId('header').find('[data-testid="logo"]').click();
					cy.url().should('eq', `${Cypress.config().baseUrl}/`);
				});
			});
		});
		describe('Footer', () => {
			describe('Home', () => {
				it('Home', () => {
					cy.testId('footer')
						.find('li')
						.contains('Get started')
						.parent()
						.contains('Get started', { matchCase: false })
						.click();

					cy.wait(NAVIGATE_WAIT)
						.testId('block_heroBlock')
						.contains('A good starting point', { matchCase: false });
				});
			});
		});
	});
});
