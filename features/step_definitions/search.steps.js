const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require('./lib/commands.js');

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('Navigation menu is loaded', async function () {
  return await this.page.waitForSelector("nav.page-nav");
});

When('I click the second day in the navigation menu', async () => {
  await clickElement(this.page, "nav.page-nav .page-nav__day:nth-child(2)");
});

When('I click the first movie seance time', async () => {
  await clickElement(this.page, ".movie-seances__time:nth-child(1)");
});

When('I click the first {string} chair in the buying scheme', async (chairType) => {
  await clickElement(this.page, `.buying-scheme__wrapper .buying-scheme__chair_${chairType}:nth-child(1)`);
});

When('I click the accept button', async () => {
  await clickElement(this.page, ".acceptin-button");
});

Then('I should see ticket details with cost {string}', async (expectedCost) => {
  await this.page.waitForSelector(".ticket__info .ticket__details", { visible: true });
  const actual = await this.page.$eval(".ticket__info .ticket__details", link => link.textContent);
  expect(actual).toEqual(expectedCost);
});

Then('the accept button should be disabled', async () => {
  const actual = await this.page.$eval(".acceptin-button", button => button.disabled);
  expect(actual).toEqual(true);
});