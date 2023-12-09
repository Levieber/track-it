import "@testing-library/jest-dom/vitest";
import { configure, cleanup } from "@testing-library/vue";

configure({ testIdAttribute: "data-test" });

afterEach(() => {
  cleanup();
});
