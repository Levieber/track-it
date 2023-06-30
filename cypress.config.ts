import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
	projectId: "1jzizx",
	e2e: {
		baseUrl: "http://localhost:3000/#/",
		setupNodeEvents(on, config) {
			codeCoverageTask(on, config);
			return config;
		},
	},
	component: {
		devServer: {
			framework: "vue",
			bundler: "vite",
		},
		setupNodeEvents(on, config) {
			codeCoverageTask(on, config);
			return config;
		},
	},
});
