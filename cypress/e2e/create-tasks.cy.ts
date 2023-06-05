import { Task } from "@src/types/Task";

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

				const date = new Date(task.time);
				date.setHours(0, 0, task.time);
				const hours = date.getHours().toString().padStart(2, "0");
				const minutes = date.getMinutes().toString().padStart(2, "0");
				const seconds = date.getSeconds().toString().padStart(2, "0");

				cy.data("task-timer").eq(0).contains(`${hours}:${minutes}:${seconds}`);
			}

			cy.get("li").should("have.length", tasks.length);
		});
	});
});
