/// <reference types="cypress" />

Cypress.Commands.add("data", (value: string, type: "cy" | "test" = "cy") => {
	return cy.get(`[data-${type}=${value}]`);
});

declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to select DOM element by data-cy or data-test attributes.
		 * @param type @default "cy"
		 * @example
		 * 	cy.data("example", "test")
		 * 	cy.data("example2")
		 */
		data(value: string, type?: "cy" | "test"): Chainable<JQuery<HTMLElement>>;
	}
}
