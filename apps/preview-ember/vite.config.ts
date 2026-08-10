import { createRequire } from "node:module"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"
import { emberPlugins } from "./src/vite-plugins/ember"

const stubsDir = path.resolve(__dirname, "src/stubs")
const registryEmberDir = path.resolve(__dirname, "../../packages/registry-ember")
const registryEmberUiDir = path.join(registryEmberDir, "ui")
const registryEmberLibDir = path.join(registryEmberDir, "lib")

// [FORCE-UI] registry-ember/ui/**'s directory-shaped components (button, sidebar, ...) each
// ship an index.ts holding only their cva "variants" export, with the actual component class
// in <name>/<name>.gts. A bare "@/ember-ui/<name>" (from demos) or "@/ui/<name>" (from other
// registry-ember components, e.g. sidebar.gts importing Button) would resolve to that index.ts
// via plain directory/index resolution and miss the component entirely - so route those
// specifiers straight at the component file instead of relying on index resolution.
const REGISTRY_EMBER_UI_DIRS = [
  "alert",
  "avatar",
  "badge",
  "button",
  "button-group",
  "empty",
  "field",
  "input-group",
  "item",
  "sidebar",
  "toggle",
  "toggle-group",
]

function resolveRegistryEmberUiDirs(): Plugin {
  return {
    name: "force-ui-resolve-registry-ember-ui-dirs",
    enforce: "pre",
    resolveId(source, importer) {
      // [FORCE-UI] Vite's own alias plugin runs ahead of this "pre" plugin and hands off the
      // already-aliased absolute directory path (e.g. ".../registry-ember/ui/sidebar") rather
      // than the original "@/ember-ui/sidebar" specifier, so match on both forms.
      const bareMatch = /^@\/(?:ember-ui|ui)\/([a-z-]+)$/.exec(source)
      const name =
        bareMatch?.[1] ??
        (path.dirname(source) === registryEmberUiDir ? path.basename(source) : undefined)
      if (name && REGISTRY_EMBER_UI_DIRS.includes(name)) {
        return path.join(registryEmberUiDir, name, `${name}.gts`)
      }
      // [FORCE-UI] pagination.gts still imports `./button.gts` as a sibling, a relative path
      // left stale when button.gts moved into its own ui/button/ directory.
      const relativeMatch = /^\.\/([a-z-]+)\.gts$/.exec(source)
      if (
        relativeMatch &&
        REGISTRY_EMBER_UI_DIRS.includes(relativeMatch[1]) &&
        importer &&
        path.dirname(importer) === registryEmberUiDir
      ) {
        return path.join(registryEmberUiDir, relativeMatch[1], `${relativeMatch[1]}.gts`)
      }
      return null
    },
  }
}

// [FORCE-UI] registry-ember/ui/** and lib/** import packages (class-variance-authority,
// ember-modifier, ember-truth-helpers, ...) that are declared as dependencies of *this app*,
// not of registry-ember itself (it's never installed standalone). Under pnpm's strict
// node_modules layout, plain Node resolution from packages/registry-ember/** can't see them,
// so resolve those bare specifiers through this app's own node_modules instead - via Node's
// real resolution algorithm (respecting "exports" maps, e.g. subpath imports) rather than a
// naive path-prefix alias.
function resolveRegistryDepsFromApp(): Plugin {
  const requireFromApp = createRequire(path.resolve(__dirname, "package.json"))
  const bareDeps = [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "tracked-built-ins",
    "ember-modifier",
    "ember-provide-consume-context",
    "ember-truth-helpers",
    "ember-click-outside",
    "@glimmer/component",
    "@glimmer/tracking",
    "@floating-ui/dom",
  ]
  return {
    name: "force-ui-resolve-registry-deps",
    enforce: "pre",
    resolveId(source) {
      if (!bareDeps.some((dep) => source === dep || source.startsWith(`${dep}/`))) return null
      try {
        return requireFromApp.resolve(source)
      } catch {
        return null
      }
    },
  }
}

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
  plugins: [
    resolveRegistryDepsFromApp(),
    resolveRegistryEmberUiDirs(),
    ...emberPlugins(stubsDir),
    tailwindcss(),
  ],
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
