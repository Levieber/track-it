import type { TestingOptions } from "@pinia/testing";
import type { RenderOptions } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import { routes } from "@src/routes";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/vue";
import { createRouter, createWebHashHistory } from "vue-router";

export function createMount<C>(options: RenderOptions<C> = {}) {
  return (
    component: C,
    { state, ...mountOptions }: RenderOptions<C> & { state?: TestingOptions } = {},
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
}
