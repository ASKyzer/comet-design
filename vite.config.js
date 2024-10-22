import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "comet.js"),
      formats: ["es"],
    },
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
  assetsInclude: ["**/*.svg"],
  plugins: [
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
