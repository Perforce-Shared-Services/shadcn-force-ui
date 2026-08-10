import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import { emberPlugins } from "./src/vite-plugins/ember"

const stubsDir = path.resolve(__dirname, "src/stubs")
const registryEmberDir = path.resolve(__dirname, "../../packages/registry-ember")
const registryEmberUiDir = path.join(registryEmberDir, "ui")
const registryEmberLibDir = path.join(registryEmberDir, "lib")

const embroiderMacrosStub = {
  name: "embroider-macros-stub",
  setup(build: { onResolve: Function; onLoad: Function }) {
    build.onResolve({ filter: /^@embroider\/macros$/ }, () => ({
      path: "embroider-macros-stub",
      namespace: "embroider-macros",
    }))
    build.onLoad({ filter: /.*/, namespace: "embroider-macros" }, () => ({
      contents: `
        export function macroCondition(v) { return v; }
        export function isDevelopingApp() { return false; }
        export function isTesting() { return false; }
        export function importSync() { return {}; }
        export function getOwnConfig() { return {}; }
        export function dependencySatisfies() { return true; }
        export function getGlobalConfig() { return {}; }
        export function appEmberSatisfies() { return true; }
      `,
      loader: "js",
    }))
  },
}

export default defineConfig({
  base: "/preview/ember/",
  build: {
    assetsDir: "_assets",
    // Keep peak memory down so this build fits the Vercel build container
    // alongside the other preview builds and `next build`.
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      maxParallelFileOps: 4,
    },
  },
  plugins: [...emberPlugins(stubsDir), tailwindcss()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [embroiderMacrosStub],
    },
  },
  resolve: {
    // [FORCE-UI] more specific aliases first so "@/ember-ui", "@/ember-lib", "@/ui" and "@/lib"
    // resolve to the shared registry package instead of being swallowed by the generic
    // "@" -> src alias. "@/ui" and "@/lib" match what registry-ember/ui/**'s own files import
    // internally (e.g. sidebar.gts imports "@/ui/button" and "@/lib/utils").
    alias: [
      { find: "@/ember-ui", replacement: registryEmberUiDir },
      { find: "@/ember-lib", replacement: registryEmberLibDir },
      { find: "@/ui", replacement: registryEmberUiDir },
      { find: "@/lib", replacement: registryEmberLibDir },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
    extensions: [".mjs", ".gjs", ".js", ".mts", ".gts", ".ts", ".json"],
  },
  server: {
    port: 3003,
    cors: true,
    // [FORCE-UI] allow Vite to read files outside the app root (registry-ember package)
    fs: { allow: [path.resolve(__dirname, "../..")] },
  },
  appType: "spa",
})
