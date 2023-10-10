import type { Project } from "@src/types/Project";

const defaultProjectName = "Default name";

describe("Project - User Journey", () => {
  it("should create a bulk of projects and render them properly", () => {
    cy.visit("/projects");

    cy.get("div[role='alert'").should("be.visible");

    cy.data("create-project-link").click();

    cy.url().should("contain", "/projects/new");

    cy.fixture<Project[]>("projects").then((projects) => {
      for (const project of projects) {
        cy.visit("/projects/new");

        cy.createProject(project);

        if (!project.name) {
          cy.get("input:invalid").should("have.length", 1);
          cy.createProject({ ...project, name: defaultProjectName });
        }

        cy.data("project-name")
          .eq(0)
          .should("have.text", project.name || defaultProjectName);
      }

      cy.get("tbody").find("tr").should("have.length", projects.length);
    });
  });

  it("should create and edit the projects properly", () => {
    cy.fixture<Array<Project & { editName: string }>>("projects").then((projects) => {
      for (const project of projects) {
        cy.visit("/projects/new");

        if (!project.name) {
          cy.get("input:invalid").should("have.length", 1);
          cy.createProject({ ...project, name: defaultProjectName });
        } else {
          cy.createProject(project);
        }

        cy.data("project-name").eq(0).as("projectName");

        cy.get("@projectName").should("have.text", project.name || defaultProjectName);

        cy.get("tbody").find("tr").eq(0).find("a").contains("editar projeto", { matchCase: false }).click();

        cy.data("edit-project").should("have.value", project.name || defaultProjectName);

        cy.editProject({
          name: project.editName,
        });

        cy.get("@projectName").eq(0).should("have.text", project.editName);
      }
    });
  });

  it("should remove the project properly", () => {
    cy.fixture<Project[]>("projects").then((projects) => {
      for (const project of projects.slice(0, 3)) {
        cy.visit("/projects/new");
        cy.createProject(project);
      }
    });

    cy.data("delete-project-button").eq(0).click();

    cy.get("tbody").find("tr").should("have.length", 2);
  });

  it("should filter the projects properly", () => {
    const projects = [
      {
        name: "Javascript Course",
      },
      {
        name: "Typescript Course",
      },
      {
        name: "Testing tutorial",
      },
    ];

    for (const project of projects) {
      cy.visit("/projects/new");
      cy.createProject(project);
    }

    cy.data("search-project").as("searchInput");

    cy.get("@searchInput").type("course");

    cy.get("tbody").find("tr").should("have.length", 2);

    cy.get("@searchInput").clear().type("test");

    cy.get("tbody").find("tr").should("have.length", 1);

    cy.get("@searchInput").clear();

    cy.get("tbody").find("tr").should("have.length", projects.length);
  });

  it("should link task to a project properly", () => {
    const project = {
      name: "Javascript Course",
    };

    const tasks = [
      {
        title: "Operators And Expression Class",
        time: 250,
        project: project.name,
      },
      {
        title: "Loops Class",
        time: 200,
        project: project.name,
      },
    ];

    cy.visit("/");

    cy.get("a").contains("projetos", { matchCase: false }).as("projectsPageLink");

    cy.get("@projectsPageLink").click();
    cy.data("create-project-link").click();
    cy.createProject(project);

    cy.get("a").contains("tarefas", { matchCase: false }).click();

    for (const task of tasks) {
      cy.data("create-task-link").click();
      cy.createTask(task);
    }

    cy.get("@projectsPageLink").click();

    cy.data("project-tasks-quantity").should("contain.text", tasks.length);
  });

  it("should allow to delete the project with related tasks without delete the tasks", () => {
    const project = {
      name: "Javascript Course",
    };

    const tasks = [
      {
        title: "Operators And Expression Class",
        time: 250,
        project: project.name,
      },
      {
        title: "Loops Class",
        time: 200,
        project: project.name,
      },
    ];

    cy.visit("/");

    cy.get("a").contains("projetos", { matchCase: false }).as("projectsPageLink");

    cy.get("@projectsPageLink").click();
    cy.data("create-project-link").click();
    cy.createProject(project);

    cy.get("a").contains("tarefas", { matchCase: false }).click();

    for (const task of tasks) {
      cy.data("create-task-link").click();
      cy.createTask(task);
    }

    cy.get("@projectsPageLink").click();

    cy.data("project-tasks-quantity").should("contain.text", tasks.length);
    
    cy.data("delete-project-button").eq(0).click()

    cy.get("tbody").should("not.exist")

    cy.get("a").contains("tarefas", { matchCase: false }).click()
    cy.data("task-project").each((element) => {
      cy.wrap(element).should("contain.text", "Projeto N/D")
    })
  })
});
