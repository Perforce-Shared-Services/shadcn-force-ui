import { createRequire } from "node:module"
import path from "node:path"
import angular from "@analogjs/vite-plugin-angular"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, type Plugin } from "vite"

// [FORCE-UI] registry-angular/ui/** imports packages (class-variance-authority, @radix-ng/primitives,
// @angular/*, ...) that are declared as dependencies of *this app*, not of registry-angular itself
// (it's never installed standalone). Under pnpm's strict node_modules, plain Node resolution from
// packages/registry-angular/ui/** can't see them, so resolve those bare specifiers through this
// app's own node_modules instead - via Node's real resolution algorithm (respecting "exports" maps,
// e.g. "@radix-ng/primitives/accordion") rather than a naive path-prefix alias.
function resolveRegistryDepsFromApp(): Plugin {
  const requireFromApp = createRequire(path.resolve(__dirname, "package.json"))
  const bareDeps = [
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@radix-ng/primitives",
    "@angular/core",
    "@angular/common",
    "@angular/forms",
    "@angular/platform-browser",
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

export default defineConfig({
  base: "/preview/angular/",
  build: {
    assetsDir: "_assets",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: { maxParallelFileOps: 4 },
  },
  plugins: [
    resolveRegistryDepsFromApp(),
    angular({ tsconfig: path.resolve(__dirname, "tsconfig.json") }),
    tailwindcss(),
  ],
  resolve: {
    // [FORCE-UI] more specific aliases first so "@/angular-ui" and "@/lib" resolve to the
    // shared registry package instead of being swallowed by the generic "@" -> src alias.
    // "@force-ui/preview-shell" is aliased directly to its source file (mirroring the
    // tsconfig "paths" entry) because @analogjs/vite-plugin-angular's AOT compiler only
    // fully processes .ts files it resolves through tsconfig `compilerOptions.paths` -
    // relying on plain Node/package.json "exports" resolution here left the file
    // unprocessed by esbuild's TS-stripping, so rollup couldn't see its exports.
    alias: [
      {
        find: "@/angular-ui",
        replacement: path.resolve(__dirname, "../../packages/registry-angular/ui"),
      },
      {
        find: "@/lib",
        replacement: path.resolve(__dirname, "../../packages/registry-angular/lib"),
      },
      {
        find: "@force-ui/preview-shell",
        replacement: path.resolve(__dirname, "../../packages/preview-shell/src/preview-shell.ts"),
      },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 3004, // [FORCE-UI] avoid port collision with preview-ember (3003)
    cors: true,
    // [FORCE-UI] allow Vite to read files outside the app root (registry-angular package)
    fs: { allow: [path.resolve(__dirname, "../..")] },
  },
  appType: "spa",
})
