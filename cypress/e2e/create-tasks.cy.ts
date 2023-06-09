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

				const hours = Math.floor(task.time / 3600);
				const minutes = Math.floor((task.time % 3600) / 60);
				const seconds = task.time % 60;

				const formattedTimeString = `${String(hours).padStart(2, "0")}:${String(
					minutes,
				).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

				cy.data("task-timer").eq(0).contains(formattedTimeString);
			}

			cy.get("li").should("have.length", tasks.length);
		});
	});
});
