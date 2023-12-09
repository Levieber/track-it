import ProjectsView from "@src/screens/Projects/patterns/ProjectsView.vue";
import { createMount } from "@tests/components/support/mount";

const projects = [
  {
    id: "project-1",
    name: "Vue Course",
  },
  {
    id: "project-2",
    name: "Typescript Course",
  },
  {
    id: "project-3",
    name: "Task Tracker",
  },
];

const tasks = [
  {
    id: "task-1",
    title: "Directives Class",
    time: 250,
    project: projects[0].id,
  },
  {
    id: "task-2",
    title: "Attributes Binding Class",
    time: 150,
    project: projects[0].id,
  },
];

const mount = createMount();

describe("<ProjectsView />", () => {
  it("should render a feedback when not have a project", () => {
    const { getByTestId } = mount(ProjectsView, {
      state: {
        initialState: {
          project: {
            projects: [],
          },
        },
      },
    });

    const feedbackText = "Você ainda não tem um projeto, tente criar um.";

    expect(getByTestId("empty-list-feedback")).toHaveTextContent(new RegExp(feedbackText, "i"));
  });

  it("should render the projects properly", () => {
    const { getAllByTestId } = mount(ProjectsView, {
      state: {
        initialState: {
          project: {
            projects,
          },
        },
      },
    });

    const projectItems = getAllByTestId("project-item");

    expect(projectItems).toHaveLength(projects.length);
  });

  it("should no render the search input when not have projects", () => {
    const { queryByTestId } = mount(ProjectsView, {
      state: {
        initialState: {
          project: {
            projects: [],
          },
        },
      },
    });

    const searchProjectInput = queryByTestId("search-project");

    expect(searchProjectInput).not.toBeInTheDocument();
  });

  it("should filter the projects properly", async () => {
    const { getByTestId, getAllByTestId, user } = mount(ProjectsView, {
      state: {
        initialState: {
          project: {
            projects,
          },
        },
      },
    });

    const searchProjectInput = getByTestId("search-project");

    await user.type(searchProjectInput, "course");

    const projectItems = getAllByTestId("project-item");

    expect(projectItems).toHaveLength(2);
  });

  it("should show the quantity of the tasks in a project properly", () => {
    const { getByText } = mount(ProjectsView, {
      state: {
        initialState: {
          task: {
            tasks,
          },
          project: {
            projects,
          },
        },
        stubActions: false,
      },
    });

    expect(
      getByText(String(tasks.length), { selector: "[data-test='project-tasks-quantity']" }),
    ).toBeInTheDocument();
  });
});
