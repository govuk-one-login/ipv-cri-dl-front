const { expect: expect } = require("chai");
const { assertTrue, fail } = require("assert");

exports.UniversalSteps = class PlaywrightDevPage {
  constructor(page) { this.page = page;
  this.url = "http://localhost:5030/details";
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

  async changeLanguageTo(language) {
    this.driver.get(this.driver.currentUrl + "?lang=" + cy);
  }
};
