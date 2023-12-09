import type { Project } from "@src/types/Project";
import ProjectForm from "@src/screens/Projects/patterns/ProjectForm.vue";
import { createMount } from "@tests/components/support/mount";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/vue";

const toEditContent = {
  name: "Vue Course",
};

const toEditProject = {
  id: "1",
  ...toEditContent,
};

const mount = createMount();

const addProjectMock = vi.fn();
const editProjectMock = vi.fn();
const findProjectMock = vi.fn();

vi.mock("@src/stores/project", () => ({
  useProjectStore: () => ({
    addProject: addProjectMock,
    editProject: editProjectMock,
    findProject: findProjectMock,
  }),
}));

// JSDOM don't implement window.alert
window.alert = () => {};

const createProject = async (project: Omit<Project, "id">) => {
  const user = userEvent.setup();

  if (project.name) {
    await user.type(screen.getByTestId("create-project"), project.name);
  }

  await user.click(screen.getByTestId("save-project-button"));
};

const editProject = async (project: Partial<Omit<Project, "id">>) => {
  const user = userEvent.setup();

  if (project.name) {
    const editInput = screen.getByTestId("edit-project");
    await user.clear(editInput);
    await user.type(editInput, project.name);
  }

  await user.click(screen.getByTestId("save-project-button"));
};

describe("<ProjectForm/>", () => {
  it("should have create the project properly", async () => {
    const project = {
      name: "Vue 3 Course",
    };

    const { getByTestId } = mount(ProjectForm);

    await createProject(project);

    expect(addProjectMock).toHaveBeenCalled();
    expect(addProjectMock).toHaveBeenCalledWith(expect.objectContaining(project));

    expect(getByTestId("create-project")).toHaveValue("");
  });

  it("should not allow to create a project without a name", async () => {
    const { getByTestId } = mount(ProjectForm);

    await createProject({ name: "" });

    expect(addProjectMock).not.toHaveBeenCalled();
    expect(getByTestId("create-project")).toHaveValue("");
  });

  it("should not allow to create a project with only spaces name", async () => {
    const { getByTestId } = mount(ProjectForm);

    await createProject({ name: "    " });

    expect(addProjectMock).not.toHaveBeenCalled();
    expect(getByTestId("create-project")).toHaveValue("");
  });

  it("should edit the project properly", async () => {
    const editContent = {
      name: "Cypress Course",
    };

    findProjectMock.mockReturnValue(toEditProject);

    const { getByTestId } = mount(ProjectForm, {
      props: {
        id: toEditProject.id,
      },
      state: {
        initialState: {
          project: {
            projects: [toEditProject],
          },
        },
      },
    });

    await waitFor(() => {
      expect(getByTestId("edit-project")).toHaveValue(toEditProject.name);
    });

    await editProject({
      name: editContent.name,
    });

    expect(editProjectMock).toHaveBeenCalled();
    expect(editProjectMock).toHaveBeenCalledWith(toEditProject.id, {
      ...editContent,
    });
  });
});
