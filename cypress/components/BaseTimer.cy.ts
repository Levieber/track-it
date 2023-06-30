import TaskTimer from "@src/components/BaseTimer.vue";

describe("<TaskTimer />", () => {
	it("should render seconds properly", () => {
		const timeInSeconds = 35;
		const formattedTimeString = `00:00:${String(timeInSeconds).padStart(
			2,
			"0",
		)}`;

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		cy.data("timer").contains(formattedTimeString);
	});

	it("should render minutes properly", () => {
		const minutes = 1;
		const timeInSeconds = 60 * minutes;
		const formattedTimeString = `00:${String(minutes).padStart(2, "0")}:00`;

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		cy.data("timer").contains(formattedTimeString);
	});

	it("should render hours properly", () => {
		const hours = 1;
		const timeInSeconds = 60 * 60 * hours;
		const formattedTimeString = `${String(hours).padStart(2, "0")}:00:00`;

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		cy.data("timer").contains(formattedTimeString);
	});

	it("should render more than 24 hours properly", () => {
		const hours = 25;
		const timeInSeconds = 60 * 60 * hours;
		const formattedTimeString = `${hours}:00:00`;

		cy.mount(TaskTimer, {
			props: {
				timeInSeconds,
			},
		});

		cy.data("timer").contains(formattedTimeString);
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
