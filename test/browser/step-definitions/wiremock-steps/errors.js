import { Then } from "@cucumber/cucumber";
import { expect } from "chai";
import { ErrorPage } from "../../pages/wiremock-pages/index.js";
import { AxeBuilder } from "@axe-core/playwright";

Then(/^they should see an error page$/, async function () {
  const errorPage = new ErrorPage(this.page);
  const errorTitle = await errorPage.getErrorTitle();
  expect(errorTitle.trim()).to.equal(
    errorPage.getSomethingWentWrongMessage().trim()
  );
});

Then(
  /^I run the Axe Accessibility check against the DL Error page$/,
  async function () {
    const results = await new AxeBuilder({ page: this.page })
      .withTags(["wcag22aa"])
      .analyze();

    expect(results.violations).to.be.empty;
  }
);
