import TaskBox from "@src/components/TaskBox.vue";

describe("<TaskBox />", () => {
	it("should render properly with slot and custom tag", () => {
		const customTag = "article";
		const slot = "<span>Slot</span>";

		cy.mount(TaskBox, {
			props: {
				tag: customTag,
			},
			slots: {
				default: slot,
			},
		});

		cy.get(customTag).should("have.html", slot);
	});
});
