const { Given, When, Then } = require("@cucumber/cucumber");
const { UniversalSteps } = require("../pages/UniversalSteps");

Then(
  /^I add a cookie to change the language to (.*)$/,
  async function (language) {
    const universalSteps = new UniversalSteps();

    await universalSteps.changeLanguageTo(language);
  }
);
