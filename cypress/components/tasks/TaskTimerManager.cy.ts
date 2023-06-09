import TaskTimerManager from "@src/screens/Tasks/patterns/TaskTimerManager.vue";

describe("<TaskTimerManager />", () => {
  it("should have the start button disabled when the timer start", () => {
    cy.mount(TaskTimerManager, {
      data() {
        return {
          timerRunning: true,
        };
      },
    });

    cy.data("start-timer").should("be.visible").and("be.disabled");
  });

  it("should have the stop button disabled when the timer not started", () => {
    cy.mount(TaskTimerManager, {
      data() {
        return {
          timerRunning: false,
        };
      },
    });

    cy.data("stop-timer").should("be.visible").and("be.disabled");
  });

  it("should be display the time properly on start", () => {
    const taskTime = 60 * 2;
    const formattedTimeString = "00:02:00";

    cy.mount(TaskTimerManager);

    cy.clock();

    cy.data("start-timer").click();

    cy.tick(taskTime * 1000);

    cy.data("timer").should("be.visible").contains(formattedTimeString);

    cy.data("stop-timer").click();
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

    cy.data("start-timer").click();

    cy.tick(taskTime * 1000);

    cy.data("stop-timer").click();

    cy.get("@onTimerFinishSpy").should("have.been.called");
    cy.get("@onTimerFinishSpy").should("have.been.calledWith", taskTime);
  });

  it("should increment the time when a initial time is provided", () => {
    const initialTime = 150;
    const newTime = 5;
    const onTimerFinishSpy = cy.spy().as("onTimerFinishSpy");

    cy.mount(TaskTimerManager, {
      props: {
        initialTime,
        onTimerFinish: onTimerFinishSpy,
      },
    });

    cy.clock();

    cy.data("start-timer").click();

    cy.tick(newTime * 1000);

    cy.data("stop-timer").click();

    cy.get("@onTimerFinishSpy").should("have.been.called");
    cy.get("@onTimerFinishSpy").should("have.been.calledWith", initialTime + newTime);
  });
});
