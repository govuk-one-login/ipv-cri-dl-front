module.exports = class PlaywrightDevPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goto() {
    this.startingUrl =
      "http://localhost:5030/oauth2/authorize?request=lorem&client_id=standalone";

    await this.page.goto(this.startingUrl);
  }
};
