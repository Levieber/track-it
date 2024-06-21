import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/vue";

configure({ testIdAttribute: "data-test" });

afterEach(() => {
  cleanup();
});
