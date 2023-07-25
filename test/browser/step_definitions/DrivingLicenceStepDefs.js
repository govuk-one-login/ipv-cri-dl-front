const { Given, When, Then } = require("@cucumber/cucumber");

const { DVADetailsEntryPage } = require("../pages/DVADetailsEntryPage");
const { DrivingLicencePage } = require("../pages/DrivingLicencePage");

Then(/^I can see CTA {string}$/, async function () {});

Then(
  /^I should be on the DVLA details entry page (.*)$/,
  async function (dvlaDetailsEntryPageTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDVLAPageTitle(dvlaDetailsEntryPageTitle);
  }
);

Then(/^User clicks on continue$/,
  { timeout: 2 * 5000 },
  async function () {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.clickOnContinue();
});

Given(
  /^User enters DVLA data as a (.*)$/,
  { timeout: 2 * 5000 },
  async function (drivingLicenceSubject) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userEntersData("DVLA", drivingLicenceSubject);
  }
);

// Re-enter test data step-defs

Then(
  /^User re-enters last name as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidLastName) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersLastName(InvalidLastName);
  }
);

Then(
  /^User re-enters first name as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidFirstName) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersFirstName(InvalidFirstName);
  }
);

Then(
  /^User re-enters middle names as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMiddleNames) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersMiddleName(InvalidMiddleNames);
  }
);

Then(
  /^User re-enters drivingLicenceNumber as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidLicenceNumber) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersLicenceNumber(InvalidLicenceNumber);
  }
);

Then(
  /^User re-enters issue number as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidIssueNumber) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersIssueNumber(InvalidIssueNumber);
  }
);

Then(
  /^User re-enters postcode as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidPostcode) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersPostcode(InvalidPostcode);
  }
);

Then(
  /^User re-enters day of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidDayOfBirth) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersDayOfBirth(InvalidDayOfBirth);
  }
);

Then(
  /^User re-enters month of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMonthOfBirth) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersMonthOfBirth(InvalidMonthOfBirth);
  }
);

Then(
  /^User re-enters year of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfIssue) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersYearOfBirth(InvalidYearOfIssue);
  }
);

Then(
  /^User re-enters day of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidDayOfIssue) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersDayOfIssue(InvalidDayOfIssue);
  }
);

Then(
  /^User re-enters month of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMonthOfIssue) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersMonthOfIssue(InvalidMonthOfIssue);
  }
);

Then(
  /^User re-enters year of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfBirth) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersYearOfIssue(InvalidYearOfBirth);
  }
);

Then(
  /^User re-enters valid to day as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToDay) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersValidToDay(InvalidValidToDay);
  }
);

Then(
  /^User re-enters valid to month as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToMonth) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersValidToMonth(InvalidValidToMonth);
  }
);

Then(
  /^User re-enters valid to year (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidValidToYear) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersValidToYear(InvalidValidToYear);
  }
);

// Summary box and field errors step-defs

Then(
  /^I see the Lastname error in the error summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidLastNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the Lastname error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidLastNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the Firstname error summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidFirstNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the Firstname error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidFirstNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the middlenames error summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidMiddleNameInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the middlenames error in the error field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidMiddleNameOnField(fieldErrorText);
  }
);

Then(
  /^I see the licence number error in the summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidLicenceNumberInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I can see the licence number error in the field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidLicenceNumberOnField(fieldErrorText);
  }
);

Then(
  /^I see the issue number error in summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidIssueNumberInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the issue number error in field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidIssueNumberOnField(fieldErrorText);
  }
);

Then(
  /^I see the postcode error in summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidPostcodeInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see the postcode error in field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidPostcodeOnField(fieldErrorText);
  }
);

Then(
  /^I see the date of birth error summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidDoBInErrorSummary(errorSummaryText);
  }
);

Then(
  /^I see the date of birth error in the field as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidDoBOnField(fieldErrorText);
  }
);

Then(
  /^I see issue date error in summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidIssueInErrorSummary(errorSummaryText);
  }
);

Then(
  /^I see invalid issue date field error as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidIssueOnField(fieldErrorText);
  }
);

Then(
  /^I can see the valid to date error in the error summary as (.*)$/,
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidValidToDateInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I can see the Valid to date field error as (.*)$/,
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertInvalidValidToDateOnField(fieldErrorText);
  }
);

//##################### DVA ##########################

Then(
  /^I should be on the DVA details entry page (.*)$/,
  async function (dvaDetailsEntryPageTitle) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAPageTitle(dvaDetailsEntryPageTitle);
  }
);

Given(
  /^User enters DVA data as a (.*)$/,
  { timeout: 2 * 5000 },
  async function (dvaDrivingLicenceSubject) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.userEntersDVAData(
      "DVA",
      dvaDrivingLicenceSubject
    );
  }
);

// Re-enter DVA test data step-defs

Then(
  /^DVA user re-enters day of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidDayOfBirth) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.dvaUserReEntersDayOfBirth(InvalidDayOfBirth);
  }
);

Then(
  /^DVA user re-enters month of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMonthOfBirth) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.dvaUserReEntersMonthOfBirth(InvalidMonthOfBirth);
  }
);

Then(
  /^DVA user re-enters year of birth as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfIssue) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.dvaUserReEntersYearOfBirth(InvalidYearOfIssue);
  }
);

Then(
  /^DVA user re-enters day of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidDayOfIssue) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.userReEntersDVADayOfIssue(InvalidDayOfIssue);
  }
);

Then(
  /^DVA user re-enters month of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidMonthOfIssue) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.userReEntersDVAMonthOfIssue(InvalidMonthOfIssue);
  }
);

Then(
  /^DVA user re-enters year of issue as (.*)$/,
  { timeout: 2 * 5000 },
  async function (InvalidYearOfBirth) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.userReEntersDVAYearOfIssue(InvalidYearOfBirth);
  }
);

// Summary box and field errors step-defs

Then(
  /^I see the DVA licence number error in the summary as (.*)$/,
  async function (errorSummaryText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVALicenceNumberInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I can see the DVA licence number error in the field as (.*)$/,
  async function (fieldErrorText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVALicenceNumberOnField(
      fieldErrorText
    );
  }
);

Then(
  /^DVA user can see the date of birth error summary as (.*)$/,
  async function (errorSummaryText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDoBInDvaErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^DVA user can see the date of birth error in the field as (.*)$/,
  async function (fieldErrorText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDoBOnDvaField(fieldErrorText);
  }
);

Then(
  /^I see DVA issue date error in summary as (.*)$/,
  async function (errorSummaryText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVAIssueInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see DVA invalid issue date field error as (.*)$/,
  async function (fieldErrorText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVAIssueOnField(fieldErrorText);
  }
);
