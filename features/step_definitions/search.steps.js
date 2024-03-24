const { Given, When, Then } = require('@cucumber/cucumber');
const { clickElement } = require('./lib/commands.js');

let page;

Given('I navigate to {string}', async (url) => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(url);
});

Given('I wait for the navigation menu to appear', async () => {
  await page.waitForSelector("nav.page-nav");
});

When('I click the second day in the navigation menu', async () => {
  await clickElement(page, "nav.page-nav .page-nav__day:nth-child(2)");
});

When('I click the first movie seance time', async () => {
  await clickElement(page, ".movie-seances__time:nth-child(1)");
});

When('I click the first {string} chair in the buying scheme', async (chairType) => {
  await clickElement(page, `.buying-scheme__wrapper .buying-scheme__chair_${chairType}:nth-child(1)`);
});

When('I click the accept button', async () => {
  await clickElement(page, ".acceptin-button");
});

Then('I should see ticket details with cost {string}', async (expectedCost) => {
  await page.waitForSelector(".ticket__info .ticket__details", { visible: true });
  const actual = await page.$eval(".ticket__info .ticket__details", link => link.textContent);
  expect(actual).toEqual(expectedCost);
});

Then('the accept button should be disabled', async () => {
  const actual = await page.$eval(".acceptin-button", button => button.disabled);
  expect(actual).toEqual(true);
});

After(async () => {
  await page.close();
});
