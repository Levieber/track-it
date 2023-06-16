import "@cypress/code-coverage/support";
import "./commands";
import "@src/style.css";

import { mount } from "cypress/vue";

import { routes } from "@src/routes";
import { createRouter, createWebHashHistory } from "vue-router";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", (component, options = {}) => {
  options.global = options.global || {};
  options.global.plugins = options.global.plugins || [];
  options.global.plugins.push(
    createRouter({
      routes,
      history: createWebHashHistory(),
    })
  );

  return mount(component, {
    global: {
      plugins: options.global.plugins,
      ...options.global,
    },
    ...options,
  });
});
