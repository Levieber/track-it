import { defineConfig } from "vitest/config";
import vitestConfig from "./vitest.config";

export default defineConfig({
    ...vitestConfig,
    test: {
        ...vitestConfig.test,
        setupFiles: "./tests/components/support/setup.ts",
        include: ["tests/components/**/*.spec.ts"],
        environment: "jsdom"
    }
})