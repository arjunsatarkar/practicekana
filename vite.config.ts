import { defineConfig, PluginOption } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { compression } from 'vite-plugin-compression2'
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import license from "vite-plugin-license";
import path from "node:path";

const APP_HOME = "https://practicekana.arjunsatarkar.net/"

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
    }),
    handlebarsPlugin({
      partialsDirectoryPath: "partials",
      // Despite the name, seems to work fine for multi-page apps
      transformIndexHtmlOptions: {
        context: () => ({
          app_home: APP_HOME
        })
      }
    }) as PluginOption
  ],
  define: {
    __APP_HOME__: JSON.stringify(APP_HOME),
    __SOURCE_REPO__: JSON.stringify("https://github.com/arjunsatarkar/practice_kana_words")
  },
})
