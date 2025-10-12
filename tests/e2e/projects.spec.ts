import type { Project } from "@src/types/Project";
import { expect, test } from "@playwright/test";
import projectsFixture from "../fixtures/projects.json" assert { type: "json" };
import {
  createProject,
  createTask,
  data,
  editProject,
} from "./support/helpers";

const defaultProjectName = "Default name";

test.describe("Project - User Journey", () => {
  test("should create a bulk of projects and render them properly", async ({
    page,
  }) => {
    await page.goto("/#/projects");

    await expect(page.locator("div[role=\"alert\"]")).toBeVisible();

    await data(page, "create-project-link").click();

    await expect(page).toHaveURL(/\/projects\/new/);

    const projects: Project[] = projectsFixture as Project[];

    for (const project of projects) {
      await page.goto("/#/projects/new");

      await createProject(page, project);

      if (!project.name) {
        await expect(page.locator("input:invalid")).toHaveCount(1);
        await createProject(page, { ...project, name: defaultProjectName });
      }

      await expect(data(page, "project-name").nth(0)).toHaveText(
        project.name || defaultProjectName,
      );
    }

    await expect(page.locator("tbody").locator("tr")).toHaveCount(
      projects.length,
    );
  });

  test("should create and edit the projects properly", async ({ page }) => {
    const projects: Array<Project & { editName: string }>
      = projectsFixture as Array<Project & { editName: string }>;

    for (const project of projects) {
      await page.goto("/#/projects/new");

      if (!project.name) {
        await expect(page.locator("input:invalid")).toHaveCount(1);
        await createProject(page, { ...project, name: defaultProjectName });
      }
      else {
        await createProject(page, project);
      }

      const projectName = data(page, "project-name").nth(0);

      await expect(projectName).toHaveText(project.name || defaultProjectName);

      await page
        .locator("tbody")
        .locator("tr")
        .nth(0)
        .locator("a")
        .filter({ hasText: /editar projeto/i })
        .click();

      await expect(data(page, "edit-project")).toHaveValue(
        project.name || defaultProjectName,
      );

      await editProject(page, {
        name: project.editName,
      });

      await expect(projectName).toHaveText(project.editName);
    }
  });

  test("should remove the project properly", async ({ page }) => {
    const projects: Project[] = projectsFixture as Project[];

    for (const project of projects.slice(0, 3)) {
      await page.goto("/#/projects/new");
      await createProject(page, project);
    }

    page.on("dialog", dialog => dialog.accept());

    await data(page, "delete-project-button").nth(0).click();

    await expect(page.locator("tbody").locator("tr")).toHaveCount(2);
  });

  test("should filter the projects properly", async ({ page }) => {
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
      await page.goto("/#/projects/new");
      await createProject(page, project);
    }

    const searchInput = data(page, "search-project");

    await searchInput.fill("course");

    await expect(page.locator("tbody").locator("tr")).toHaveCount(2);

    await searchInput.clear();

    await searchInput.fill("test");

    await expect(page.locator("tbody").locator("tr")).toHaveCount(1);

    await searchInput.clear();

    await expect(page.locator("tbody").locator("tr")).toHaveCount(
      projects.length,
    );
  });

  test("should link task to a project properly", async ({ page }) => {
    const project = {
      name: "Javascript Course",
    };

    const tasks = [
      {
        id: "",
        title: "Operators And Expression Class",
        time: 250,
        project: project.name,
      },
      {
        id: "",
        title: "Loops Class",
        time: 200,
        project: project.name,
      },
    ];

    await page.goto("/#/");

    const projectsPageLink = page.locator("a").filter({ hasText: /projetos/i });

    await projectsPageLink.click();
    await data(page, "create-project-link").click();
    await createProject(page, project);

    await page
      .locator("a")
      .filter({ hasText: /tarefas/i })
      .click();

    for (const task of tasks) {
      await data(page, "create-task-link").click();
      await createTask(page, task);
    }

    await projectsPageLink.click();

    await expect(data(page, "project-tasks-quantity")).toContainText(
      tasks.length.toString(),
    );
  });

  test("should allow to delete the project with related tasks without delete the tasks", async ({
    page,
  }) => {
    const project = {
      name: "Javascript Course",
    };

    const tasks = [
      {
        id: "",
        title: "Operators And Expression Class",
        time: 250,
        project: project.name,
      },
      {
        id: "",
        title: "Loops Class",
        time: 200,
        project: project.name,
      },
    ];

    await page.goto("/#/");

    const projectsPageLink = page.locator("a").filter({ hasText: /projetos/i });

    await projectsPageLink.click();
    await data(page, "create-project-link").click();
    await createProject(page, project);

    await page
      .locator("a")
      .filter({ hasText: /tarefas/i })
      .click();

    for (const task of tasks) {
      await data(page, "create-task-link").click();
      await createTask(page, task);
    }

    await projectsPageLink.click();

    await expect(data(page, "project-tasks-quantity")).toContainText(
      tasks.length.toString(),
    );

    page.on("dialog", dialog => dialog.accept());

    await data(page, "delete-project-button").nth(0).click();

    await expect(page.locator("tbody")).not.toBeVisible();

    await page
      .locator("a")
      .filter({ hasText: /tarefas/i })
      .click();
    for (const element of await page
      .locator("[data-testid=\"task-project\"]")
      .all()) {
      await expect(element).toContainText("Projeto N/D");
    }
  });
});
