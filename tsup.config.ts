import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/fastify.ts", "src/express.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  splitting: false,
  clean: true,
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
});
