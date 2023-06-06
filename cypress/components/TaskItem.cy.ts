import TaskItem from "@src/components/TaskItem.vue";
import { hasElementOverflowX } from "../utils/hasElementOverflowX";
import { Task } from "@src/types/Task";

describe("<TaskItem />", () => {
	it("should render a task with long title and time properly", () => {
		const task = {
			title:
				"Lorem ipsum dolor sit, amet consectetur adipisicing elit Magnam et quas totam eaque dolore Nulla debitis assumenda maxime doloremque",
			time: 15000,
		};

		cy.mount(TaskItem, {
			props: {
				task,
			},
		});

		cy.data("task-title").eq(0).should("have.text", task.title);

		cy.document().should((document) => {
			expect(
				hasElementOverflowX(document).value,
				"elements with overflow",
			).to.be.false;
		});

		const date = new Date();
		date.setHours(0, 0, task.time);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");

		cy.data("task-timer").eq(0).contains(`${hours}:${minutes}:${seconds}`);
	});

	it("should render properly with a task without title", () => {
		cy.fixture<Task[]>("tasks").then((tasks) => {
			const taskWithoutTitle = tasks[3];
			const defaultText = "Tarefa sem título";

			cy.mount(TaskItem, {
				props: {
					task: taskWithoutTitle,
				},
			});

			cy.data("task-title").eq(0).should("have.text", defaultText);

			const date = new Date();
			date.setHours(0, 0, taskWithoutTitle.time);
			const hours = date.getHours().toString().padStart(2, "0");
			const minutes = date.getMinutes().toString().padStart(2, "0");
			const seconds = date.getSeconds().toString().padStart(2, "0");

			cy.data("task-timer").eq(0).contains(`${hours}:${minutes}:${seconds}`);
		});
	});
});
