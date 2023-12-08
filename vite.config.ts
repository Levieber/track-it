import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      { find: "@tests", replacement: path.resolve(__dirname, "tests") },
    ],
  },
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
});
