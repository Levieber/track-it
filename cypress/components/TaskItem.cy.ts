import TaskItem from "@src/screens/Tasks/patterns/TaskItem.vue";
import { hasElementOverflowX } from "../utils/hasElementOverflowX";

describe("<TaskItem />", () => {
  it("should render a task with long title and time properly", () => {
    const task = {
      id: "1",
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Magnam et quas totam eaque dolore Nulla debitis assumenda maxime doloremque",
      time: 15000,
    };
    const formattedTimeString = "04:10:00";

    cy.mount(TaskItem, {
      props: {
        task,
      },
    });

    cy.data("task-title").eq(0).should("have.text", task.title);

    cy.document().should((document) => {
      expect(hasElementOverflowX(document).value, "elements with overflow").to.be.false;
    });

    cy.data("task-timer").should("be.visible").contains(formattedTimeString);
    cy.data("edit-task-link").should("be.visible");
  });

  it("should render properly with a task without title", () => {
    const task = {
      id: "1",
      title: "",
      time: 90,
    };
    const defaultText = "Tarefa sem título";
    const formattedTimeString = "00:01:30";

    cy.mount(TaskItem, {
      props: {
        task,
      },
    });

    cy.data("task-title").eq(0).should("have.text", defaultText);

    cy.data("task-timer").eq(0).contains(formattedTimeString);
    cy.data("edit-task-link").should("be.visible");
  });
});
