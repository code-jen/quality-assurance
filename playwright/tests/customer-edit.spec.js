/*
  To run the Test locally, 
  please make sure to set your Login Data 
  as Environment variables
*/
import { test, expect } from '@playwright/test';

test.beforeEach('Login on Dashboard', async ({ page }) => {

  const email = process.env.DASHBOARD_MAIL;
  const password = process.env.DASHBOARD_PASSWORD;
  const webUrl = process.env.DASHBOARD_WEBURL;

  await page.goto(webUrl);
  await page.locator('#email').pressSequentially(email);
  await page.locator('#password').pressSequentially(password);
  await page.locator('[type="submit"]').click();

});

test('Change customer Data', async ({ page }) => {

  // navigate to customers
  await page.locator('.header-contacts').getByText('Customers').click();
  await page.locator('a[href="#/users"]').click();
  expect(page.locator('h1').getByText('Customers').isVisible).toBeTruthy();
  
  // select first User
  await page.locator('#user-overview tbody tr:first-child a').click();
  expect(page.locator('h4').getByText('User Details').isVisible).toBeTruthy();
  await page.locator('.details-footer .edit-button').click();
  expect(await page.inputValue('[data-vv-as="E-Mail"]')).toBe('max.mustermann@helloagain.at');
  expect(await page.inputValue('#first_name')).toBe('Max');

  // update firstname
  await page.locator('#first_name').clear();
  await page.locator('#first_name').pressSequentially('Maximilian');
  await page.locator('.details-footer .update-button').click();
  await page.waitForTimeout(1000);
  
  // verify name change
  expect(await page.locator('.user-data .name').textContent()).toBe('Maximilian Mustermann');
});

test.afterEach('Change name back to Max and close Browser', async ({ page }) => {
  await page.locator('.details-footer .edit-button').click();
  await page.locator('#first_name').clear();
  await page.locator('#first_name').pressSequentially('Max');
  await page.locator('.details-footer .update-button').click();
  page.close();
});