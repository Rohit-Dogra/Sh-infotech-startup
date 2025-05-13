import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    open: true,
  },
  // This ensures proper loading of assets
  base: "./",
})
