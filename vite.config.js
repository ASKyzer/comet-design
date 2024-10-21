import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "comet.js"),
        nested: resolve(__dirname, "./src/comet.css"),
      },
      output: {
        entryFileNames: `comet.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
