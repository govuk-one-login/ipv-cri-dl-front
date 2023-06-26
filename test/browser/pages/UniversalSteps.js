const { assertTrue, fail } = require("assert");
const { By, until } = require("selenium-webdriver");

class UniversalSteps {
  constructor() {
    this.driver = Driver.get();
    this.wait = new this.driver.WebDriverWait(this.driver, 10);
    PageFactory.initElements(this.driver, this);
  }

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

  driverClose() {
    Driver.closeDriver();
  }

  async assertURLContains(expected) {
    const url = await this.driver.getCurrentUrl();
    assertTrue(url.contains(expected));
  }

  async changeLanguageTo(language) {
    this.driver.get(this.driver.currentUrl + "?lang=" + language);
  }
}
