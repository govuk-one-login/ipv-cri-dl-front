const { expect: expect } = require("chai");
exports.CheckYourDetailsPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/check-your-details";

    this.radioBtnYes = this.page.locator('xpath=//*[@id="confirmDetails"]');

    this.radioBtnNo = this.page.locator(
      'xpath=//*[@id="confirmDetails-detailsNotConfirmed"]'
    );

    this.CTButton = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/button'
    );

    this.betaBanner = this.page.locator("xpath=/html/body/div[2]/div/p/strong");

    this.betaBannerReads = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span"
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

    this.lastNameLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[1]/dt'
    );

    this.givenNamesLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[2]/dt'
    );

    this.dobLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[3]/dt'
    );

    this.issueDateLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[4]/dt'
    );

    this.validToNameLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[5]/dt'
    );

    this.licenceNumberNameLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[6]/dt'
    );

    this.issueNumberLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[7]/dt'
    );

    this.dvaPostcodeLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[7]/dt'
    );

    this.dvlaPostcodeLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/dl[1]/div[8]/dt'
    );

    this.warningTextLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div/strong'
    );

    this.drivingLicenceDetailsCorrectTextLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/h2'
    );

    this.hintTextLabel = this.page.locator(
      'xpath=//*[@id="confirmDetails-detailsNotConfirmed-item-hint"]'
    );
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lng=cy"
    );
  }

  async assertCheckYourDetailsPageTitle(checkYourDetailsPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(checkYourDetailsPageTitle);
  }

  async clickOnYesRadioButton() {
    await this.radioBtnYes.click();
  }

  async clickOnNoRadioButton() {
    await this.radioBtnNo.click();
  }

  async continue() {
    await this.CTButton.click();
  }

  //  Language
  async assertBetaBanner(betaBannerLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBanner.textContent()).to.contains(
      betaBannerLabel
    );
  }

  async assertBetaBannerText(assertBetaBannerText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBannerReads.textContent()).to.contains(
      assertBetaBannerText
    );
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

  async assertLastName(checkYourDetailsLastName) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.lastNameLabel.textContent()).to.contains(
      checkYourDetailsLastName
    );
  }

  async assertGivenNames(checkYourDetailsGivenNames) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.givenNamesLabel.textContent()).to.contains(
      checkYourDetailsGivenNames
    );
  }

  async assertDob(checkYourDetailsDob) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dobLabel.textContent()).to.contains(
      checkYourDetailsDob
    );
  }

  async assertIssueDate(checkYourDetailsIssueDate) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.issueDateLabel.textContent()).to.contains(
      checkYourDetailsIssueDate
    );
  }

  async assertValidTo(checkYourDetailsValidTo) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.validToNameLabel.textContent()).to.contains(
      checkYourDetailsValidTo
    );
  }

  async assertLicenceNumber(checkYourDetailsLicenceNumber) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.licenceNumberNameLabel.textContent()).to.contains(
      checkYourDetailsLicenceNumber
    );
  }

  async assertIssueNumber(checkYourDetailsIssueNumber) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.issueNumberLabel.textContent()).to.contains(
      checkYourDetailsIssueNumber
    );
  }

  async assertDvaPostcode(checkYourDetailsDvaPostcode) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dvaPostcodeLabel.textContent()).to.contains(
      checkYourDetailsDvaPostcode
    );
  }

  async assertDvlaPostcode(checkYourDetailsDvlaPostcode) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dvlaPostcodeLabel.textContent()).to.contains(
      checkYourDetailsDvlaPostcode
    );
  }

  async assertWarningText(checkYourDetailsWarningText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.warningTextLabel.textContent()).to.contains(
      checkYourDetailsWarningText
    );
  }

  async assertDrivingLicenceDetailsCorrectText(
    checkYourDetailsDrivingLicenceDetailsCorrectText
  ) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(
      await this.drivingLicenceDetailsCorrectTextLabel.textContent()
    ).to.contains(checkYourDetailsDrivingLicenceDetailsCorrectText);
  }

  async assertHintText(checkYourDetailsHintTextText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.hintTextLabel.textContent()).to.contains(
      checkYourDetailsHintTextText
    );
  }
};
