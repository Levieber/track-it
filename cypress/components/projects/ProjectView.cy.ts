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
        id: "project-1",
        name: "Vue Course",
      },
      {
        id: "project-2",
        name: "Typescript Course",
      },
      {
        id: "project-3",
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

  it("should show the quantity of the tasks in a project properly", () => {
    const project = {
      id: "project-1",
      name: "Vue 3 Course",
    };

    const tasks = [
      {
        id: "task-1",
        title: "Directives Class",
        time: 250,
        project: project.id,
      },
      {
        id: "task-2",
        title: "Attributes Binding Class",
        time: 150,
        project: project.id,
      },
    ];

    cy.mount(ProjectsView, {
      props: {
        project,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            stubActions: false,
            initialState: {
              task: {
                tasks,
              },
              project: {
                projects: [project],
              },
            },
          }),
        ],
      },
    });

    cy.data("project-tasks-quantity").should("contain.text", tasks.length);
  });
});
