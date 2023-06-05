import TaskTimer from "@src/components/TaskTimer.vue";

describe("<TaskTimer />", () => {
	it("should render seconds properly", () => {
		const timeInSeconds = 35; // 2 minutes

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const date = new Date();
		date.setHours(0, 0, timeInSeconds);
		const seconds = date.getSeconds().toString().padStart(2, "0");

		cy.data("timer").contains(`00:00:${seconds}`);
	});

	it("should render minutes properly", () => {
		const timeInSeconds = 60 * 1; // 2 minutes

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const date = new Date();
		date.setHours(0, 0, timeInSeconds);
		const minutes = date.getMinutes().toString().padStart(2, "0");

		cy.data("timer").contains(`00:${minutes}:00`);
	});

	it("should render hours properly", () => {
		const timeInSeconds = 60 * 60 * 1; // 1 hour

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const date = new Date();
		date.setHours(0, 0, timeInSeconds);
		const hours = date.getHours().toString().padStart(2, "0");

		cy.data("timer").contains(`${hours}:00:00`);
	});

	it("should render the icon properly", () => {
		const timeInSeconds = 35;

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
				withIcon: true,
			},
		});

		cy.data("timer-icon").should("be.visible");
	});
});
