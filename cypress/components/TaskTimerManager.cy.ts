import TaskTimerManager from "@src/components/TaskTimerManager.vue";
import { timerFormatter } from "@src/utils/timerFormatter";

describe("<TaskTimerManager />", () => {
	it("should have the start button disabled when the timer start", () => {
		cy.mount(TaskTimerManager, {
			data() {
				return {
					timerRunning: true,
				};
			},
		});

		cy.data("start-task").should("be.visible").and("be.disabled");
	});

	it("should have the stop button disabled when the timer not started", () => {
		cy.mount(TaskTimerManager, {
			data() {
				return {
					timerRunning: false,
				};
			},
		});

		cy.data("stop-task").should("be.visible").and("be.disabled");
	});

	it("should be display the time properly on stop", () => {
		const timeInSeconds = 60 * 2; // 2 minutes

		cy.mount(TaskTimerManager, {
			data() {
				return {
					timeInSeconds,
					timerRunning: false,
				};
			},
		});

		const timeFormatted = timerFormatter(timeInSeconds);

		cy.data("timer").should("be.visible").contains(timeFormatted);
	});

	it("should have to emit the time in seconds properly", () => {
		const taskTime = 1;
		const onTimerFinishSpy = cy.spy().as("onTimerFinishSpy");

		cy.mount(TaskTimerManager, {
			props: {
				onTimerFinish: onTimerFinishSpy,
			},
		});

		cy.data("start-task").click();

		cy.wait(taskTime * 1000);

		cy.data("stop-task").click();

		cy.get("@onTimerFinishSpy").should("have.been.called");
		cy.get("@onTimerFinishSpy").should("have.been.calledWith", taskTime);
	});
});
