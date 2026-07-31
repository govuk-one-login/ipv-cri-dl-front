class IpvCoreStubUserSearchPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Selectors for elements on the IPV Core Stub page
    this.userSearchGoToCriButton = page
      .locator('xpath=//*[@id="main-content"]/table/tbody/tr/td[1]/p[1]/a')
      .or(page.locator('xpath=//*[@id="main-content"]/form/button'));
    this.userSearchEditUserButton = page.locator(
      'xpath=//*[@id="main-content"]/table/tbody/tr/td[1]/p[2]/a'
    );
  }

  async userSearchGoToCri() {
    await this.userSearchGoToCriButton.click();
  }

  async userSearchEditUser() {
    await this.userSearchEditUserButton.click();
  }
}

module.exports = IpvCoreStubUserSearchPage;
