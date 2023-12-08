Cypress.Commands.add("createTask", (task) => {
  cy.clock();

  if (task.title) {
    cy.data("create-task").type(task.title);
  }

  cy.data("start-timer").click();

  cy.tick(task.time * 1000);

  cy.data("stop-timer").click();

  if (task.project) {
    cy.data("link-project").select(task.project);
  }

  cy.data("save-task-button").click();
});

Cypress.Commands.add("editTask", (newContent) => {
  if (newContent.time) {
    cy.clock();
    cy.data("start-timer").click();
    cy.tick(newContent.time * 1000);
    cy.data("stop-timer").click();
  }

  if (newContent.title) {
    cy.data("edit-task").clear();

    cy.data("edit-task").type(newContent.title);
  }

  if (newContent.project) {
    cy.data("link-project").select(newContent.project);
  }

  cy.data("save-task-button").click();
});

Cypress.Commands.add("createProject", (project) => {
  if (project.name) {
    cy.data("create-project").type(project.name);
  }

  cy.data("save-project-button").click();
});

Cypress.Commands.add("editProject", (newContent) => {
  if (newContent.name) {
    cy.data("edit-project").clear();

    cy.data("edit-project").type(newContent.name);
  }

  cy.data("save-project-button").click();
});

Cypress.Commands.add("data", (value, type = "cy") => {
  return cy.get(`[data-${type}=${value}]`);
});
