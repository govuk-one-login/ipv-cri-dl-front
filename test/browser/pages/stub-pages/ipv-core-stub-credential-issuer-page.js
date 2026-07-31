const { expect } = require("@playwright/test");
const path = require("path");
const fs = require("fs");

class IpvCoreStubCredentialIssuerPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Selectors for elements on the IPV Core Stub page
    this.visitCredentialIssuersButton = page.locator(
      'button:has-text("Visit Credential Issuers")'
    );
    this.drivingLicenceCRIBuildButton = page.locator(
      'xpath=//*[@id="driving-licence-cri-build"]'
    );
    this.drivingLicenceCRIDevButton = page.locator(
      'xpath=//*[@id="driving-licence-cri-dev"]'
    );
    this.drivingLicenceCRIStagingButton = page.locator(
      'xpath=//*[@id="driving-licence-cri-staging"]'
    );
    this.rowNumberInput = page.locator("#rowNumber");
    this.userNameInput = page.locator('xpath=//*[@id="name"]');

    this.goToCriSearchButton = page.locator(
      '//*[@id="main-content"]/form[2]/div/button'
    );
    this.searchForUatUserButton = page.locator(
      '//*[@id="main-content"]/form[1]/div/button'
    );
    this.contextInput = page.locator('xpath=//*[@id="context"]');
    this.claimsTextInput = page.locator('xpath=//*[@id="claimsText"]');
    this.goToDrivingLicenceCRIButton = page.locator(
      'xpath=//*[@id="main-content"]/form[3]/div/button'
    );
  }

  async assertOnIpvCoreStubPage() {
    await expect(this.page).toHaveTitle(/IPV Core Stub/);
  }

  async clickVisitCredentialIssuers() {
    await this.visitCredentialIssuersButton.click();
  }

  async clickCRIForEnvironment(environment) {
    switch (environment.toLowerCase()) {
      case "dev":
        await this.drivingLicenceCRIDevButton.click();
        break;
      case "build":
        await this.drivingLicenceCRIBuildButton.click();
        break;
      case "staging":
        await this.drivingLicenceCRIStagingButton.click();
        break;
      default:
        throw new Error(
          `Unsupported Driving Licence CRI environment: ${environment}`
        );
    }
  }

  async searchForUATUser(userNumber) {
    await expect(this.page).toHaveURL(
      /credential-issuer\?cri=driving-licence-cri/
    );

    await this.rowNumberInput.fill(userNumber);
    await this.goToCriSearchButton.click();
  }

  async searchForUATUserByUserName(userName) {
    await expect(this.page).toHaveURL(
      /credential-issuer\?cri=driving-licence-cri/
    );

    await this.userNameInput.fill(userName);
    await this.searchForUatUserButton.click();
  }

  async enterContext(contextValue) {
    await this.contextInput.fill(contextValue);
  }

  async enterRawJSON(jsonFileName) {
    const filePath = path.resolve(
      __dirname,
      "../../util/data",
      `${jsonFileName}.json`
    );
    const jsonContent = fs.readFileSync(filePath, "utf-8");
    await this.claimsTextInput.fill(jsonContent);
  }

  async clickGoToDrivingLicenceCRI() {
    await this.goToDrivingLicenceCRIButton.click();
  }
}

module.exports = IpvCoreStubCredentialIssuerPage;
