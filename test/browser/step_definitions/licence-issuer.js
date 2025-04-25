const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { LicenceIssuerPage } = require("../pages");
const { injectAxe } = require("axe-playwright");

When(/^they (?:have )?start(?:ed)? the DL journey$/, async function () {});

Given(/they (?:can )?see? the licence-issuer page$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
});

Given(
  /^I click the continue button without selecting a radio button option$/,
  async function () {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.continue();
  }
);

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

Given(/^The cookie banner is displayed$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.cookieBannerDisplayed();
});

Then(
  /^I check the Cookies page Title (.*)$/,
  async function (cookiesPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCookiesPolicyPageTitle(cookiesPageTitle);
  }
);

Then(
  /^I see the Device Intelligence Cookie (.*)$/,
  async function (deviceIntelligenceCookieName) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);

    await licenceIssuerPage.checkDeviceIntelligenceCookie(
      deviceIntelligenceCookieName
    );
  }
);

Given(/^The beta banner is displayed$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.betaBannerDisplayed();
});

When(/^User clicks on the Accept Cookie Button$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickCookieAcceptButton();
});

When(/^User clicks on the Reject Cookie Button$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickCookieRejectButton();
});

When(/^User clicks on the View Cookies Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickViewCookiesLink();
});

When(/^I see the radio button for DVLA$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.selectDVLARadioButton();
});

Then(
  /^The DVLA Radio button label reads (.*)$/,
  async function (firstRadioButton) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.dvlaRadioButtonLabel(firstRadioButton);
  }
);

Then(
  /^The DVLA Hint text reads (.*)$/,
  async function (firstRadioButtonHintText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.dvlaRadioButtonLabelHintText(
      firstRadioButtonHintText
    );
  }
);

Then(
  /^The DVA Hint text reads (.*)$/,
  async function (secondRadioButtonHintText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.dvaRadioButtonLabelHintText(
      secondRadioButtonHintText
    );
  }
);

When(/^I see the radio button for DVA$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.selectDVARadioButton();
});

Then(
  /^The DVA Radio button label reads (.*)$/,
  async function (secondRadioButton) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.dvaRadioButtonLabel(secondRadioButton);
  }
);

When(
  /^I see the radio button for I do not have a UK photocard driving licence$/,
  async function () {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.selectNoDrivingLicenceRadioButton();
  }
);

Then(
  /^The third Radio button label reads (.*)$/,
  async function (thirdRadioButton) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.noDrivingLicenceRadioButtonLabel(thirdRadioButton);
  }
);

Then(
  /^I see the Drop Down link for (.*)$/,
  async function (dropDownSummaryLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.dropDownSummaryLinkText(dropDownSummaryLinkText);
  }
);

Then(/^User clicks the Drop Down button$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickDropDownSummaryLink();
});

Then(/^I see the drop down text as (.*)$/, async function (dropDownLinkText) {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.assertDropDownLinkText(dropDownLinkText);
});

Then(/^User click the change your cookie settings link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickChangeCookieSettingsLink();
});

Then(
  /^I see the Cookie Banner Accept text as (.*)$/,
  async function (cookieAcceptSummaryText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCookieBannerAcceptText(
      cookieAcceptSummaryText
    );
  }
);

Then(
  /^I see the Cookie Banner Reject text as (.*)$/,
  async function (cookieRejectSummaryText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCookieBannerRejectText(
      cookieRejectSummaryText
    );
  }
);

Then(/^User clicks on the Accept Hide this message button$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickHideThisMessageCookieButton();
});

Then(/^User clicks on the Reject Hide this message button$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickHideThisMessageCookieButton();
});

Then(/^The beta banner reads (.*)$/, async function (betaBannerText) {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.assertBetaBannerText(betaBannerText);
});

Then(/^User clicks on the Feedback Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickBetaBannerFeedbackLink();
});

Then(
  /^I check the Feedback page Title (.*)$/,
  async function (feedbackPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFeedbackPageTitle(feedbackPageTitle);
  }
);

Then(
  /^I see the Accessibility statement footer link with the text (.*)$/,
  async function (accessibilityStatementLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertAccessibilityStatementLinkText(
      accessibilityStatementLinkText
    );
  }
);

