const { chromium } = require("playwright");
const { email, pass } = require("../user");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click("text=Войти по почте");
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', email);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', pass);
  await page.click('[data-testid="login-submit-btn"]');
  await page.pause();
  await expect(
    page
      .locator('[data-testid="profile-programs-content"]')
      .textContentText("Моё обучение")
  );

  //assertion
  await browser.close();
})();
