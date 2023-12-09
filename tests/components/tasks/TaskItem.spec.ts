import TaskItem from "@src/screens/Tasks/patterns/TaskItem.vue";
import { hasElementOverflowX } from "@tests/components/support/hasElementOverflowX";
import { createMount } from "@tests/components/support/mount";

const findProjectMock = vi.fn();

vi.mock("@src/stores/project", () => ({
  useProjectStore: () => ({
    findProject: findProjectMock,
  }),
}));

const mount = createMount();

describe("<TaskItem />", () => {
  it("should render a task with long title and time properly", () => {
    const task = {
      id: "1",
      title:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit Magnam et quas totam eaque dolore Nulla debitis assumenda maxime doloremque",
      time: 15000,
    };
    const formattedTimeString = "04:10:00";

    const { getByTestId } = mount(TaskItem, {
      props: {
        task,
      },
    });

    const taskTitle = getByTestId("task-title");
    const taskTimer = getByTestId("task-timer");
    const editTaskLink = getByTestId("edit-task-link");
    const deleteTaskButton = getByTestId("delete-task-button");

    expect(hasElementOverflowX(document).value).toBe(false);
    expect(taskTitle).toBeVisible();
    expect(taskTimer).toBeVisible();
    expect(editTaskLink).toBeVisible();
    expect(deleteTaskButton).toBeVisible();
    expect(taskTitle).toHaveTextContent(task.title);
    expect(taskTimer).toHaveTextContent(formattedTimeString);
  });

  it("should render properly with a task without title", () => {
    const task = {
      id: "1",
      title: "",
      time: 90,
    };
    const defaultText = "Tarefa sem título";
    const formattedTimeString = "00:01:30";

    const { getByTestId } = mount(TaskItem, {
      props: {
        task,
      },
    });

    const taskTitle = getByTestId("task-title");
    const taskTimer = getByTestId("task-timer");
    const editTaskLink = getByTestId("edit-task-link");
    const deleteTaskButton = getByTestId("delete-task-button");

    expect(taskTitle).toBeVisible();
    expect(taskTimer).toBeVisible();
    expect(editTaskLink).toBeVisible();
    expect(deleteTaskButton).toBeVisible();

    expect(taskTitle).toHaveTextContent(defaultText);
    expect(taskTimer).toHaveTextContent(formattedTimeString);
  });

  it("should render a task linked to a project properly", () => {
    const project = {
      id: "project-1",
      name: "Vue 3 Course",
    };

    const task = {
      id: "task-1",
      title: "Directives",
      time: 60,
      project: project.id,
    };

    const formattedTimeString = "00:01:00";

    findProjectMock.mockReturnValue(project);

    const { getByTestId } = mount(TaskItem, {
      props: {
        task,
      },
    });

    const taskTitle = getByTestId("task-title");
    const taskTimer = getByTestId("task-timer");
    const editTaskLink = getByTestId("edit-task-link");
    const deleteTaskButton = getByTestId("delete-task-button");
    const taskProject = getByTestId("task-project");

    expect(taskProject).toBeVisible();
    expect(taskTitle).toBeVisible();
    expect(taskTimer).toBeVisible();
    expect(editTaskLink).toBeVisible();
    expect(deleteTaskButton).toBeVisible();

    expect(taskProject).toHaveTextContent(project.name);
    expect(taskTitle).toHaveTextContent(task.title);
    expect(taskTimer).toHaveTextContent(formattedTimeString);
  });

  it("should render a task without project properly properly", () => {
    const task = {
      id: "task-1",
      title: "Directives",
      time: 60,
    };

    const formattedTimeString = "00:01:00";

    const { getByTestId } = mount(TaskItem, {
      props: {
        task,
      },
    });

    const taskTitle = getByTestId("task-title");
    const taskTimer = getByTestId("task-timer");
    const editTaskLink = getByTestId("edit-task-link");
    const deleteTaskButton = getByTestId("delete-task-button");

    expect(taskTitle).toBeVisible();
    expect(taskTimer).toBeVisible();
    expect(editTaskLink).toBeVisible();
    expect(deleteTaskButton).toBeVisible();
    expect(taskTitle).toHaveTextContent(task.title);
    expect(taskTimer).toHaveTextContent(formattedTimeString);
  });
});
