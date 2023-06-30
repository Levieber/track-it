import { Task as CreateTask } from "@src/types/Task";

Cypress.Commands.add("createTask", (task) => {
  cy.clock();

  if (task.title) {
    cy.data("create-task").type(task.title);
  }

  cy.data("start-timer").click();

  cy.tick(task.time * 1000);

  cy.data("stop-timer").click();

  cy.data("save-task-button").click();
});

Cypress.Commands.add("editTask", (newContent) => {
  if (newContent.time) {
    cy.clock();
    cy.data("start-timer").click();
    cy.tick(newContent.time * 1000);
    cy.data("stop-timer").click();
  }

  if (newContent.title) {
    cy.data("edit-task").clear().type(newContent.title);
  }

  cy.data("save-task-button").click();
});

Cypress.Commands.add("data", (value, type = "cy") => {
  return cy.get(`[data-${type}=${value}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy or data-test attributes.
       * @param type @default "cy"
       * @example
       * 	cy.data("example")
       * 	cy.data("example2", "test")
       * 	cy.data("example3", "another")
       */
      data(value: string, type?: "cy" | "test" | "string"): Chainable<JQuery<HTMLElement>>;
      /**
       * Custom command to create a task on UI
       * @param task
       * @example
       * cy.createTask({
       *	id: "1",
       *	title: "Study Javascript",
       *	time: 1
       * })
       */
      createTask(task: CreateTask): void;
      /**
       * Custom command to edit a task on UI
       * @param task
       * @example
       * cy.createTask("random-id", {
       *	title: "Study Typescript",
       * })
       */
      editTask(newContent: Omit<Partial<CreateTask>, "id">): void;
    }
  }
}
