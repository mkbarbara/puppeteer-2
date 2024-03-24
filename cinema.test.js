const { clickElement } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.waitForSelector("nav.page-nav");
  await clickElement(page, "nav.page-nav .page-nav__day:nth-child(2)");
  await clickElement(page, ".movie-seances__time:nth-child(1)");
});

afterEach(() => {
  page.close();
});

describe("Booking tickets tests", () => {
  test("Success booking one place", async () => {
    await clickElement(page, ".buying-scheme__wrapper .buying-scheme__chair_standart:nth-child(1)");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__info .ticket__details", {
      visible: true,
    });
    const actual = await page.$eval(".ticket__info .ticket__details", link => link.textContent);
    expect(actual).toEqual("150");
  });

  test("Success booking vip place", async () => {
    await clickElement(page, ".buying-scheme__wrapper .buying-scheme__chair_vip:nth-child(1)");
    await clickElement(page, ".acceptin-button");
    await page.waitForSelector(".ticket__info .ticket__details", {
      visible: true,
    });
    const actual = await page.$eval(".ticket__info .ticket__details", link => link.textContent);
    expect(actual).toEqual("350");
  });

  test("Cant book busy place", async () => {
    await clickElement(page, ".buying-scheme__wrapper .buying-scheme__chair_taken:nth-child(1)");
    const actual = await page.$eval(".acceptin-button", button => button.disabled);
    expect(actual).toEqual(true);
  });
});
