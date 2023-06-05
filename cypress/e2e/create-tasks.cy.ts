import { Task } from "@src/types/Task";
import { timerFormatter } from "@src/utils/timerFormatter";

describe("Create a bulk of tasks", () => {
	it("should render the tasks properly", () => {
		cy.visit("/");

		cy.fixture<Task[]>("tasks").then((tasks) => {
			const emptyTaskTitle = "Tarefa sem título";
			cy.get("ul").find("li").should("have.length", 1);

			for (const task of tasks) {
				cy.createTask(task);

				cy.data("task-title")
					.eq(0)
					.should("have.text", task.title || emptyTaskTitle);

				const timeFormatted = timerFormatter(task.time);

				cy.data("task-timer").eq(0).should("have.text", timeFormatted);
			}

			cy.get("li").should("have.length", tasks.length);
		});
	});
});
