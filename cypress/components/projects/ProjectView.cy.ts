import type { Project } from "@src/types/Project";
import { createTestingPinia } from "@pinia/testing";
import ProjectsView from "@src/screens/Projects/patterns/ProjectsView.vue";

describe("<ProjectsView />", () => {
  it("should render a feedback when not have a project", () => {
    cy.mount(ProjectsView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              project: {
                projects: [],
              },
            },
          }),
        ],
      },
    });

    const feedbackText = "Você ainda não tem um projeto, tente criar um.";

    cy.data("create-project-link").should("be.visible").contains("criar projeto", {
      matchCase: false,
    });

    cy.get("div[role='alert']").should("have.length", 1).contains(feedbackText, {
      matchCase: false,
    });
  });

  it("should render the projects properly", () => {
    cy.fixture<Project[]>("projects").then((projects) => {
      cy.mount(ProjectsView, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: cy.spy,
              initialState: {
                project: {
                  projects: projects,
                },
              },
            }),
          ],
        },
      });

      cy.data("create-project-link").should("be.visible").contains("criar projeto", {
        matchCase: false,
      });

      cy.get("tbody").find("tr").should("have.length", projects.length);
    });
  });

  it("should no render the search input when not have projects", () => {
    cy.mount(ProjectsView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              project: {
                projects: [],
              },
            },
          }),
        ],
      },
    });

    cy.data("search-project").should("not.exist");
  });

  it("should filter the projects properly", () => {
    const projects = [
      {
        name: "Vue Course",
      },
      {
        name: "Typescript Course",
      },
      {
        name: "Task Tracker",
      },
    ];

    cy.mount(ProjectsView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              project: {
                projects,
              },
            },
          }),
        ],
      },
    });

    cy.data("search-project").as("searchInput");

    cy.get("@searchInput").should("be.visible");

    cy.get("@searchInput").type("course");

    cy.get("tbody").find("tr").should("have.length", 2);
  });
});
