import AppHeader from "@src/components/AppHeader.vue";

// It is possible to use the force option, because the input is inside a label, which activates the input when its content is clicked.

describe("<AppHeader/>", () => {
  it("should be change the theme properly", () => {
    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    cy.mount(AppHeader);

    cy.get("label").data("toggle-theme").as("toggle-theme");
    cy.get(":root").as("theme-element");

    if (isDarkTheme) {
      cy.get("@toggle-theme").should("be.checked");
      cy.get("@toggle-theme").uncheck({ force: true });
      cy.get("@toggle-theme").should("not.be.checked");
    } else {
      cy.get("@toggle-theme").should("not.be.checked");
      cy.get("@toggle-theme").check({ force: true });
      cy.get("@toggle-theme").should("be.checked");
    }

    cy.get("@theme-element").should("have.attr", "data-theme", isDarkTheme ? "light" : "dark");

    if (isDarkTheme) {
      cy.get("@toggle-theme").check({ force: true });
    } else {
      cy.get("@toggle-theme").uncheck({ force: true });
    }

    cy.get("@theme-element").should("have.attr", "data-theme", isDarkTheme ? "dark" : "light");
  });
});
