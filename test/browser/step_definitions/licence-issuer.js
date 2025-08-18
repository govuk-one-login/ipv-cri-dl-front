const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { LicenceIssuerPage } = require("../pages");
const { injectAxe } = require("axe-playwright");

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
  await licenceIssuerPage.clickOnDVLARadioButton();
});

Given(/^I click on DVA radio button and Continue$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  expect(licenceIssuerPage.isCurrentPage()).to.be.true;
  await licenceIssuerPage.clickOnDVARadioButton();
});

Given(/^The cookie banner is displayed$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.cookieBannerDisplayed();
});

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

Then(
  /^I check the Cookies page Title (.*)$/,
  async function (cookiesPageTitle) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertCookiesPolicyPageTitle(cookiesPageTitle);
  }
);

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
  /^I see the licence issuer accessibility statement link (.*)$/,
  async function (footerAccessibilityStatementText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterAccessibilityStatementText(
      footerAccessibilityStatementText
    );
  }
);

Then(
  /^I see the licence issuer cookies link (.*)$/,
  async function (footerCookieText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterCookieText(footerCookieText);
  }
);

Then(
  /^I see the licence issuer terms and conditions link (.*)$/,
  async function (footerTermsAndConditionsText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterTermsAndConditonsText(
      footerTermsAndConditionsText
    );
  }
);

Then(
  /^I see the licence issuer privacy notice link (.*)$/,
  async function (footerPrivacyNoticeText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterPrivacyNoticeText(
      footerPrivacyNoticeText
    );
  }
);

Then(
  /^I see the licence issuer support link (.*)$/,
  async function (footerSupportText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterSupportText(footerSupportText);
  }
);

Then(
  /^I see the licence issuer OLG link (.*)$/,
  async function (footerOpenGovernmentLicenceText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterOpenGovernmentLicenceText(
      footerOpenGovernmentLicenceText
    );
  }
);

Then(
  /^I see the licence issuer crown copyright link (.*)$/,
  async function (footerCrownCopyrightText) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFooterCrownCopyrightText(
      footerCrownCopyrightText
    );
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

Given(
  /^I assert the feedback URL (.*) is correct and live$/,
  async function (expectedURL) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertFeedbackPageIsCorrectAndLive(expectedURL);
  }
);

Given(
  /^they click Footer (.*) and assert I have been redirected correctly$/,
  async function (linkName) {
    const checkPage = new LicenceIssuerPage(this.page);
    expect(checkPage.isCurrentPage()).to.be.true;
    await checkPage.assertFooterLink(linkName);
  }
);

Then(
  /^I see the GOV.UK header link with the text (.*)$/,
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

Then(/^I see the (.*) Link Text$/, async function (skipToMainContent) {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.assertSkipToMainContent(skipToMainContent);
});

Then(
  /^I run the Axe Accessibility check against the DL Landing page$/,
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

Then(/^I delete the session cookie$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.deleteSessionCookie();
});

Then(
  /^User clicks continue on the licence issuer page$/,
  { timeout: 2 * 5000 },
  async function () {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.continue();
  }
);

Then(
  /^I see the Contact the One Login team link which reads (.*)$/,
  async function (contactOneLoginTeamLink) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertContactOneLoginTeamLink(
      contactOneLoginTeamLink
    );
  }
);

Given(/^I go to the page not found URL$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.goToPage("not-found");
});

Given(
  /^I assert the link on the error page is correct and live$/,
  async function () {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertErrorLinkIsCorrectAndLive();
  }
);

Given(
  /^I assert the link on the page not found page is correct and live$/,
  async function () {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertNotFoundLinkIsCorrectAndLive();
  }
);

Then(/^I refresh the page$/, async function () {
  const licenceIssuerPage = new LicenceIssuerPage(this.page);
  await licenceIssuerPage.refreshPage();
});

Then(
  /^I see the error page heading (.*)$/,
  { timeout: 2 * 5000 },
  async function (pageHeadingErrorPage) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertErrorPageHeading(pageHeadingErrorPage);
  }
);

Then(
  /^I see the page not found heading (.*)$/,
  { timeout: 2 * 5000 },
  async function (pageHeadingNotFoundPage) {
    const licenceIssuerPage = new LicenceIssuerPage(this.page);
    await licenceIssuerPage.assertPageNotFoundHeading(pageHeadingNotFoundPage);
  }
);
