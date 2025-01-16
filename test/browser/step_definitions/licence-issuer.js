const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { LicenceIssuerPage } = require("../pages");
const { injectAxe } = require("axe-playwright");

When(/^they (?:have )?start(?:ed)? the DL journey$/, async function () {});

Given(/they (?:can )?see? the licence-issuer page$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
});

Given(/^they (?:have )?continue(?:d)? to DL check$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);

  expect(licenceIssuerPage.isCurrentPage()).to.be.true;

  await licenceIssuerPage.continue();
});

Given(/^I click on DVLA radio button and Continue$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
  await injectAxe(this.page);
  // Run Axe for WCAG 2.2 AA rules
  const wcagResults = await this.page.evaluate(() => {
    return axe.run({
      runOnly: ["wcag2aa"]
    });
  });
  expect(wcagResults.violations, "WCAG 2.2 AAA violations found").to.be.empty;
  await licenceIssuerPage.clickOnDVLARadioButton();
});

Given(/^I click on DVA radio button and Continue$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
  await injectAxe(this.page);
  // Run Axe for WCAG 2.2 AA rules
  const wcagResults = await this.page.evaluate(() => {
    return axe.run({
      runOnly: ["wcag2aa"]
    });
  });
  expect(wcagResults.violations, "WCAG 2.2 AAA violations found").to.be.empty;
  await licenceIssuerPage.clickOnDVARadioButton();
});
