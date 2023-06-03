import TaskForm from "@src/components/TaskForm.vue";

describe("<TaskForm/>", () => {
	it("should have emit the task data properly", () => {
		const taskTitle = "Study Vuejs";
		const taskTime = 1;

		const onSaveTaskSpy = cy.spy().as("onSaveTaskSpy");

		cy.mount(TaskForm, {
			props: {
				onSaveTask: onSaveTaskSpy,
			},
		});

		cy.data("create-task").type(taskTitle);

		cy.data("start-task").click();

		cy.wait(taskTime * 1000);

		cy.data("stop-task").click();

		cy.get("@onSaveTaskSpy").should("have.been.called");

		cy.get("@onSaveTaskSpy").should("have.been.calledWithMatch", {
			title: taskTitle,
			time: taskTime,
		});

		cy.data("create-task").should("have.value", "");
	});

	it("should possible start and finish a task without a title", () => {
		const taskTime = 1;

		const onSaveTaskSpy = cy.spy().as("onSaveTaskSpy");

		cy.mount(TaskForm, {
			props: {
				onSaveTask: onSaveTaskSpy,
			},
		});

		cy.data("start-task").click();

		cy.data("create-task").should("have.value", "");

		cy.wait(taskTime * 1000);

		cy.data("stop-task").click();

		cy.get("@onSaveTaskSpy").should("have.been.called");

		cy.get("@onSaveTaskSpy").should("have.been.calledWithMatch", {
			title: "",
			time: taskTime,
		});
	});
});
