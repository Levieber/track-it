import TaskItem from "@src/components/TaskItem.vue";
import { timerFormatter } from "@src/utils/timerFormatter";
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

		const timeFormatted = timerFormatter(task.time);

		cy.document().should((document) => {
			expect(
				hasElementOverflowX(document).value,
				"elements with overflow",
			).to.be.false;
		});

		cy.data("task-timer").eq(0).should("have.text", timeFormatted);
	});

	it("should render properly with a task without title", () => {
		cy.fixture<{ tasks: Task[] }>("tasks").then(({ tasks }) => {
			const taskWithoutTitle = tasks[3];
			const defaultText = "Tarefa sem título";

			cy.mount(TaskItem, {
				props: {
					task: taskWithoutTitle,
				},
			});

			cy.data("task-title").eq(0).should("have.text", defaultText);

			const timeFormatted = timerFormatter(taskWithoutTitle.time);

			cy.data("task-timer").eq(0).should("have.text", timeFormatted);
		});
	});
});