Then(/^User clicks the Accessibiliy statement Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickAccessibilityStatementLink();
});

Then(
  /^I check the Accessibiliy statement page Title (.*)$/,
  async function (accessibilityStatementPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertAccessibilityStatementPageTitle(
      accessibilityStatementPageTitle
    );
  }
);

Then(
  /^I see the Cookies footer link with the text (.*)$/,
  async function (cookiesLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCookiesLinkText(cookiesLinkText);
  }
);

Then(/^User clicks the Cookies Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickCookiesLink();
});

Then(
  /^I see the Terms and conditions footer link with the text (.*)$/,
  async function (termsAndConditionsLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertTermsAndConditionsLinkText(
      termsAndConditionsLinkText
    );
  }
);

Then(/^User clicks the Terms and conditions Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickTermsAndConditionsLink();
});

Then(
  /^I check the Terms and conditions page Title (.*)$/,
  async function (termsAndConditionsPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertTermsAndConditionsPageTitle(
      termsAndConditionsPageTitle
    );
  }
);

Then(
  /^I see the Privacy notice footer link with the text (.*)$/,
  async function (privacyNoticeLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertPrivacyNoticeLinkText(privacyNoticeLinkText);
  }
);

Then(/^User clicks the Privacy notice Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickPrivacyNoticeLink();
});

Then(
  /^I check the Privacy notice page Title (.*)$/,
  async function (privacyNoticePageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertPrivacyNoticePageTitle(
      privacyNoticePageTitle
    );
  }
);

Then(
  /^I see the Support footer link with the text (.*)$/,
  async function (supportLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertSupportLinkText(supportLinkText);
  }
);

Then(/^User clicks the Support Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickSupportLink();
});

Then(
  /^I check the Support page Title (.*)$/,
  async function (supportPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertSupportPageTitle(supportPageTitle);
  }
);

Then(
  /^I see the Crown Copyright footer link with the text (.*)$/,
  async function (crownCopyrightLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCrownCopyrightLinkText(
      crownCopyrightLinkText
    );
  }
);

Then(/^User clicks the Crown Copyright Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickCrownCopyrightLink();
});

Then(
  /^I check the Crown Copyright page Title (.*)$/,
  async function (crownCopyrightPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCrownCopyrightPageTitle(
      crownCopyrightPageTitle
    );
  }
);

Then(
  /^I see the OGL footer link with the text (.*)$/,
  async function (openGovernmentLicenceLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertOpenGovernmentLicenceLinkText(
      openGovernmentLicenceLinkText
    );
  }
);

Then(/^User clicks the OGL Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickOpenGovernmentLicenceLink();
});

Then(
  /^I check the OGL page Title (.*)$/,
  async function (openGovernmentLicencePageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertOpenGovernmentLicencePageTitle(
      openGovernmentLicencePageTitle
    );
  }
);

Then(
  /^I see the GOV.UK footer link with the text (.*)$/,
  async function (govUkLinkText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertGovUkLinkText(govUkLinkText);
  }
);

Then(/^User clicks the GOV.UK Link$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.clickGovUkLink();
});

Then(/^I check the GOV.UK page Title (.*)$/, async function (govUkPageTitle) {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.assertGovUkPageTitle(govUkPageTitle);
});

Then(
  /^I should be on the Landing Page with Page Title (.*)$/,
  async function (dlLandingPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertDlLandingPageTitle(dlLandingPageTitle);
  }
);

Then(
  /^I see the Landing Page Title Summary Text (.*)$/,
  async function (dlLandingPageTitleSummary) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertDlLandingPageTitleSummary(
      dlLandingPageTitleSummary
    );
  }
);

Then(
  /^I see the Error Text (.*)$/,
  async function (noRadioButtonSelectTitleError) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertTitleError(noRadioButtonSelectTitleError);
  }
);

Then(
  /^I see the Error Summary Text (.*)$/,
  async function (noRadioButtonSelectTitleSummaryError) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertTitleErrorSummary(
      noRadioButtonSelectTitleSummaryError
    );
  }
);

Then(
  /^I see the Hint Error Summary Text (.*)$/,
  async function (noRadioButtonSelectHintSummaryError) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertHintErrorSummary(
      noRadioButtonSelectHintSummaryError
    );
  }
);
