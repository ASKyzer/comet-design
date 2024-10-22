import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Comet",
      fileName: "comet",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: /^lit/,
      output: {
        globals: {
          lit: "lit",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "comet.css") return "assets/comet.css";
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: true,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  assetsInclude: ["**/*.svg"],
  plugins: [
    cssInjectedByJsPlugin(),
    {
      name: "vite-plugin-raw-svg",
      transform(code, id) {
        if (id.endsWith(".svg?raw")) {
          const svg = fs.readFileSync(id.slice(0, -4), "utf-8");
          return `export default ${JSON.stringify(svg)}`;
        }
      },
    },
  ],
});
