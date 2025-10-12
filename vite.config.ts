import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
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
