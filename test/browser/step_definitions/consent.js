const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { ConsentPage } = require("../pages/consent");
const { injectAxe } = require("axe-playwright");

Then(
  /^I should be on the DVA consent page (.*)$/,
  async function (consentPageTitle) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.assertConsentDVAPageTitle(consentPageTitle);
  }
);

Then(
  /^I should be on the DVLA consent page (.*)$/,
  async function (consentPageTitle) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.assertConsentDVLAPageTitle(consentPageTitle);
  }
);

Then(
  /^I run the Axe Accessibility check against the Driving Licence Consent page$/,
  async function () {
    await injectAxe(this.page);
    // Run Axe for WCAG 2.2 AA rules
    const wcagResults = await this.page.evaluate(() => {
      return axe.run({
        runOnly: ["wcag2aa"]
      });
    });
    expect(wcagResults.violations).to.be.empty;
  }
);

When(
  /^I click on the DVA consent checkbox$/,
  { timeout: 2 * 5000 },
  async function () {
    const consentPage = new ConsentPage(this.page);
    expect(consentPage.isCurrentPage()).to.be.true;
    await consentPage.clickOnDVAConsentCheckBox();
  }
);

When(
  /^I click on the DVLA consent checkbox$/,
  { timeout: 2 * 5000 },
  async function () {
    const consentPage = new ConsentPage(this.page);
    expect(consentPage.isCurrentPage()).to.be.true;
    await consentPage.clickOnDVLAConsentCheckBox();
  }
);

Then(
  /^I click on the Continue button$/,
  { timeout: 2 * 5000 },
  async function () {
    const consentPage = new ConsentPage(this.page);
    expect(consentPage.isCurrentPage()).to.be.true;
    await consentPage.continue();
  }
);

Then(
  /^I see the No Consent Error Text (.*)$/,
  async function (errorSummaryText) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.assertNoConsentProvidedErrorSummary(errorSummaryText);
  }
);

Then(
  /^I can see the consent page title as (.*)$/,
  async function (consentPageTitleText) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.assertConsentPageTitle(consentPageTitleText);
  }
);

Then(
  /^I can see the consent page text as (.*)$/,
  async function (consentPageText) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.assertConsentPageText(consentPageText);
  }
);
