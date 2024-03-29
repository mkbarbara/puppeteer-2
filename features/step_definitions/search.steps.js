const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement } = require('../../lib/commands.js');

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

Given("I am on the home page", async function () {
  return await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
    setTimeout: 60000,
  });
});

When('I click the second day in the navigation menu', async function () {
  return await clickElement(this.page, "nav.page-nav .page-nav__day:nth-child(2)");
});

When('I click the first movie seance time', async function () {
  return await clickElement(this.page, ".movie-seances__time:nth-child(1)");
});

When('I click the first {string} chair in the buying scheme', async function (string) {
  return await clickElement(this.page, `.buying-scheme__chair.buying-scheme__chair_${string}`);
});

When('I click the accept button', async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then('I should see ticket details with cost {string}', async function (string) {
  await this.page.waitForSelector(".ticket__details.ticket__cost", { visible: true });
  const actual = await this.page.$eval(".ticket__details.ticket__cost", link => link.textContent);
  expect(actual).equal(string);
});

Then('the accept button should be disabled', async function () {
  const actual = await this.page.$eval(".acceptin-button", button => button.disabled);
  expect(actual).equal(true);
});