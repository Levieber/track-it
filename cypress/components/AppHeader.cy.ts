import AppHeader from "@src/components/AppHeader.vue";

describe("<AppHeader/>", () => {
	it("should be change the theme properly", () => {
		const isDarkTheme = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const buttonText = "ativar modo";

		cy.mount(AppHeader);

		cy.get("button").as("theme-button");
		cy.get(":root").as("theme-element");

		if (isDarkTheme) {
			cy.get("@theme-button").contains(`${buttonText} claro`, {
				matchCase: false,
			});
		} else {
			cy.get("@theme-button").contains(`${buttonText} escuro`, {
				matchCase: false,
			});
		}

		cy.get("@theme-button").click();

		if (isDarkTheme) {
			cy.get("@theme-button").contains(`${buttonText} escuro`, {
				matchCase: false,
			});
		} else {
			cy.get("@theme-button").contains(`${buttonText} claro`, {
				matchCase: false,
			});
		}

		cy.get("@theme-element").should(
			"have.attr",
			"data-theme",
			isDarkTheme ? "light" : "dark",
		);

		cy.get("@theme-button").click();

		cy.get("@theme-element").should(
			"have.attr",
			"data-theme",
			isDarkTheme ? "dark" : "light",
		);
	});
});
