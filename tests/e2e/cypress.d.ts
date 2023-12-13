import type { Project } from "@src/types/Project";
import type { Task as CreateTask } from "@src/types/Task";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * Custom command to select DOM element by data-cy, data-test or any data attributes.
       * @param type @default "cy"
       * @example
       * 	cy.data("example")
       * 	cy.data("example2", "test")
       * 	cy.data("example3", "another")
       */
      data(value: string, type?: "cy" | "test" | "string"): Chainable<JQuery>;
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
      /**
       * Custom command to create a project on UI
       * @param project
       * @example
       * cy.createProject({
       *	name: "Vue Course",
       * })
       */
      createProject(project: Omit<Partial<Project>, "id">): void;
      /**
       * Custom command to edit a project on UI
       * @param task
       * @example
       * cy.createTask("random-id", {
       *	name: "Vue 3 Course",
       * })
       */
      editProject(newContent: Omit<Partial<Project>, "id">): void;
    }
  }
}
