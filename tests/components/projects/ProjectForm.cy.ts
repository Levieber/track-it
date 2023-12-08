import { createTestingPinia } from "@pinia/testing";
import { useProjectStore } from "@src/stores/project";
import ProjectForm from "@src/screens/Projects/patterns/ProjectForm.vue";

const toEditContent = {
  name: "Vue Course",
};

const toEditProject = {
  id: "1",
  ...toEditContent,
};

describe("<ProjectForm/>", () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: cy.spy,
      stubActions: false,
    });
    cy.wrap(useProjectStore()).as("projectStore");
  });

  it("should have create the project properly", () => {
    const project = {
      name: "Vue 3 Course",
    };

    cy.mount(ProjectForm);

    cy.createProject(project);

    cy.get("@projectStore").its("addProject").should("have.been.called");
    cy.get("@projectStore").its("addProject").should("have.been.calledWithMatch", project);

    cy.data("create-project").should("have.value", "");
  });

  it("should not allow to create a project without a name", () => {
    cy.mount(ProjectForm);

    cy.createProject({ name: undefined });

    cy.get("@projectStore").its("addProject").should("not.have.been.called");
    cy.data("create-project").should("have.value", "");
  });

  it("should not allow to create a project with only spaces name", () => {
    cy.mount(ProjectForm);

    cy.createProject({ name: "    " });

    cy.get("@projectStore").its("addProject").should("not.have.been.called");
    cy.data("create-project").should("have.value", "");
  });

  it("should edit the project properly", () => {
    const editContent = {
      name: "Cypress Course",
    };

    cy.mount(ProjectForm, {
      props: {
        id: toEditProject.id,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: cy.spy,
            stubActions: false,
            initialState: {
              project: {
                projects: [toEditProject],
              },
            },
          }),
        ],
      },
    });

    cy.wrap(useProjectStore()).as("projectStore");

    cy.data("edit-project").should("have.value", toEditProject.name);

    cy.editProject({
      name: editContent.name,
    });

    cy.get("@projectStore").its("editProject").should("have.been.called");
    cy.get("@projectStore")
      .its("editProject")
      .should("have.been.calledWith", toEditProject.id, {
        ...editContent,
      });
  });
});
