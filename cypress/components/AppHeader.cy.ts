import AppHeader from "@src/components/AppHeader.vue";

describe("<AppHeader/>", () => {
	it("should be change the theme properly", () => {
		const buttonText = "ativar modo";

		cy.mount(AppHeader);

		cy.get("button").as("theme-button");

		cy.get("@theme-button").click();

		cy.get("@theme-button").contains(`${buttonText} escuro`, {
			matchCase: false,
		});

		cy.get(":root").as("theme-element");

		cy.get("@theme-element").should("have.attr", "data-theme", "light");

		cy.get("@theme-button").click();

		cy.get("@theme-button").contains(`${buttonText} claro`, {
			matchCase: false,
		});

		cy.get("@theme-element").should("have.attr", "data-theme", "dark");
	});
});
