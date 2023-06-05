import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import istanbul from "vite-plugin-istanbul";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		istanbul({
			include: "src/*",
			exclude: ["node_modules", "cypress/", "test/"],
			extension: [".ts", ".vue"],
			requireEnv: false,
		}),
	],
	resolve: {
		alias: [{ find: "@src", replacement: path.resolve(__dirname, "src") }],
	},
	preview: {
		port: 3000,
	},
	server: {
		port: 3000,
	},
});
