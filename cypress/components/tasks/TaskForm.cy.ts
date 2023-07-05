import type { Task } from "@src/types/Task";
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import { useTaskStore } from "@src/stores/task";
import { createTestingPinia } from "@pinia/testing";

const projects = [
  {
    id: "project-1",
    name: "Testing",
  },
  {
    id: "project-2",
    name: "E2E",
  },
];

const toEditContent = {
  title: "Study Playwright",
  time: 150,
  project: projects[0].id,
};

const toEditTask = {
  id: "1",
  ...toEditContent,
};

describe("<TaskForm/>", () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: cy.spy,
      stubActions: false,
      initialState: {
        task: {
          tasks: [toEditTask],
        },
        project: {
          projects,
        },
      },
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

  it("should edit all properties properly", () => {
    const editContent = {
      title: "Study Cypress",
      time: 5,
      project: "project-2",
    };

    cy.mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    cy.data("link-project").should("have.value", toEditTask.project);
    cy.data("edit-task").should("have.value", toEditTask.title);

    cy.editTask({
      title: editContent.title,
      time: editContent.time,
      project: editContent.project,
    });

    cy.get("@taskStore").its("editTask").should("have.been.called");
    cy.get("@taskStore")
      .its("editTask")
      .should("have.been.calledWith", toEditTask.id, {
        ...editContent,
        time: toEditTask.time + editContent.time,
      });
  });

  it("should allow to edit only the title", () => {
    const editContent = {
      title: "Study component tests with Cypress",
    };

    cy.mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    cy.data("edit-task").should("have.value", toEditTask.title);

    cy.editTask({
      title: editContent.title,
    });

    cy.get("@taskStore").its("editTask").should("have.been.called");
    cy.get("@taskStore")
      .its("editTask")
      .should("have.been.calledWith", toEditTask.id, { ...toEditContent, ...editContent });
  });

  it("should allow to edit only the time", () => {
    const editContent = {
      time: 5,
    };

    cy.mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    cy.wrap(useTaskStore()).as("taskStore");

    cy.data("edit-task").should("have.value", toEditTask.title);

    cy.editTask({
      time: editContent.time,
    });

    cy.get("@taskStore").its("editTask").should("have.been.called");
    cy.get("@taskStore")
      .its("editTask")
      .should("have.been.calledWith", toEditTask.id, {
        ...toEditContent,
        time: editContent.time + toEditTask.time,
      });
  });

  it("should allow to edit only the project", () => {
    const editContent = {
      project: projects[1].id,
    };

    cy.mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    cy.wrap(useTaskStore()).as("taskStore");

    cy.data("link-project").should("have.value", toEditTask.project);

    cy.editTask({
      project: editContent.project,
    });

    cy.get("@taskStore").its("editTask").should("have.been.called");
    cy.get("@taskStore")
      .its("editTask")
      .should("have.been.calledWith", toEditTask.id, {
        ...toEditContent,
        ...editContent,
      });
  });
});
