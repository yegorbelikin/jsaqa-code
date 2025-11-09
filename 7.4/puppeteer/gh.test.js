let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Where the world builds software · GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 60000);
});

describe("Three more tests", () => {
  test("Copilot", async () => {
    await page.goto("https://github.com/features/copilot");
    const title = await page.title();
    expect(title).toContain("GitHub Copilot · Your AI pair programmer");
  }, 60000);

  test("Security", async () => {
    await page.goto(
      "https://github.com/security/advanced-security/secret-protection"
    );
    const title = await page.title();
    expect(title).toContain("GitHub Secret Protection");
  }, 60000);

  test("Why github", async () => {
    await page.goto("https://github.com/why-github");
    const title = await page.title();
    expect(title).toContain("GitHub · Why Choose GitHub?");
  }, 60000);
});
