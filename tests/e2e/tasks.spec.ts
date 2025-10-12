import type { Task } from "@src/types/Task";
import { expect, test } from "@playwright/test";
import { timerFormatter } from "@src/utils/timerFormatter";
import tasksFixture from "../fixtures/tasks.json" assert { type: "json" };
import { createTask, data, editTask } from "./support/helpers";

test.describe("Task - User Journey", () => {
  test("should create a bulk of tasks and render them properly", async ({
    page,
  }) => {
    await page.goto("/#/");

    const emptyTaskTitle = "Tarefa sem título";
    await expect(page.locator("li")).toHaveCount(1);

    await data(page, "create-task-link").click();

    await expect(page).toHaveURL(/\/tasks\/new/);

    const tasks: Task[] = tasksFixture as Task[];

    for (const task of tasks) {
      await page.goto("/#/tasks/new");
      await createTask(page, task);

      await expect(data(page, "task-title").nth(0)).toHaveText(
        task.title || emptyTaskTitle,
      );

      const hours = Math.floor(task.time / 3600);
      const minutes = Math.floor((task.time % 3600) / 60);
      const seconds = task.time % 60;

      const formattedTimeString = `${String(hours).padStart(2, "0")}:${String(
        minutes,
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      await expect(data(page, "task-timer").nth(0)).toContainText(
        formattedTimeString,
      );
    }

    await expect(page.locator("li")).toHaveCount(tasks.length);
  });

  test("should create and edit the tasks properly", async ({ page }) => {
    const defaultTaskTitle = "Tarefa sem título";

    const tasks: Array<Task & { editTitle: string }> = tasksFixture as Array<
      Task & { editTitle: string }
    >;

    for (const task of tasks) {
      await page.goto("/#/tasks/new");
      await createTask(page, task);

      const taskTitle = data(page, "task-title").nth(0);
      const taskTimer = data(page, "task-timer").nth(0);

      await expect(taskTitle).toHaveText(task.title || defaultTaskTitle);

      await expect(taskTimer).toContainText(timerFormatter(task.time));

      await page
        .locator("li")
        .nth(0)
        .locator("a")
        .filter({ hasText: /editar tarefa/i })
        .click();

      await expect(data(page, "edit-task")).toHaveValue(task.title || "");

      await editTask(page, {
        title: task.editTitle,
        time: 15,
      });

      await expect(taskTitle).toHaveText(task.editTitle);
      await expect(data(page, "task-timer").nth(0)).toContainText(
        timerFormatter(task.time + 15),
      );
    }
  });

  test("should remove the task properly", async ({ page }) => {
    const tasks: Task[] = tasksFixture as Task[];

    for (const task of tasks.slice(0, 3)) {
      await page.goto("/#/tasks/new");
      await createTask(page, task);
    }

    page.on("dialog", dialog => dialog.accept());

    await data(page, "delete-task-button").nth(0).click();

    await expect(page.locator("li")).toHaveCount(2);
  });

  test("should filter the tasks properly", async ({ page }) => {
    const tasks: Omit<Task, "id">[] = [
      {
        title: "Study Javascript",
        time: 150,
      },
      {
        title: "Study Typescript",
        time: 150,
      },
      {
        title: "Make a e2e test",
        time: 250,
      },
    ];

    for (const task of tasks) {
      await page.goto("/#/tasks/new");
      await createTask(page, task);
    }

    const searchInput = data(page, "search-task");

    await searchInput.fill("study");

    await expect(page.locator("li")).toHaveCount(2);

    await searchInput.clear();

    await searchInput.fill("test");

    await expect(page.locator("li")).toHaveCount(1);

    await searchInput.clear();

    await expect(page.locator("li")).toHaveCount(tasks.length);
  });
});
