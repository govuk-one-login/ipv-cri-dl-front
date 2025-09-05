const { Given, When, Then } = require("@cucumber/cucumber");
const { UniversalSteps } = require("../pages/UniversalSteps");
const { expect: expect } = require("chai");

Then(
  /^I add a cookie to change the language to (.*)$/,
  { timeout: 2 * 5000 },
  async function (language) {
    const universalSteps = new UniversalSteps(this.page, this.page.url());
    await universalSteps.changeLanguageTo(language);
  }
);

Then(/^User clicks the back button$/, async function () {
  const universalSteps = new UniversalSteps(this.page);
  await universalSteps.clickBackButton();
});

Then(/^User starts the Console Listener$/, async function () {
  const universalSteps = new UniversalSteps(this.page);
  this.consoleMessages = await universalSteps.setupConsoleListener(this.page); // Store in world object
});

Then(/^There are no console errors on the page$/, async function () {
  await this.page.waitForTimeout(2000);
  const errorMessages = this.consoleMessages.filter(
    (msg) => msg.type === "error"
  ); // Access from world object
  expect(errorMessages, `Console errors: ${JSON.stringify(errorMessages)}`).to
    .be.empty;
});
