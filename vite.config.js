import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import { terser } from "rollup-plugin-terser";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "comet.js"),
        nest: resolve(__dirname, "./src/comet.css"),
      },
      output: {
        entryFileNames: `comet.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        dir: "dist",
        format: "esm",
        preserveModules: true,
        preserveEntrySignatures: "strict",
        sourcemap: true, // Generates source maps for debugging
      },
    },
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  assetsInclude: ["**/*.svg"],
  plugins: [
    resolve(),
    typescript(),
    terser(),
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
