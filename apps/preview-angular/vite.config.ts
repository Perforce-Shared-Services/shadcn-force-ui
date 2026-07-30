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
  plugins: [angular(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: { port: 3003, cors: true },
  appType: "spa",
})
