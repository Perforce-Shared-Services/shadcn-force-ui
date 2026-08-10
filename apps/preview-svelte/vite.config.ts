import path from "node:path"
import { createRequire } from "node:module"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tailwindcss from "@tailwindcss/vite"
import Icons from "unplugin-icons/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import { defineConfig, type Plugin } from "vite"

// [FORCE-UI] Serve @material-symbols/svg-400 (rounded) as Svelte components via
// `~icons/ms/<basename>`. svg-400 files have no fill, so force currentColor.
const require = createRequire(import.meta.url)
const msRoundedDir = path.join(
  path.dirname(require.resolve("@material-symbols/svg-400/package.json")),
  "rounded"
)

// [FORCE-UI] packages/registry-svelte/ui/** imports packages (bits-ui, svelte, svelte-sonner, ...)
// that are declared as dependencies of *this app*, not of registry-svelte itself (it's never
// installed standalone). Under pnpm's strict node_modules, plain Node/Vite resolution from
// packages/registry-svelte/ui/** can't see them - both algorithms walk up from the *importing
// file's* directory looking for node_modules, and registry-svelte's own node_modules only has
// its own declared deps (shadcn, zod). Re-resolve those bare specifiers as if they were
// imported from this app's package.json instead, via Vite's own resolver (`this.resolve`)
// rather than a naive path-prefix alias or Node's `require.resolve` - some of these packages
// (e.g. paneforge) export only under a "svelte" conditional-exports key with no "default"
// fallback, which plain Node resolution can't satisfy but Vite's resolver can, since
// @sveltejs/vite-plugin-svelte configures `resolve.conditions: ["svelte"]`.
// See apps/preview-angular/vite.config.ts for the precedent (same underlying problem).
function resolveRegistryDepsFromApp(): Plugin {
  const appAnchor = path.resolve(__dirname, "package.json")
  const bareDeps = [
    "@internationalized/date",
    "bits-ui",
    "embla-carousel-svelte",
    "layerchart",
    "mode-watcher",
    "paneforge",
    "svelte",
    "svelte-sonner",
    "tailwind-variants",
    "vaul-svelte",
  ]
  return {
    name: "force-ui-resolve-registry-deps",
    enforce: "pre",
    async resolveId(source) {
      if (!bareDeps.some((dep) => source === dep || source.startsWith(`${dep}/`))) return null
      const resolved = await this.resolve(source, appAnchor, { skipSelf: true })
      return resolved ?? null
    },
  }
}

export default defineConfig({
  base: "/preview/svelte/",
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
    Icons({
      compiler: "svelte",
      customCollections: {
        ms: FileSystemIconLoader(msRoundedDir, (svg) =>
          svg.replace(/<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
    svelte(),
    tailwindcss(),
  ],
  resolve: {
    // [FORCE-UI] more specific aliases first so they aren't swallowed by the generic "@" ->
    // src alias. registry-svelte/ui and registry-svelte/lib are the shared component/lib
    // package; $lib/registry/hooks and $lib/components have no equivalent in registry-svelte
    // (it has no components/ dir, and the sidebar hook was never ported into the registry
    // package), so those stay local. "form" and "data-table" are UI-ish helpers that
    // registry-svelte/ui genuinely doesn't have (not just drifted - never ported), so those
    // two subpaths of @/svelte-ui stay local too; everything else under @/svelte-ui comes from
    // the registry.
    alias: [
      { find: "@/svelte-ui/form", replacement: path.resolve(__dirname, "src/svelte-ui/form") },
      {
        find: "@/svelte-ui/data-table",
        replacement: path.resolve(__dirname, "src/svelte-ui/data-table"),
      },
      {
        find: "@/svelte-ui",
        replacement: path.resolve(__dirname, "../../packages/registry-svelte/ui"),
      },
      {
        find: "$lib/registry/hooks",
        replacement: path.resolve(__dirname, "src/svelte-hooks"),
      },
      {
        find: "$lib/registry/ui",
        replacement: path.resolve(__dirname, "../../packages/registry-svelte/ui"),
      },
      {
        find: "$lib/components",
        replacement: path.resolve(__dirname, "src/svelte-components"),
      },
      // [FORCE-UI] packages/registry-svelte/lib/utils.ts is missing the WithElementRef /
      // WithoutChild / WithoutChildren / WithoutChildrenOrChild type helpers that
      // registry-svelte/ui/** imports from "$lib/utils.js" - a pre-existing gap in the
      // registry package (out of scope here). src/svelte-lib/utils.ts is a superset (same
      // `cn`, plus those types), so it stays local and both $lib/utils and @/svelte-lib
      // resolve to it.
      {
        find: /^\$lib\/utils(\.js)?$/,
        replacement: path.resolve(__dirname, "src/svelte-lib/utils"),
      },
      { find: "@/svelte-lib", replacement: path.resolve(__dirname, "src/svelte-lib") },
      { find: "@/svelte-hooks", replacement: path.resolve(__dirname, "src/svelte-hooks") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
      {
        find: "$app/environment",
        replacement: path.resolve(__dirname, "src/stubs/app-environment.ts"),
      },
      { find: "$app/stores", replacement: path.resolve(__dirname, "src/stubs/app-stores.ts") },
      {
        find: "$app/navigation",
        replacement: path.resolve(__dirname, "src/stubs/app-navigation.ts"),
      },
      { find: "$app/forms", replacement: path.resolve(__dirname, "src/stubs/app-forms.ts") },
      { find: "$app/state", replacement: path.resolve(__dirname, "src/stubs/app-state.ts") },
    ],
  },
  optimizeDeps: {
    exclude: ["sveltekit-superforms"],
  },
  server: {
    port: 3002,
    cors: true,
    // [FORCE-UI] allow Vite to read files outside the app root (registry-svelte package)
    fs: { allow: [path.resolve(__dirname, "../..")] },
  },
  appType: "spa",
})
