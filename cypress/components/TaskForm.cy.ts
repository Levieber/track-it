import type { Task } from "@src/types/Task";
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import { useTaskStore } from "@src/stores/task";
import { createTestingPinia } from "@pinia/testing";

const toEditTask = {
  id: "1",
  title: "Study Playwright",
  time: 150,
};

describe("<TaskForm/>", () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: cy.spy,
      stubActions: false,
    });
    cy.wrap(useTaskStore()).as("taskStore");
  });

  it("should have emit the task data properly", () => {
    const task: Task = {
      title: "Study Pinia",
      time: 150,
    };

    cy.mount(TaskForm);

    cy.createTask(task);

    cy.get("@taskStore").its("addTask").should("have.been.called");
    cy.get("@taskStore").its("addTask").should("have.been.calledWithMatch", task);

    cy.data("create-task").should("have.value", "");
  });

  it("should possible start and finish a task without a title", () => {
    const task: Task = {
      title: "",
      time: 150,
    };

    cy.mount(TaskForm);

    cy.createTask(task);

    cy.get("@taskStore").its("addTask").should("have.been.called");
    cy.get("@taskStore").its("addTask").should("have.been.calledWithMatch", task);
  });

  it("should edit a task properly", () => {
    const editContent = {
      title: "Study Cypress",
    };

    cy.mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            stubActions: false,
            initialState: {
              task: {
                tasks: [toEditTask],
              },
            },
          }),
        ],
      },
    });

    cy.wrap(useTaskStore()).as("taskStore");

    cy.data("edit-task").should("have.value", toEditTask.title);

    cy.editTask({
      title: editContent.title,
    });

    cy.data("finish-edit").click();

    cy.get("@taskStore").its("editTask").should("have.been.called");
    cy.get("@taskStore").its("editTask").should("have.been.calledWith", toEditTask.id, editContent);
  });
});
