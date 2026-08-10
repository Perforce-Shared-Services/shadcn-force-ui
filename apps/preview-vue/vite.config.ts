import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import vue from "@vitejs/plugin-vue"
import svgLoader from "vite-svg-loader"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/preview/vue/",
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
  // [FORCE-UI] Render @material-symbols/svg-400 SVGs as Vue components (?component).
  // svg-400 files have no fill + fixed 48px size; force currentColor and drop the
  // hard dimensions so className/font-size controls sizing.
  plugins: [
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false } },
          },
          { name: "removeDimensions" },
          {
            name: "addAttributesToSVGElement",
            params: { attributes: [{ fill: "currentColor" }] },
          },
        ],
      },
    }),
    vue(),
    tailwindcss(),
  ],
  resolve: {
    // [FORCE-UI] more specific aliases first so "@/ui" and "@/lib" resolve to the shared
    // registry package instead of being swallowed by the generic "@" -> src alias. "@/ui" and
    // "@/lib" match what registry-vue/ui/**'s own files import internally (e.g. Input.vue
    // imports "@/lib/utils"). "@/components" stays pointed at this app's src/components since
    // registry-vue has no components/ directory of its own.
    alias: [
      { find: "@/ui", replacement: path.resolve(__dirname, "../../packages/registry-vue/ui") },
      { find: "@/lib", replacement: path.resolve(__dirname, "../../packages/registry-vue/lib") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 3001,
    cors: true,
    // [FORCE-UI] allow Vite to read files outside the app root (registry-vue package)
    fs: { allow: [path.resolve(__dirname, "../..")] },
  },
  appType: "spa",
})
