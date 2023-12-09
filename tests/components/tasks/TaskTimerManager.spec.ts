import TaskTimerManager from "@src/screens/Tasks/patterns/TaskTimerManager.vue";
import { createMount } from "@tests/components/support/mount";
import { nextTick } from "vue";

const mount = createMount();

describe("<TaskTimerManager />", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have the start button disabled when the timer start", async () => {
    const { getByTestId, user } = mount(TaskTimerManager);

    const startTimerButton = getByTestId("start-timer");

    expect(startTimerButton).toBeVisible();
    expect(startTimerButton).not.toBeDisabled();

    await user.click(startTimerButton);

    expect(startTimerButton).toBeVisible();
    expect(startTimerButton).toBeDisabled();
  });

  it("should have the stop button disabled when the timer not started", () => {
    const { getByTestId } = mount(TaskTimerManager);

    const stopTimerButton = getByTestId("stop-timer");

    expect(stopTimerButton).toBeVisible();
    expect(stopTimerButton).toBeDisabled();
  });

  it("should be display the time properly on start and on stop", async () => {
    const taskTime = 60 * 2;
    const formattedTimeString = "00:02:00";

    const { getByTestId, user } = mount(TaskTimerManager);

    vi.useFakeTimers({ shouldAdvanceTime: true });

    await user.click(getByTestId("start-timer"));

    await vi.advanceTimersByTimeAsync(taskTime * 1000);

    await nextTick();

    const timer = getByTestId("timer");

    expect(timer).toBeVisible();
    expect(timer).toHaveTextContent(formattedTimeString);

    await user.click(getByTestId("stop-timer"));

    expect(timer).toBeVisible();
    expect(timer).toHaveTextContent(formattedTimeString);
  });

  it("should have to emit the time in seconds properly", async () => {
    const taskTime = 1;
    const onTimerFinishSpy = vi.fn();

    const { getByTestId, user } = mount(TaskTimerManager, {
      props: {
        onTimerFinish: onTimerFinishSpy,
      },
    });

    vi.useFakeTimers({ shouldAdvanceTime: true });

    await user.click(getByTestId("start-timer"));

    await vi.advanceTimersByTimeAsync(taskTime * 1000);

    await user.click(getByTestId("stop-timer"));

    expect(onTimerFinishSpy).toHaveBeenCalled();
    expect(onTimerFinishSpy).toHaveBeenCalledWith(taskTime);
  });

  it("should increment the time when a initial time is provided", async () => {
    const initialTime = 150;
    const newTime = 5;
    const onTimerFinishSpy = vi.fn();

    const { getByTestId, user } = mount(TaskTimerManager, {
      props: {
        initialTime,
        onTimerFinish: onTimerFinishSpy,
      },
    });

    vi.useFakeTimers({ shouldAdvanceTime: true });

    await user.click(getByTestId("start-timer"));

    await vi.advanceTimersByTimeAsync(newTime * 1000);

    await user.click(getByTestId("stop-timer"));

    expect(onTimerFinishSpy).toHaveBeenCalled();
    expect(onTimerFinishSpy).toHaveBeenCalledWith(initialTime + newTime);
  });
});
