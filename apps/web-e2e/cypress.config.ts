import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

const cypressJsonConfig = {
	fileServerFolder: '.',
	fixturesFolder: './src/fixtures',
	video: true,
	videosFolder: '../../dist/cypress/apps/web-e2e/videos',
	screenshotsFolder: '../../dist/cypress/apps/web-e2e/screenshots',
	chromeWebSecurity: false,
	blockHosts: ['www.googletagmanager.com/gtag/', 'policy.app.cookieinformation.com'],
	specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
	supportFile: 'src/support/e2e.ts',
};
export default defineConfig({
	e2e: {
		...nxE2EPreset(__dirname),
		...cypressJsonConfig,
	},
});
