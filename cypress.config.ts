import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "1jzizx",
  fixturesFolder: "./tests/fixtures",
  screenshotsFolder: "./tests/screenshots",
  downloadsFolder: "./tests/downloads",
  videosFolder: "./tests/videos",
  e2e: {
    baseUrl: "http://localhost:3000/#/",
    specPattern: "tests/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "tests/support/e2e.{js,jsx,ts,tsx}",
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    supportFile: "tests/support/component.{js,jsx,ts,tsx}",
    indexHtmlFile: "./tests/support/component-index.html",
    specPattern: "tests/components/**/*.cy.{js,jsx,ts,tsx}",
  },
});
