export const REACT_RESPONSIVE_PROVIDER_INITIALZIED = 350;
export const NAVIGATE_WAIT = 150;

describe('Mobile', () => {
	beforeEach(() => cy.viewport('iphone-6').visit('/').wait(REACT_RESPONSIVE_PROVIDER_INITIALZIED));

	it('Can render /', () => {
		cy.get('#__next');
		cy.wait(1000).testId('block_heroBlock').contains('A good starting point', { matchCase: false });
	});

	describe('Navigation', () => {
		describe('Header', () => {
			describe('Home', () => {
				it('Home', () => {
					cy.openMobileMenu();
					cy.testId('mobile_menu').find('li').contains('Get started', { matchCase: false }).click();
					cy.testId('mobile_menu')
						.find('ul[data-only-links="true"]')
						.contains('Get started', { matchCase: false })
						.click();
					cy.wait(NAVIGATE_WAIT)
						.testId('block_heroBlock')
						.contains('A good starting point', { matchCase: false });
				});
			});

			describe('News', () => {
				it('News', () => {
					cy.openMobileMenu();
					cy.testId('mobile_menu').find('li').contains('News', { matchCase: false }).click();
					cy.testId('mobile_menu')
						.find('ul[data-only-links="true"]')
						.contains('All News', { matchCase: false })
						.click();
					cy.wait(NAVIGATE_WAIT).testId('block_listBlock').contains('News', { matchCase: false });
				});
			});
		});

		describe('Footer', () => {
			describe('Home', () => {
				it('Home', () => {
					cy.testId('footer')
						.find('li')
						.contains('Get started', { matchCase: false })
						.click()
						.parent()
						.contains('Tutorials', { matchCase: false })
						.click();

					cy.wait(NAVIGATE_WAIT)
						.testId('block_heroBlock')
						.contains('A good starting point', { matchCase: false });
				});
			});
		});
	});
});
