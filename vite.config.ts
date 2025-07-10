import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createViteLicensePlugin } from 'rollup-license-plugin';
import { imagetools } from 'vite-imagetools';
import { name as projectName, repository } from './package.json';

const APP_HOME = "https://practicekana.arjunsatarkar.net/";

export default defineConfig({
	plugins: [
		sveltekit(),
		createViteLicensePlugin({
			includePackages: () => [__dirname]
		}),
		imagetools(),
	],
	define: {
		__APP_HOME__: JSON.stringify(APP_HOME),
		__REPO_URL__: JSON.stringify(repository.url),
		__PROJECT_NAME__: JSON.stringify(projectName),
	},
	server: {
		fs: {
			allow: ["data"]
		}
	},
});
