const { assertTrue, fail } = require("assert");

module.exports = class PlaywrightDevPage {
  constructor() {}

  async waitForTextToAppear(text) {
    const header = await this.driver.getTitle();
    await this.driver.manage().setTimeouts({ implicit: 10000 });

    if (header.includes(text)) {
      assertTrue(this.driver.getTitle().includes(text));
    } else {
      fail(
        "Page Title Does Not Match " +
          text +
          "But was " +
          this.Driver.getTitle()
      );
    }
  }

  async assertURLContains(expected) {
    const url = await this.driver.getCurrentUrl();
    assertTrue(url.contains(expected));
  }

  async changeLanguageTo(language) {
    this.driver.get(this.driver.currentUrl + "?lang=" + language);
  }
};
