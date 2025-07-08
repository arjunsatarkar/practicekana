import { canonicals } from "@arjunsatarkar/sveltekit-canonicals";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { createViteLicensePlugin } from 'rollup-license-plugin';
import { imagetools } from 'vite-imagetools';
import { name as projectName, repository } from './package.json';

import path from "path";

const APP_HOME = "https://practicekana.arjunsatarkar.net/";

export default defineConfig({
	plugins: [
		sveltekit(),
		createViteLicensePlugin({
			includePackages: () => [__dirname]
		}),
		imagetools(),
		canonicals({
			routesDir: path.resolve(__dirname, "src/routes"),
			siteUrlRoot: APP_HOME,
			trailingSlash: "always"
		})
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
