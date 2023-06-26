const { Given, When, Then } = require("@cucumber/cucumber");

When(
  /^I add a cookie to change the language to (.*)$/,
  async function (language) {
    //universalSteps.changeLanguageTo(language);
  }
);
