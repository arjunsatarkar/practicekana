import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import license from "vite-plugin-license";
import { compression } from 'vite-plugin-compression2'
import path from "node:path";


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    license({
      thirdParty: {
        includePrivate: true,
        includeSelf: true,
        multipleVersions: true,
        output: {
          file: path.join(__dirname, 'dist/assets', 'licenses.txt'),
        },
      },
    }),
    compression({
      include: /\.(html|xml|css|json|js|mjs|svg|yaml|yml|toml|ttf|txt)$/
    })
  ],
  define: {
    __APP_HOME__: JSON.stringify("https://practicekana.arjunsatarkar.net/"),
    __SOURCE_REPO__: JSON.stringify("https://github.com/arjunsatarkar/practice_kana_words")
  },
})
