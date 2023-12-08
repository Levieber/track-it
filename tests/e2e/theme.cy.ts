describe("Theme of Application", () => {
  it("should be change the theme properly", () => {
    cy.visit("/");

    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

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

  it("should get value of localStorage", () => {
    cy.visit("/");

    const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .then((value) => {
        expect(value).to.be.null;
      });

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

    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .then((value) => {
        expect(value).to.be.equal(isDarkTheme ? "light" : "dark");
      });

    if (isDarkTheme) {
      cy.get("@toggle-theme").check({ force: true });
    } else {
      cy.get("@toggle-theme").uncheck({ force: true });
    }

    cy.get("@theme-element").should("have.attr", "data-theme", isDarkTheme ? "dark" : "light");

    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .then((value) => {
        expect(value).to.be.equal(isDarkTheme ? "dark" : "light");
      });

    cy.reload();

    cy.get("@theme-element").should("have.attr", "data-theme", isDarkTheme ? "dark" : "light");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "theme")
      .then((value) => {
        expect(value).to.be.equal(isDarkTheme ? "dark" : "light");
      });
  });
});
