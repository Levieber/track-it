import { createTestingPinia } from "@pinia/testing";
import TaskList from "@src/screens/Tasks/patterns/TaskList.vue";
import { Task } from "@src/types/Task";

describe("<TaskList />", () => {
  it("should render a feedback when not have a task", () => {
    cy.mount(TaskList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              task: {
                tasks: [],
              },
            },
          }),
        ],
      },
    });

    const feedbackText = "você não está muito produtivo hoje";

    cy.data("create-task-link").should("be.visible").contains("criar tarefa", {
      matchCase: false,
    });

    cy.get("li").should("have.length", 1).contains(feedbackText, {
      matchCase: false,
    });
  });

  it("should render the tasks properly", () => {
    cy.fixture<Task[]>("tasks").then((tasks) => {
      cy.mount(TaskList, {
        global: {
          plugins: [
            createTestingPinia({
              createSpy: cy.spy,
              initialState: {
                task: {
                  tasks,
                },
              },
            }),
          ],
        },
      });

      cy.data("create-task-link").should("be.visible").contains("criar tarefa", {
        matchCase: false,
      });

      cy.get("li").should("have.length", tasks.length);
    });
  });

  it("should no render the search input when not have tasks", () => {
    cy.mount(TaskList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              task: {
                tasks: [],
              },
            },
          }),
        ],
      },
    });

    cy.data("search-task").should("not.exist");
  });

  it("should filter the task properly", () => {
    cy.mount(TaskList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            initialState: {
              task: {
                tasks: [
                  {
                    id: "1",
                    title: "Make a about page",
                    time: 150,
                  },
                  {
                    id: "2",
                    title: "Make a contact page",
                    time: 150,
                  },
                  {
                    id: "3",
                    title: "Study the test pyramid",
                    time: 150,
                  },
                ],
              },
            },
          }),
        ],
      },
    });

    cy.data("search-task").as("searchInput");

    cy.get("@searchInput").should("be.visible");

    cy.get("@searchInput").type("make");

    cy.get("li").should("have.length", 2);
  });
});
