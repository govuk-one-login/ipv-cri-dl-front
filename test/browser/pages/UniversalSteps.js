const { assertTrue, fail } = require("assert");

exports.UniversalSteps = class PlaywrightDevPage {
  constructor(page, url) {
    this.page = page;
    this.url = url;
    this.backButton = this.page.locator('xpath=//*[@id="back"]/a');
    this.consoleMessages = [];
  }

  async changeLanguageTo(language) {
    let languageIsoCode = "en";
    if (language === "Welsh") {
      languageIsoCode = "cy";
    }
    await this.page.goto(this.page.url() + "?lng=" + languageIsoCode);
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

  async assertURLContains(expected) {
    const url = await this.driver.getCurrentUrl();
    assertTrue(url.contains(expected));
  }

  async clickBackButton() {
    await this.backButton.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
  }

  async setupConsoleListener(page) {
    const consoleMessages = [];
    return new Promise((resolve) => {
      page.on("console", (msg) => {
        consoleMessages.push({ type: msg.type(), text: msg.text() });
      });
      setTimeout(() => resolve(consoleMessages), 500); // Consider a more robust wait strategy
    });
  }
};
