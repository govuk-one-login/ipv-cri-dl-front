class CheckYourDetailsPage {
  constructor(page) {
    this.page = page;
    this.confirmDetailsYes = page.locator('xpath=//*[@id="confirmDetails"]');
    this.confirmDetailsNo = page.locator(
      'xpath=//*[@id="confirmDetails-detailsNotConfirmed"]'
    );
    this.checkYourDetailsContinueButton = page.locator(
      'xpath=//*[@id="continue"]'
    );
  }

  async confirmLicenceDetails(confirmCorrectDetails) {
    if (confirmCorrectDetails === "Yes") {
      await this.confirmDetailsYes.click();
    } else {
      await this.confirmDetailsNo.click();
    }
  }

  async clickConfirmAndContinue() {
    await Promise.all([
      this.checkYourDetailsContinueButton.click(),
      this.page.waitForNavigation({ timeout: 40000 })
    ]);
  }
}

module.exports = CheckYourDetailsPage;
