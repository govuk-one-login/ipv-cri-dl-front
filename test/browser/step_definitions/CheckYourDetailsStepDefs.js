const { Given, When, Then } = require("@cucumber/cucumber");
const { CheckYourDetailsPage } = require("../pages/CheckYourDetailsPage");
const { expect } = require("chai");
const { injectAxe } = require("axe-playwright");

Then(
  /^I should be on the Driving Licence check your details page (.*)$/,
  async function (checkYourDetailsPageTitle) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertCheckYourDetailsPageTitle(
      checkYourDetailsPageTitle
    );
  }
);

Then(
  /^I run the Axe Accessibility check against the Driving Licence check your details page$/,
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
  /^I click on the Yes radio button$/,
  { timeout: 2 * 5000 },
  async function () {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    expect(checkYourDetailsPage.isCurrentPage()).to.be.true;
    await checkYourDetailsPage.clickOnYesRadioButton();
  }
);

When(
  /^I click on the No radio button$/,
  { timeout: 2 * 5000 },
  async function () {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    expect(checkYourDetailsPage.isCurrentPage()).to.be.true;
    await checkYourDetailsPage.clickOnNoRadioButton();
  }
);

Then(
  /^I view the (.*) banner on the check your answers page$/,
  { timeout: 2 * 5000 },
  async function (betaBannerLabel) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertBetaBanner(betaBannerLabel);
  }
);

Then(
  /^the beta banner on the check your answers page reads (.*)$/,
  async function (betaBannerText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertBetaBannerText(betaBannerText);
  }
);

Then(
  /^I click on the Confirm and Continue button$/,
  { timeout: 2 * 5000 },
  async function () {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    expect(checkYourDetailsPage.isCurrentPage()).to.be.true;
    await checkYourDetailsPage.continue();
  }
);

Then(
  /^I see the check your answers accessibility statement link (.*)$/,
  async function (footerAccessibilityStatementText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterAccessibilityStatementText(
      footerAccessibilityStatementText
    );
  }
);

Then(
  /^I see the check your answers cookies link (.*)$/,
  async function (footerCookieText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterCookieText(footerCookieText);
  }
);

Then(
  /^I see the check your answers terms and conditions link (.*)$/,
  async function (footerTermsAndConditionsText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterTermsAndConditonsText(
      footerTermsAndConditionsText
    );
  }
);

Then(
  /^I see the check your answers privacy notice link (.*)$/,
  async function (footerPrivacyNoticeText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterPrivacyNoticeText(
      footerPrivacyNoticeText
    );
  }
);

Then(
  /^I see the check your answers support link (.*)$/,
  async function (footerSupportText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterSupportText(footerSupportText);
  }
);

Then(
  /^I see the check your answers OLG link (.*)$/,
  async function (footerOpenGovernmentLicenceText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterOpenGovernmentLicenceText(
      footerOpenGovernmentLicenceText
    );
  }
);

Then(
  /^I see the check your answers crown copyright link (.*)$/,
  async function (footerCrownCopyrightText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFooterCrownCopyrightText(
      footerCrownCopyrightText
    );
  }
);

Then(
  /^I can see the check details lastName as (.*)$/,
  async function (checkYourDetailsLastName) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertLastName(checkYourDetailsLastName);
  }
);

Then(
  /^I can see the check details givenNames as (.*)$/,
  async function (checkYourDetailsGivenNames) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertGivenNames(checkYourDetailsGivenNames);
  }
);

Then(
  /^I can see the check details dob as (.*)$/,
  async function (checkYourDetailsDob) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertDob(checkYourDetailsDob);
  }
);

Then(
  /^I can see the check details issueDate as (.*)$/,
  async function (checkYourDetailsIssueDate) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertIssueDate(checkYourDetailsIssueDate);
  }
);

Then(
  /^I can see the check details validTo as (.*)$/,
  async function (checkYourDetailsValidTo) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertValidTo(checkYourDetailsValidTo);
  }
);

Then(
  /^I can see the check details formatted dob value as (.*)$/,
  async function (checkYourDetailsDobFormatttedValue) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFormattedDobValue(
      checkYourDetailsDobFormatttedValue
    );
  }
);

Then(
  /^I can see the check details formatted issueDate value as (.*)$/,
  async function (checkYourDetailsIssueDateFormatttedValue) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFormattedIssueDateValue(
      checkYourDetailsIssueDateFormatttedValue
    );
  }
);

Then(
  /^I can see the check details formatted validTo value as (.*)$/,
  async function (checkYourDetailsValidToFormatttedValue) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertFormattedValidToValue(
      checkYourDetailsValidToFormatttedValue
    );
  }
);

Then(
  /^I can see the check details licenceNumber as (.*)$/,
  async function (checkYourDetailsLicenceNumber) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertLicenceNumber(
      checkYourDetailsLicenceNumber
    );
  }
);

Then(
  /^I can see the DVA check details postcode as (.*)$/,
  async function (checkYourDetailsDvaPostcode) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertDvaPostcode(checkYourDetailsDvaPostcode);
  }
);

Then(
  /^I can see the DVLA check details postcode as (.*)$/,
  async function (checkYourDetailsDvlaPostcode) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertDvlaPostcode(checkYourDetailsDvlaPostcode);
  }
);

Then(
  /^I can see the DVLA check details issueNumber as (.*)$/,
  async function (checkYourDetailsIssueNumber) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertIssueNumber(checkYourDetailsIssueNumber);
  }
);

Then(
  /^I can see the DVA check details warning text as (.*)$/,
  async function (checkYourDetailsWarningText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertWarningText(checkYourDetailsWarningText);
  }
);

Then(
  /^I can see the check details driving licence details correct as (.*)$/,
  async function (checkYourDetailsDrivingLicenceDetailsCorrectText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertDrivingLicenceDetailsCorrectText(
      checkYourDetailsDrivingLicenceDetailsCorrectText
    );
  }
);

Then(
  /^I can see the check details hint text as (.*)$/,
  async function (checkYourDetailsHintTextText) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.assertHintText(checkYourDetailsHintTextText);
  }
);
