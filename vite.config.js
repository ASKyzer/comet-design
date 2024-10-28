import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { glob } from "glob";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "comet.js"),
        comet: resolve(__dirname, "./src/comet.css"),
        ...Object.fromEntries(
          glob
            .sync("src/**/*.svg")
            .map((file) => [
              file.slice(4).replace(/\.[^/.]+$/, ""),
              resolve(__dirname, file),
            ])
        ),
      },
      output: {
        entryFileNames: `comet.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".svg")) {
            return "assets/[name][extname]";
          }
          return "assets/[name][extname]";
        },
        dir: "dist",
        format: "esm",
        preserveEntrySignatures: "strict",
      },
    },
    sourcemap: false,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  assetsInclude: ["**/*.svg"],
  plugins: [
    typescript(),
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
  treeshake: {
    moduleSideEffects: false, // Ensure only used code is included, reducing the chance of conflicts
  },
});
