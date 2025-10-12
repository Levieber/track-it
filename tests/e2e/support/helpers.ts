import type { Page } from "@playwright/test";
import type { Project } from "@src/types/Project";
import type { Task } from "@src/types/Task";

export async function createTask(page: Page, task: Omit<Task, "id">) {
  if (task.title) {
    await page.locator(selectors("create-task")).fill(task.title);
  }

  await page.clock.install();

  await page.locator(selectors("start-timer")).click();

  await page.clock.fastForward(task.time * 1000);

  await page.locator(selectors("stop-timer")).click();

  await page.clock.resume();

  if (task.project) {
    await page.locator(selectors("link-project")).selectOption(task.project);
  }

  await page.locator(selectors("save-task-button")).click();
}

export async function editTask(
  page: Page,
  newContent: Omit<Partial<Task>, "id">,
) {
  if (newContent.time) {
    await page.clock.install();

    await page.locator(selectors("start-timer")).click();

    await page.clock.fastForward(newContent.time * 1000);

    await page.locator(selectors("stop-timer")).click();

    await page.clock.resume();
  }

  if (newContent.title) {
    await page.locator(selectors("edit-task")).clear();
    await page.locator(selectors("edit-task")).fill(newContent.title);
  }

  if (newContent.project) {
    await page
      .locator(selectors("link-project"))
      .selectOption(newContent.project);
  }

  await page.locator("[data-testid=\"save-task-button\"]").click();
}

export async function createProject(
  page: Page,
  project: Omit<Partial<Project>, "id">,
) {
  if (project.name) {
    await page.locator(selectors("create-project")).fill(project.name);
  }

  await page.locator(selectors("save-project-button")).click();
}

export async function editProject(
  page: Page,
  newContent: Omit<Partial<Project>, "id">,
) {
  if (newContent.name) {
    await page.locator(selectors("edit-project")).clear();
    await page.locator(selectors("edit-project")).fill(newContent.name);
  }

  await page.locator(selectors("save-project-button")).click();
}

function selectors(value: string) {
  return `[data-testid="${value}"]`;
}

export function data(page: Page, value: string) {
  return page.locator(selectors(value));
}
