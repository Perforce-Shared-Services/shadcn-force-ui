import path from "node:path"
import angular from "@analogjs/vite-plugin-angular"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/preview/angular/",
  build: {
    assetsDir: "_assets",
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: { maxParallelFileOps: 4 },
  },
  plugins: [
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
