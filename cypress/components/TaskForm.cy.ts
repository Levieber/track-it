import type { Task } from "@src/types/Task";
import TaskForm from "@src/components/TaskForm.vue";

describe("<TaskForm/>", () => {
	it("should have emit the task data properly", () => {
		const onSaveTaskSpy = cy.spy().as("onSaveTaskSpy");

		cy.mount(TaskForm, {
			props: {
				onSaveTask: onSaveTaskSpy,
			},
		});

		cy.fixture<Task[]>("tasks").then((tasks) => {
			const { title, time } = tasks[0];

			cy.createTask({ title, time });

			cy.get("@onSaveTaskSpy").should("have.been.called");

			cy.get("@onSaveTaskSpy").should("have.been.calledWithMatch", {
				title,
				time,
			});
		});

		cy.data("create-task").should("have.value", "");
	});

	it("should possible start and finish a task without a title", () => {
		const onSaveTaskSpy = cy.spy().as("onSaveTaskSpy");

		cy.mount(TaskForm, {
			props: {
				onSaveTask: onSaveTaskSpy,
			},
		});

		cy.fixture<Task[]>("tasks").then((tasks) => {
			const { title, time } = tasks[3];

			cy.createTask({ title, time });

			cy.get("@onSaveTaskSpy").should("have.been.called");

			cy.get("@onSaveTaskSpy").should("have.been.calledWithMatch", {
				title: "",
				time,
			});
		});
	});
});
