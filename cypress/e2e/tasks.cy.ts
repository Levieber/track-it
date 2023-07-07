import type { Task } from "@src/types/Task";
import { timerFormatter } from "@src/utils/timerFormatter";

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

        cy.data("task-title").eq(0).as("taskTitle");
        cy.data("task-timer").eq(0).as("taskTimer");

        cy.get("@taskTitle").should("have.text", task.title || defaultTaskTitle);

        cy.get("@taskTimer").should("contain.text", timerFormatter(task.time));

        cy.get("li").eq(0).find("a").contains("editar tarefa", { matchCase: false }).click();

        cy.data("edit-task").should("have.value", task.title || "");

        cy.editTask({
          title: task.editTitle,
          time: 15,
        });

        cy.get("@taskTitle").eq(0).should("have.text", task.editTitle);
        cy.data("task-timer")
          .eq(0)
          .should("contain.text", timerFormatter(task.time + 15));
      }
    });
  });

  it("should remove the task properly", () => {
    cy.fixture<Task[]>("tasks").then((tasks) => {
      for (const task of tasks.slice(0, 3)) {
        cy.visit("/tasks/new");
        cy.createTask(task);
      }
    });

    cy.data("delete-task-button").eq(0).click();

    cy.get("li").should("have.length", 2);
  });

  it("should filter the tasks properly", () => {
    const tasks: Task[] = [
      {
        title: "Study Javascript",
        time: 150,
      },
      {
        title: "Study Typescript",
        time: 150,
      },
      {
        title: "Make a e2e test",
        time: 250,
      },
    ];

    for (const task of tasks) {
      cy.visit("/tasks/new");
      cy.createTask(task);
    }

    cy.data("search-task").as("searchInput");

    cy.get("@searchInput").type("study");

    cy.get("li").should("have.length", 2);

    cy.get("@searchInput").clear().type("test");

    cy.get("li").should("have.length", 1);

    cy.get("@searchInput").clear();

    cy.get("li").should("have.length", tasks.length);
  });
});
