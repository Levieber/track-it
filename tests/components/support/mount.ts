import { render, type RenderOptions } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "@src/routes";
import { createTestingPinia, type TestingOptions } from "@pinia/testing";

export const createMount = (options: RenderOptions = {}) => {
  return (
    component: unknown,
    { state, ...mountOptions }: RenderOptions & { state?: TestingOptions } = {},
  ) => {
    const mergedOptions = {
      ...options,
      ...mountOptions,
      global: {
        plugins: [
          createRouter({
            routes,
            history: createWebHashHistory(),
          }),
          ...(options.global?.plugins || []),
          ...(mountOptions.global?.plugins || []),
          createTestingPinia(state),
        ],
        ...(options.global || {}),
        ...(mountOptions.global || {}),
      },
    };

    return {
      user: userEvent.setup(),
      ...render(component, mergedOptions),
    };
  };
};
