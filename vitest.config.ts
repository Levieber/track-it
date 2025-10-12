import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

// @ts-expect-error - viteConfig is using Rolldown Vite
export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    clearMocks: true,
    pool: "threads",
  },
});
