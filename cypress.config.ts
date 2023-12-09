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
    supportFile: "tests/e2e/support/setup.{js,jsx,ts,tsx}",
  },
});
