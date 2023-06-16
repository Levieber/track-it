import { Task } from "@src/types/Task";

describe("Task - User Journey", () => {
  it("should create a bulk of tasks and render them properly", () => {
    cy.visit("/");

    const emptyTaskTitle = "Tarefa sem título";
    cy.get("li").should("have.length", 1);

    cy.data("create-task-link").click();

    cy.url().should("contain", "/tasks/new");

    cy.fixture<Task[]>("tasks").then((tasks) => {
      for (const task of tasks) {
        cy.visit("/tasks/new");
        cy.createTask(task);

        cy.data("task-title")
          .eq(0)
          .should("have.text", task.title || emptyTaskTitle);

        const hours = Math.floor(task.time / 3600);
        const minutes = Math.floor((task.time % 3600) / 60);
        const seconds = task.time % 60;

        const formattedTimeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;

        cy.data("task-timer").eq(0).contains(formattedTimeString);
      }

      cy.get("li").should("have.length", tasks.length);
    });
  });

  it("should create and edit the tasks properly", () => {
    const defaultTaskTitle = "Tarefa sem título";

    cy.fixture<Array<Task & { editTitle: string }>>("tasks").then((tasks) => {
      for (const task of tasks) {
        cy.visit("/tasks/new");
        cy.createTask(task);

        cy.data("task-title").as("taskTitle");

        cy.get("@taskTitle")
          .eq(0)
          .should("have.text", task.title || defaultTaskTitle);

        cy.get("li").eq(0).find("a").contains("editar tarefa", { matchCase: false }).click();

        cy.data("edit-task").should("have.value", task.title || "");

        cy.editTask({
          title: task.editTitle,
        });

        cy.get("@taskTitle").eq(0).should("have.text", task.editTitle);
      }
    });
  });
});
