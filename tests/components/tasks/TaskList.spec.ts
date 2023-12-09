import TaskList from "@src/screens/Tasks/patterns/TaskList.vue";
import type { Task } from "@src/types/Task";
import { createMount } from "@tests/components/support/mount";

const tasks: Array<Task & { editTitle?: string }> = [
  {
    id: "2",
    title: "Make a router",
    editTitle: "Study Vue Router",
    time: 3,
  },
  {
    id: "3",
    title: "Make a dialog",
    editTitle: "Make a accessible dialog",
    time: 2,
  },
  {
    id: "4",
    title: "",
    editTitle: "Study Vue",
    time: 1,
  },
];

const mount = createMount();

describe("<TaskList />", () => {
  it("should render a feedback when not have a task", () => {
    const { getByTestId } = mount(TaskList, {
      state: {
        initialState: {
          task: {
            tasks: [],
          },
        },
      },
    });

    const feedbackText = "você não está muito produtivo hoje";

    const feedbackItem = getByTestId("empty-list-feedback");

    expect(feedbackItem).toBeVisible();
    expect(feedbackItem).toHaveTextContent(new RegExp(feedbackText, "i"));
  });

  it("should render the tasks properly", () => {
    const { getAllByTestId } = mount(TaskList, {
      state: {
        initialState: {
          task: {
            tasks,
          },
        },
      },
    });

    const taskItems = getAllByTestId("task-item");

    expect(taskItems).toHaveLength(tasks.length);
  });

  it("should no render the search input when not have tasks", () => {
    const { queryByTestId } = mount(TaskList, {
      state: {
        initialState: {
          task: {
            tasks: [],
          },
        },
      },
    });

    const searchTaskInput = queryByTestId("search-task");

    expect(searchTaskInput).not.toBeInTheDocument();
  });

  it("should filter the task properly", async () => {
    const { getByTestId, getAllByTestId, user } = mount(TaskList, {
      state: {
        initialState: {
          task: {
            tasks,
          },
        },
      },
    });

    const searchTaskInput = getByTestId("search-task");

    await user.type(searchTaskInput, "make");

    const taskItems = getAllByTestId("task-item");

    expect(taskItems).toHaveLength(2);
  });
});
