import type { Task } from "@src/types/Task";
import TaskForm from "@src/screens/Tasks/patterns/TaskForm.vue";
import { createMount } from "../support/mount";
import { screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

const projects = [
  {
    id: "project-1",
    name: "Testing",
  },
  {
    id: "project-2",
    name: "E2E",
  },
];

const toEditContent = {
  title: "Study Playwright",
  time: 150,
  project: projects[0].id,
};

const toEditTask = {
  id: "1",
  ...toEditContent,
};

const findTaskMock = vi.fn();
const addTaskMock = vi.fn();
const editTaskMock = vi.fn();

vi.mock("@src/stores/task", () => ({
  useTaskStore: () => ({
    findTask: findTaskMock,
    addTask: addTaskMock,
    editTask: editTaskMock,
  }),
}));

vi.mock("@src/stores/project", () => ({
  useProjectStore: () => ({
    projects,
  }),
}));

const mount = createMount();

const createTask = async (task: Omit<Task, "id">) => {
  const user = userEvent.setup();

  if (task.title) {
    await user.type(screen.getByTestId("create-task"), task.title);
  }

  vi.useFakeTimers({ shouldAdvanceTime: true });
  await user.click(screen.getByTestId("start-timer"));

  await vi.advanceTimersByTimeAsync(task.time * 1000);

  await user.click(screen.getByTestId("stop-timer"));
  vi.useRealTimers();

  if (task.project) {
    await user.selectOptions(screen.getByTestId("link-project"), task.project);
  }

  await user.click(screen.getByTestId("save-task-button"));
};

const editTask = async (newContent: Partial<Omit<Task, "id">>) => {
  const user = userEvent.setup();

  if (newContent.time) {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    await user.click(screen.getByTestId("start-timer"));
    await vi.advanceTimersByTimeAsync(newContent.time * 1000);
    await user.click(screen.getByTestId("stop-timer"));
    vi.useRealTimers();
  }

  if (newContent.title) {
    const editInput = screen.getByTestId("edit-task");
    await user.clear(editInput);
    await user.type(editInput, newContent.title);
  }

  if (newContent.project) {
    await user.selectOptions(screen.getByTestId("link-project"), newContent.project);
  }

  await user.click(screen.getByTestId("save-task-button"));
};

describe("<TaskForm/>", () => {
  it("should have emit the task data properly", async () => {
    const task: Task = {
      title: "Study Pinia",
      time: 150,
    };

    const wrapper = mount(TaskForm);

    await createTask(task);

    expect(addTaskMock).toHaveBeenCalled();
    expect(addTaskMock).toHaveBeenCalledWith(expect.objectContaining(task));

    expect(wrapper.getByTestId("create-task")).toHaveValue("");
  });

  it("should possible start and finish a task without a title", async () => {
    const task: Task = {
      title: "",
      time: 150,
    };

    mount(TaskForm);

    await createTask(task);

    expect(addTaskMock).toHaveBeenCalled();
    expect(addTaskMock).toHaveBeenCalledWith(expect.objectContaining(task));
  });

  it("should edit all properties properly", async () => {
    const editContent = {
      title: "Study Cypress",
      time: 5,
      project: "project-2",
    };

    findTaskMock.mockReturnValue(toEditTask);

    const wrapper = mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    await waitFor(() => {
      expect(wrapper.getByTestId("edit-task")).toHaveValue(toEditTask.title);
      expect(wrapper.getByTestId("link-project")).toHaveValue(toEditTask.project);
    });

    await editTask({
      title: editContent.title,
      time: editContent.time,
      project: editContent.project,
    });

    expect(editTaskMock).toHaveBeenCalled();
    expect(editTaskMock).toHaveBeenCalledWith(toEditTask.id, {
      ...editContent,
      time: toEditTask.time + editContent.time,
    });
  });

  it("should allow to edit only the title", async () => {
    const editContent = {
      title: "Study component tests with Cypress",
    };

    const wrapper = mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    await waitFor(() => {
      expect(wrapper.getByTestId("edit-task")).toHaveValue(toEditTask.title);
    });

    await editTask({
      title: editContent.title,
    });

    expect(editTaskMock).toHaveBeenCalled();
    expect(editTaskMock).toHaveBeenCalledWith(toEditTask.id, {
      ...toEditContent,
      ...editContent,
    });
  });

  it("should allow to edit only the time", async () => {
    const editContent = {
      time: 5,
    };

    mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    await editTask({
      time: editContent.time,
    });

    expect(editTaskMock).toHaveBeenCalled();
    expect(editTaskMock).toHaveBeenCalledWith(toEditTask.id, {
      ...toEditContent,
      time: toEditTask.time + editContent.time,
    });
  });

  it("should allow to edit only the project", async () => {
    const editContent = {
      project: projects[1].id,
    };

    const wrapper = mount(TaskForm, {
      props: {
        id: toEditTask.id,
      },
    });

    await waitFor(() => {
      expect(wrapper.getByTestId("link-project")).toHaveValue(toEditTask.project);
    });

    await editTask({
      project: editContent.project,
    });

    expect(editTaskMock).toHaveBeenCalled();
    expect(editTaskMock).toHaveBeenCalledWith(toEditTask.id, {
      ...toEditContent,
      ...editContent,
    });
  });
});
