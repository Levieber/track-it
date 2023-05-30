import { Task } from "../../src/@types/Task";

describe("Create a bulk of tasks", () => {
	it("should render the tasks properly", () => {
		cy.visit("/");

		cy.fixture("tasks").then(({ tasks }: { tasks: Task[] }) => {
			cy.get("ul").find("li").should("have.length", 1);

			for (const task of tasks) {
				cy.data("create-task").type(task.title);
				cy.data("start-task").click();

				cy.wait(task.time);

				cy.data("stop-task").click();

				cy.data("task-title").eq(0).should("have.text", task.title);

				const timeFormatted = new Date(task.time)
					.toISOString()
					.substring(11, 19);

				cy.data("task-timer").eq(0).should("have.text", timeFormatted);
			}

			cy.get("li").should("have.length", tasks.length);
		});
	});
});
