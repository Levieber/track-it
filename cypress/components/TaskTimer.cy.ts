import TaskTimer from "@src/components/TaskTimer.vue";
import { timerFormatter } from "@src/utils/timerFormatter";

describe("<TaskTimer />", () => {
	it("should render seconds properly", () => {
		const timeInSeconds = 35; // 2 minutes

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const timeFormatted = timerFormatter(timeInSeconds);

		cy.data("timer").contains(timeFormatted);
	});

	it("should render minutes properly", () => {
		const timeInSeconds = 60 * 1; // 2 minutes

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const timeFormatted = timerFormatter(timeInSeconds);

		cy.data("timer").contains(timeFormatted);
	});

	it("should render hours properly", () => {
		const timeInSeconds = 60 * 60 * 1; // 1 hour

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		const timeFormatted = timerFormatter(timeInSeconds);

		cy.data("timer").contains(timeFormatted);
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
