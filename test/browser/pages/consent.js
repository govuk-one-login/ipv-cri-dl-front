const { expect: expect } = require("chai");
exports.ConsentPage = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/consent";

    this.consentButtonDVA = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox"]'
    );

    this.consentButtonDVLA = this.page.locator(
      'xpath=//*[@id="consentCheckbox"]'
    );

    this.CTButton = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/button'
    );

    this.noConsentProvidedErrorSummary = this.page.locator(
      'xpath=//*[@id="main-content"]/div[1]/div/div/ul/li/a'
    );

    this.consentPageTitleLabel = this.page.locator('xpath=//*[@id="header"]');

    this.consentPageTextLabel = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/h2'
    );
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lng=cy"
    );
  }

  async assertConsentDVAPageTitle(consentPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(consentPageTitle);
  }

  async assertConsentDVLAPageTitle(consentPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(consentPageTitle);
  }

  async clickOnDVAConsentCheckBox() {
    await this.consentButtonDVA.click();
  }

  async clickOnDVLAConsentCheckBox() {
    await this.consentButtonDVLA.click();
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

  async assertNoConsentProvidedErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.noConsentProvidedErrorSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertConsentPageTitle(consentPageTitleText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.consentPageTitleLabel.textContent()).to.contains(
      consentPageTitleText
    );
  }

  async assertConsentPageText(consentPageText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.consentPageTextLabel.textContent()).to.contains(
      consentPageText
    );
  }
};
