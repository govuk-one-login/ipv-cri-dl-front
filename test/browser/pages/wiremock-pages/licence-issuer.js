const { expect: expect } = require("chai");

module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/licence-issuer";
    this.radioBtnDVLA = this.page.getByLabel("DVLA");
    this.radioBtnDVA = this.page.getByLabel("DVA");
    this.radioBtnNoDrivingLicence = this.page.locator(
      'xpath=//*[@id="licenceIssuer-noLicence"]'
    );
    this.CTButton = this.page.locator('xpath=//*[@id="continue"]');
    this.betaBanner = this.page.locator("xpath=/html/body/div[2]/div");
    this.betaBannerText = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span"
    );
    this.betaBannerFeedbackLink = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span/a"
    );
    this.cookieBanner = this.page.locator(
      'xpath=//*[@id="cookies-banner-main"]'
    );
    this.cookieAcceptButton = this.page.locator(
      'xpath=//*[@id="cookies-banner-main"]/div[2]/button[1]'
    );
    this.cookieRejectButton = this.page.locator(
      'xpath=//*[@id="cookies-banner-main"]/div[2]/button[2]'
    );
    this.cookieAcceptedTestDisplayed = this.page.locator(
      'xpath=//*[@id="cookies-accepted"]/div[1]/div/div/p'
    );
    this.cookieRejectedTestDisplayed = this.page.locator(
      'xpath=//*[@id="cookies-rejected"]/div[1]'
    );
    this.hideThisMessageAcceptedButton = this.page.locator(
      'xpath=//*[@id="cookies-accepted"]/div[2]/a'
    );
    this.hideThisMessageRejectedButton = this.page.locator(
      'xpath=//*[@id="cookies-rejected"]/div[2]/a'
    );
    this.viewCookiesLink = this.page.locator(
      'xpath=//*[@id="cookies-banner-main"]/div[2]/a'
    );

    this.cookiesPageTitle = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/h1'
    );
    this.changeYourCookiesSettingsLink = this.page.locator(
      'xpath=//*[@id="cookies-accepted"]/div[1]/div/div/p/a'
    );
    this.dvlaRadioLabelText = this.page.locator(
      'xpath=//*[@id="licenceIssuer-DVLA-label"]'
    );
    this.dvlaRadioLabelHintText = this.page.locator(
      'xpath=//*[@id="licenceIssuer-item-hint"]'
    );
    this.dvaRadioLabelHintText = this.page.locator(
      'xpath=//*[@id="licenceIssuer-DVA-item-hint"]'
    );
    this.dvaRadioLabelText = this.page.locator(
      'xpath=//*[@id="licenceIssuer-DVA-label"]'
    );
    this.doNotHaveDrivingLicenceRadioLabelText = this.page.locator(
      'xpath=//*[@id="licenceIssuer-noLicence-label"]'
    );
    this.whyWeNeedToSeeThisDropDownLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/details/summary/span'
    );
    this.whyWeNeedToSeeThisDropDownText = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/details/div'
    );
    this.footerAccessibilityStatementText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/ul/li[1]/a"
    );

    this.footerCookieText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/ul/li[2]/a"
    );

    this.footerTermsAndConditionsText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/ul/li[3]/a"
    );

    this.footerPrivacyNoticeText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/ul/li[4]/a"
    );

    this.footerSupportText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/ul/li[5]/a"
    );

    this.footerOpenGovernmentLicenceText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[1]/span/a"
    );

    this.footerCrownCopyrightText = this.page.locator(
      "xpath=//html/body/footer/div/div/div[2]/a"
    );

    this.govUkLink = this.page.locator("xpath=/html/body/header/div/div");
    this.govUkPageTitle = this.page.locator('xpath=//*[@id="logo"]');
    this.dlLandingPageTitle = this.page.locator(
      'xpath=//*[@id="licenceIssuer-fieldset"]/legend/h1'
    );
    this.dlLandingPageTitleSummary = this.page.locator(
      'xpath=//*[@id="licenceIssuer-hint"]'
    );

    this.skipToMainContent = this.page.locator("xpath=//html/body/a");

    this.dlLandingPageErrorTitle = this.page.locator(
      'xpath=//*[@id="main-content"]/div[1]/div/h2'
    );
    this.dlLandingPageErrorTitleSummary = this.page.locator(
      'xpath=//*[@id="main-content"]/div[1]/div/div/ul/li/a'
    );
    this.dlLandingPageErrorHintSummary = this.page.locator(
      'xpath=//*[@id="licenceIssuer-error"]'
    );
    this.contactOneLoginLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/p[6]/a'
    );
    this.errorLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/p[6]/a'
    );
    this.notFoundLink = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/p[8]/a'
    );
    this.header = this.page.locator('xpath=//*[@id="header"]');
    this.footerLinks = {
      Accessibility: this.page.locator(
        "xpath=/html/body/footer/div/div/div[1]/ul/li[1]/a"
      ),
      Cookies: this.page.locator(
        "xpath=/html/body/footer/div/div/div[1]/ul/li[2]/a"
      ),
      TsAndCs: this.page.locator(
        "xpath=/html/body/footer/div/div/div[1]/ul/li[3]/a"
      ),
      Privacy: this.page.locator(
        "xpath=/html/body/footer/div/div/div[1]/ul/li[4]/a"
      ),
      Support: this.page.locator(
        "xpath=/html/body/footer/div/div/div[1]/ul/li[5]/a"
      ),
      OGL: this.page.locator("xpath=/html/body/footer/div/div/div[1]/span/a"),
      CrownCopyright: this.page.locator(
        "xpath=/html/body/footer/div/div/div[2]/a"
      )
    };
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lng=cy"
    );
  }

  async clickOnDVLARadioButton() {
    expect(await this.page.title()).to.equal(
      "Was your UK photocard driving licence issued by DVLA or DVA? – GOV.UK One Login"
    );
    await this.radioBtnDVLA.click();
    await this.CTButton.click();
  }

  async continue() {
    await this.CTButton.click();
  }

  async setupConsoleListener(page) {
    const consoleMessages = [];
    return new Promise((resolve) => {
      page.on("console", (msg) => {
        consoleMessages.push({ type: msg.type(), text: msg.text() });
      });
      setTimeout(() => resolve(consoleMessages), 500);
    });
  }

  async clickOnDVARadioButton() {
    expect(await this.page.title()).to.equal(
      "Was your UK photocard driving licence issued by DVLA or DVA? – GOV.UK One Login"
    );
    await this.radioBtnDVA.click();
    await this.CTButton.click();
  }

  async betaBannerDisplayed() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.betaBanner.isVisible();
  }

  async cookieBannerDisplayed() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookieBanner.isVisible();
  }

  async clickCookieAcceptButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookieAcceptButton.click();
  }

  async clickCookieRejectButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookieRejectButton.click();
  }

  async clickViewCookiesLink() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.viewCookiesLink.click();
  }

  async assertCookiesPolicyPageTitle(cookiesPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookiesPageTitle.isVisible(cookiesPageTitle);
    expect(await this.cookiesPageTitle.textContent()).to.contains(
      cookiesPageTitle
    );
  }

  async clickChangeCookieSettingsLink() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.changeYourCookiesSettingsLink.click();
  }

  async selectDVLARadioButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.radioBtnDVLA.click();
  }

  async dvlaRadioButtonLabel(firstRadioButton) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.dvlaRadioLabelText.textContent()).to.contains(
      firstRadioButton
    );
  }

  async dvlaRadioButtonLabelHintText(firstRadioButtonHintText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.dvlaRadioLabelHintText.textContent()).to.contains(
      firstRadioButtonHintText
    );
  }

  async dvaRadioButtonLabelHintText(secondRadioButtonHintText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.dvaRadioLabelHintText.textContent()).to.contains(
      secondRadioButtonHintText
    );
  }

  async selectDVARadioButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.radioBtnDVA.click();
  }

  async dvaRadioButtonLabel(secondRadioButton) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.dvaRadioLabelText.textContent()).to.contains(
      secondRadioButton
    );
  }

  async selectNoDrivingLicenceRadioButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.radioBtnNoDrivingLicence.click();
  }

  async noDrivingLicenceRadioButtonLabel(thirdRadioButton) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(
      await this.doNotHaveDrivingLicenceRadioLabelText.textContent()
    ).to.contains(thirdRadioButton);
  }

  async assertFooterAccessibilityStatementText(
    assertFooterAccessibilityStatementText
  ) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(
      await this.footerAccessibilityStatementText.textContent()
    ).to.contains(assertFooterAccessibilityStatementText);
  }

  async assertFooterCookieText(assertFooterCookieText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.footerCookieText.textContent()).to.contains(
      assertFooterCookieText
    );
  }

  async assertFooterTermsAndConditonsText(assertFooterTermsAndConditonsText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(
      await this.footerTermsAndConditionsText.textContent()
    ).to.contains(assertFooterTermsAndConditonsText);
  }

  async assertFooterPrivacyNoticeText(assertFooterPrivacyNoticeText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.footerPrivacyNoticeText.textContent()).to.contains(
      assertFooterPrivacyNoticeText
    );
  }

  async assertFooterSupportText(assertFooterSupportText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.footerSupportText.textContent()).to.contains(
      assertFooterSupportText
    );
  }

  async assertFooterOpenGovernmentLicenceText(
    assertFooterOpenGovernmentLicenceText
  ) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(
      await this.footerOpenGovernmentLicenceText.textContent()
    ).to.contains(assertFooterOpenGovernmentLicenceText);
  }

  async assertFooterCrownCopyrightText(assertFooterCrownCopyrightText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.footerCrownCopyrightText.textContent()).to.contains(
      assertFooterCrownCopyrightText
    );
  }

  async dropDownSummaryLinkText(dropDownSummaryLinkText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.whyWeNeedToSeeThisDropDownLink.textContent()).to.contains(
      dropDownSummaryLinkText
    );
  }

  async clickDropDownSummaryLink() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.whyWeNeedToSeeThisDropDownLink.click();
  }

  async assertDropDownLinkText(dropDownLinkText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.whyWeNeedToSeeThisDropDownText.textContent()).to.contains(
      dropDownLinkText
    );
  }

  async assertCookieBannerAcceptText(cookieAcceptSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookieAcceptedTestDisplayed.isVisible(cookieAcceptSummaryText);
    const actualText = await this.cookieAcceptedTestDisplayed.innerText();
    expect(actualText.trim()).to.equal(cookieAcceptSummaryText.trim());
  }

  async assertCookieBannerRejectText(cookieRejectSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.cookieRejectedTestDisplayed.isVisible(cookieRejectSummaryText);
    const actualText = await this.cookieRejectedTestDisplayed.innerText();
    expect(actualText.trim()).to.equal(cookieRejectSummaryText.trim());
  }

  async assertBetaBannerText(betaBannerText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.betaBannerText.innerText()).to.equal(betaBannerText);
  }

  async assertFeedbackPageIsCorrectAndLive(expectedURL) {
    const newPagePromise = this.page.waitForEvent("popup");

    await this.betaBannerFeedbackLink.click();

    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");

    const actualURL = await newPage.url();

    expect(actualURL).to.contain(expectedURL); // Use to.equal for exact URL match

    await newPage.close();
  }

  async assertFooterLink(linkName) {
    const timeout = 10000;
    const linkLocator = this.footerLinks[linkName];

    if (!linkLocator) {
      throw new Error(`No locator defined for footer link: ${linkName}`);
    }

    // Define urlAssertions
    const urlAssertions = {
      Accessibility: "https://signin.account.gov.uk/accessibility-statement",
      Cookies: "https://signin.account.gov.uk/cookies",
      TsAndCs: "https://signin.account.gov.uk/terms-and-conditions",
      Privacy:
        "https://www.gov.uk/government/publications/govuk-one-login-privacy-notice",
      Support: "https://home.account.gov.uk/contact-gov-uk-one-login",
      OGL: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
      CrownCopyright:
        "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
    };

    // Determine if the link opens in a new tab or not
    const targetAttribute = await linkLocator.evaluate((el) =>
      el.getAttribute("target")
    );
    const newTabExpected = targetAttribute === "_blank";

    if (newTabExpected) {
      await Promise.all([
        this.page.waitForEvent("popup", { timeout }),
        linkLocator.click({ modifier: "Ctrl" })
      ]);

      const pages = this.page.context().pages();
      const newTab = pages[pages.length - 1];

      expect(await newTab.title()).to.not.equal(
        "Page not found - GOV.UK One Login"
      );

      if (urlAssertions[linkName]) {
        expect(newTab.url()).to.contain(urlAssertions[linkName]);
      } else {
        throw new Error(
          `No URL assertion defined for footer link: ${linkName}`
        );
      }
    } else {
      // Pass a URL pattern or '*' to waitForURL
      await Promise.all([
        this.page.waitForURL(/.*/, { timeout }), // Wait for any URL change
        linkLocator.click()
      ]);

      if (urlAssertions[linkName]) {
        expect(this.page.url()).to.contain(urlAssertions[linkName]);
      } else {
        throw new Error(
          `No URL assertion defined for footer link: ${linkName}`
        );
      }
    }
  }

  async clickHideThisMessageCookieButton() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.evaluate(() => {
      const hiddenButton = document.querySelector(".cookie-hide-button");
      if (hiddenButton) {
        hiddenButton.click();
      }
    });
  }

  async assertGovUkLinkText(govUkLinkText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.govUkLink.textContent()).to.contain(govUkLinkText);
  }

  async clickGovUkLink() {
    await this.page.waitForLoadState("domcontentloaded");
    await this.govUkLink.click();
  }

  async assertGovUkPageTitle(govUkPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.govUkPageTitle.isVisible(govUkPageTitle);
    expect(await this.govUkPageTitle.textContent()).to.contains(govUkPageTitle);
  }

  async assertDlLandingPageTitle(dlLandingPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.dlLandingPageTitle.textContent()).to.contains(
      dlLandingPageTitle
    );
  }

  async assertSkipToMainContent(skipToMainContent) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.skipToMainContent.textContent(skipToMainContent);
    expect(await this.skipToMainContent.textContent()).to.contains(
      skipToMainContent
    );
  }

  async assertDlLandingPageTitleSummary(dlLandingPageTitleSummary) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.dlLandingPageTitleSummary.isVisible(dlLandingPageTitleSummary);
    expect(await this.dlLandingPageTitleSummary.textContent()).to.contains(
      dlLandingPageTitleSummary
    );
  }

  async assertTitleError(noRadioButtonSelectTitleError) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.dlLandingPageErrorTitle.isVisible(noRadioButtonSelectTitleError);
  }

  async assertTitleErrorSummary(noRadioButtonSelectTitleSummaryError) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.dlLandingPageErrorTitleSummary.isVisible(
      noRadioButtonSelectTitleSummaryError
    );
  }

  async assertHintErrorSummary(noRadioButtonSelectHintSummaryError) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.dlLandingPageErrorHintSummary.isVisible(
      noRadioButtonSelectHintSummaryError
    );
  }

  async checkDeviceIntelligenceCookie(deviceIntelligenceCookieName) {
    // Wait for the page to fully load
    await this.page.waitForLoadState("networkidle", { timeout: 10000 });

    const cookies = await this.page.context().cookies();

    const cookie = cookies.find(
      (cookie) => cookie.name === deviceIntelligenceCookieName
    );

    if (!cookie) {
      throw new Error(
        `Cookie with name '${deviceIntelligenceCookieName}' not found.`
      );
    }

    if (
      cookie.value === undefined ||
      cookie.value === null ||
      cookie.value.trim() === ""
    ) {
      // Check for undefined, null, or empty string in value field of the cookie
      throw new Error(
        `Cookie with name '${deviceIntelligenceCookieName}' has no value.`
      );
    }

    return true;
  }

  async deleteSessionCookie() {
    const cookieName = "service_session";
    const cookies = (await this.page.context().cookies()).filter(
      (cookie) => cookie.name !== cookieName
    );
    await this.page.context().clearCookies();
    await this.page.context().addCookies(cookies);
  }

  async assertContactOneLoginTeamLink(contactOneLoginTeamLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.contactOneLoginLink.innerText()).to.equal(
      contactOneLoginTeamLink
    );
  }

  async assertErrorLinkIsCorrectAndLive() {
    const newPagePromise = this.page.waitForEvent("popup");

    await this.errorLink.click();
    await this.assertNewPageIsCorrectAndLive(newPagePromise);
  }

  async assertNotFoundLinkIsCorrectAndLive() {
    const newPagePromise = this.page.waitForEvent("popup");

    await this.notFoundLink.click();
    await this.assertNewPageIsCorrectAndLive(newPagePromise);
  }

  async assertNewPageIsCorrectAndLive(newPagePromise) {
    const newPage = await newPagePromise;
    await this.page.waitForLoadState("networkidle", { timeout: 10000 });
    const expectedURL = "https://home.account.gov.uk/contact-gov-uk-one-login";
    const unexpectedTitle = "Page not found - GOV.UK One Login";

    const actualTitle = await newPage.title();
    expect(actualTitle).to.not.equal(unexpectedTitle);

    const actualURL = await newPage.url();
    expect(actualURL).to.equal(expectedURL);

    await newPage.close();
  }

  async goToPage(pageName) {
    await this.page.goto(this.page.url() + pageName);
  }

  async refreshPage() {
    await this.page.reload();
  }

  async assertErrorPageHeading(pageHeadingErrorPage) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.header.innerText()).to.equal(pageHeadingErrorPage);
  }

  async assertPageNotFoundHeading(pageHeadingNotFoundPage) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.header.innerText()).to.equal(pageHeadingNotFoundPage);
  }
};
