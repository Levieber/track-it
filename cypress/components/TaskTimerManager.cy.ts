import TaskTimerManager from "@src/components/TaskTimerManager.vue";

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

	it("should be display the time properly on start", () => {
		const taskTime = 60 * 2; // 2 minutes

		cy.mount(TaskTimerManager);

		cy.clock();

		cy.data("start-task").click();

		cy.tick(taskTime * 1000);

		const date = new Date();
		date.setHours(0, 0, taskTime);
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");

		cy.data("timer")
			.should("be.visible")
			.contains(`${hours}:${minutes}:${seconds}`);

		cy.data("stop-task").click();
	});

	it("should have to emit the time in seconds properly", () => {
		const taskTime = 1;
		const onTimerFinishSpy = cy.spy().as("onTimerFinishSpy");

		cy.mount(TaskTimerManager, {
			props: {
				onTimerFinish: onTimerFinishSpy,
			},
		});

		cy.clock();

		cy.data("start-task").click();

		cy.tick(taskTime * 1000);

		cy.data("stop-task").click();

		cy.get("@onTimerFinishSpy").should("have.been.called");
		cy.get("@onTimerFinishSpy").should("have.been.calledWith", taskTime);
	});
});
