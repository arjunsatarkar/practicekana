import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2'
import { createViteLicensePlugin } from 'rollup-license-plugin';
import { imagetools } from 'vite-imagetools'

export default defineConfig({
	plugins: [
		sveltekit(),
		createViteLicensePlugin({
			includePackages: () => [__dirname]
		}),
		imagetools(),
		compression()
	],
	define: {
		__APP_HOME__: JSON.stringify("https://practicekana.arjunsatarkar.net/"),
		__SOURCE_REPO__: JSON.stringify("https://github.com/arjunsatarkar/practice_kana_words")
	},
	server: {
		fs: {
			allow: ["data"]
		}
	},
});
