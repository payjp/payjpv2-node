import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
  external: ["@hey-api/client-fetch"],
  platform: "node",
});
