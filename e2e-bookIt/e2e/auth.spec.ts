import { test, expect } from "@playwright/test";

const FRONT_END = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(FRONT_END);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Log In" })).toBeVisible();

  await page.locator("[name=email]").fill("test@mydomain.com");
  await page.locator("[name=password]").fill("1234567890");

  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByText("Login Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();

  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
