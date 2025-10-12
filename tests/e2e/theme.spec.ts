import { expect, test } from "@playwright/test";

test.describe("Theme of Application", () => {
  test("should be change the theme properly", async ({ page }) => {
    await page.goto("/#");

    const isDarkTheme = await page.evaluate(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

    const toggleTheme = page.locator("label").locator("[data-testid=\"toggle-theme\"]");
    const themeElement = page.locator(":root");

    if (isDarkTheme) {
      await expect(toggleTheme).toBeChecked();
      await toggleTheme.uncheck({ force: true });
      await expect(toggleTheme).not.toBeChecked();
    }
    else {
      await expect(toggleTheme).not.toBeChecked();
      await toggleTheme.check({ force: true });
      await expect(toggleTheme).toBeChecked();
    }

    await expect(themeElement).toHaveAttribute("data-theme", isDarkTheme ? "light" : "dark");

    if (isDarkTheme) {
      await toggleTheme.check({ force: true });
    }
    else {
      await toggleTheme.uncheck({ force: true });
    }

    await expect(themeElement).toHaveAttribute("data-theme", isDarkTheme ? "dark" : "light");
  });

  test("should get value of localStorage", async ({ page }) => {
    await page.goto("/#");

    const isDarkTheme = await page.evaluate(() => window.matchMedia("(prefers-color-scheme: dark)").matches);

    let value = await page.evaluate(() => localStorage.getItem("theme"));
    expect(value).toBeNull();

    const toggleTheme = page.locator("label").locator("[data-testid=\"toggle-theme\"]");
    const themeElement = page.locator(":root");

    if (isDarkTheme) {
      await expect(toggleTheme).toBeChecked();
      await toggleTheme.uncheck({ force: true });
      await expect(toggleTheme).not.toBeChecked();
    }
    else {
      await expect(toggleTheme).not.toBeChecked();
      await toggleTheme.check({ force: true });
      await expect(toggleTheme).toBeChecked();
    }

    await expect(themeElement).toHaveAttribute("data-theme", isDarkTheme ? "light" : "dark");

    value = await page.evaluate(() => localStorage.getItem("theme"));
    expect(value).toBe(isDarkTheme ? "light" : "dark");

    if (isDarkTheme) {
      await toggleTheme.check({ force: true });
    }
    else {
      await toggleTheme.uncheck({ force: true });
    }

    await expect(themeElement).toHaveAttribute("data-theme", isDarkTheme ? "dark" : "light");

    value = await page.evaluate(() => localStorage.getItem("theme"));
    expect(value).toBe(isDarkTheme ? "dark" : "light");

    await page.reload();

    await expect(themeElement).toHaveAttribute("data-theme", isDarkTheme ? "dark" : "light");

    value = await page.evaluate(() => localStorage.getItem("theme"));

    expect(value).toBe(isDarkTheme ? "dark" : "light");
  });
});
