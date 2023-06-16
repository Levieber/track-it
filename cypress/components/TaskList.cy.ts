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
});
