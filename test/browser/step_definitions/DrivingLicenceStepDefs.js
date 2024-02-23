const { Given, When, Then } = require("@cucumber/cucumber");

const { DVADetailsEntryPage } = require("../pages/DVADetailsEntryPage");
const { DrivingLicencePage } = require("../pages/DrivingLicencePage");
const { expect } = require("chai");

Then(/^I can see CTA {string}$/, async function () {});

Then(
  /^I should be on the DVLA details entry page (.*)$/,
  async function (dvlaDetailsEntryPageTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDVLAPageTitle(dvlaDetailsEntryPageTitle);
  }
);

Then(/^User clicks on continue$/, { timeout: 2 * 5000 }, async function () {
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
  /^User enters date of issue as current date$/,
  { timeout: 2 * 5000 },
  async function () {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersIssueDateAsCurrentDate();
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
  /^User enters day of issue as current day minus (.*)$/,
  { timeout: 2 * 5000 },
  async function (daysToSubtract) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersDayOfIssueAsCurrentDateMinus(
      daysToSubtract
    );
  }
);

Then(
  /^User enters day of issue as current day plus (.*)$/,
  { timeout: 2 * 5000 },
  async function (daysToAdd) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersDayOfIssueAsCurrentDatePlus(daysToAdd);
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
  /^User enters year of issue as current year minus (.*)$/,
  { timeout: 2 * 5000 },
  async function (yearsToSubtract) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersYearOfIssueAsCurrentDateMinus(
      yearsToSubtract
    );
  }
);

Then(
  /^User enters year of issue as current year minus (.*) plus (.*) days $/,
  { timeout: 2 * 5000 },
  async function (yearsToSubtract, daysToAdd) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userReEntersYearOfIssueAsCurrentPlusAndMinus(
      yearsToSubtract,
      daysToAdd
    );
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
  /^Proper error message is displayed as (.*)$/,
  async function (retryMessageHeading) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertRetryErrorMessage(retryMessageHeading);
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

Then(/^DVLA consent checkbox is unselected$/, async function () {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.consentCheckBoxUnselect();
});

Then(
  /^I can see the DVLA consent error summary as (.*)$/,
  { timeout: 2 * 5000 },
  async function (errorSummaryText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertConsentErrorSummary(errorSummaryText);
  }
);

Then(
  /^I can see the DVLA consent error on the checkbox as (.*)$/,
  { timeout: 2 * 5000 },
  async function (fieldErrorText) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertConsentErrorOnField(fieldErrorText);
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
  { timeout: 3 * 5000 },
  async function (dvaDrivingLicenceSubject) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.userEntersDVAData(
      "DVA",
      dvaDrivingLicenceSubject
    );
  }
);

Then(/^I check the page Title (.*)$/, async function (dvaErrorPageTitle) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAErrorPageTitle(dvaErrorPageTitle);
});

// Re-enter DVA test data step-defs

Then(
  /^DVA User re-enters drivingLicenceNumber as (.*)$/,
  { timeout: 3 * 5000 },
  async function (InvalidLicenceNumber) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.dvaUserReEntersLicenceNumber(
      InvalidLicenceNumber
    );
  }
);

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
  { timeout: 3 * 5000 },
  async function (errorSummaryText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVAIssueInErrorSummary(
      errorSummaryText
    );
  }
);

Then(
  /^I see DVA invalid issue date field error as (.*)$/,
  { timeout: 2 * 5000 },
  async function (fieldErrorText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertInvalidDVAIssueOnField(fieldErrorText);
  }
);

Then(/^DVA consent checkbox is unselected$/, async function () {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.consentDVACheckBoxUnselect();
});

Then(
  /^I can see the DVA consent error summary as (.*)$/,
  { timeout: 2 * 5000 },
  async function (errorSummaryText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertConsentDVAErrorSummary(errorSummaryText);
  }
);

Then(
  /^I can see the DVA consent error on the checkbox as (.*)$/,
  { timeout: 2 * 5000 },
  async function (fieldErrorText) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertConsentDVAErrorOnField(fieldErrorText);
  }
);

//################### Text content comparisons ########################

Then(
  /^I view the (.*) banner$/,
  { timeout: 2 * 5000 },
  async function (betaBannerLabel) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertBetaBanner(betaBannerLabel);
  }
);

Then(/^the beta banner reads (.*)$/, async function (betaBannerText) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertBetaBannerText(betaBannerText);
});

Then(/^I can see the lastname as (.*)$/, async function (dvlaLastName) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertLastName(dvlaLastName);
});

Then(/^I can see the givenName as (.*)$/, async function (dvlaGivenName) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertGivenName(dvlaGivenName);
});

Then(/^I can see the firstName as (.*)$/, async function (dvlaFirstName) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertFirstName(dvlaFirstName);
});

Then(/^I can see the middleName as (.*)$/, async function (dvlaMiddleName) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertMiddleName(dvlaMiddleName);
});

Then(
  /^I can see the first name sentence (.*)$/,
  async function (dvlaFirstNameSent) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertFirstNameSentence(dvlaFirstNameSent);
  }
);

Then(
  /^I can see the middle name sentence (.*)$/,
  async function (dvlaMiddleNameSentence) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertMiddleNameSentence(dvlaMiddleNameSentence);
  }
);

Then(/^I can see the DoB fields titled (.*)$/, async function (dobFieldTitle) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertDoBFieldTitle(dobFieldTitle);
});

Then(/^I can see example as (.*)$/, async function (dobExample) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertDobExample(dobExample);
});

Then(/^I can see date as (.*)$/, async function (day) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertDay(day);
});

Then(/^I can see month as (.*)$/, async function (month) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertMonth(month);
});

Then(/^I can see year as (.*)$/, async function (year) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertYear(year);
});

Then(
  /^I can see the Issue date field titled (.*)$/,
  async function (issueFieldTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueDateFieldTitle(issueFieldTitle);
  }
);

Then(
  /^I can see Issue date sentence as (.*)$/,
  async function (issueDateExample) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueDateExample(issueDateExample);
  }
);

Then(/^I can see issue day as (.*)$/, async function (issueDay) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertIssueDay(issueDay);
});

Then(/^I can see issue month as (.*)$/, async function (issueMonth) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertIssueMonth(issueMonth);
});

Then(/^I can see issue year as (.*)$/, async function (issueYear) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertIssueYear(issueYear);
});

Then(
  /^I can see the Valid to date field titled (.*)$/,
  async function (validDateFieldTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertValidDateFieldTitle(validDateFieldTitle);
  }
);

Then(
  /^I can see Valid to date sentence as (.*)$/,
  async function (validDateExample) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertValidDateExample(validDateExample);
  }
);

Then(/^I can see Valid To day as (.*)$/, async function (validToDay) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertValidToDay(validToDay);
});

Then(/^I can see Valid To month as (.*)$/, async function (validToMonth) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertValidToMonth(validToMonth);
});

Then(/^I can see Valid To year as (.*)$/, async function (validToYear) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertValidToYear(validToYear);
});

Then(
  /^I can see the licence number field titled (.*)$/,
  async function (validLicenceTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertLicenceTitle(validLicenceTitle);
  }
);

Then(
  /^I see the Licence number sentence (.*)$/,
  async function (validLicenceExample) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertLicenceExample(validLicenceExample);
  }
);

Then(
  /^I can see the issue number field titled (.*)$/,
  async function (issueNumberTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueNumberTitle(issueNumberTitle);
  }
);

Then(
  /^I can see issue sentence as (.*)$/,
  async function (issueNumberSentence) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueSentenceExample(issueNumberSentence);
  }
);

Then(
  /^I can see the postcode field titled (.*)$/,
  async function (postcodeTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertPostcodeTitle(postcodeTitle);
  }
);

Then(
  /^I can see postcode sentence as (.*)$/,
  async function (postcodeSentence) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertPostcodeSentence(postcodeSentence);
  }
);

Then(/^I see the consent title section (.*)$/, async function (consentTitle) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertDVLAConsent(consentTitle);
});

Then(
  /^I see the DVLA Consent first sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentFirstSentence) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDVLAConsentSentenceOne(consentFirstSentence);
  }
);

Then(
  /^I see the DVLA Consent second sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentSecondSentence) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDVLAConsentSentenceTwo(
      consentSecondSentence
    );
  }
);

Then(
  /^I see One Login privacy notice link (.*)$/,
  async function (consentOneLoginLink) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertConsentOneLoginLink(consentOneLoginLink);
  }
);

Then(
  /^I see DVLA privacy notice link (.*)$/,
  async function (consentPrivacyLink) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertConsentPrivacyLink(consentPrivacyLink);
  }
);

Then(
  /^I see Contact the One Login team link reads (.*)$/,
  async function (contactOneLoginTeamLink) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertContactOneLoginTeamLink(
      contactOneLoginTeamLink
    );
  }
);

Then(
  /^I can see Check your details as (.*)$/,
  async function (checkDetailsTitle) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertRetryTitle(checkDetailsTitle);
  }
);

Then(/^I see error word as (.*)$/, async function (errorPrefix) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertErrorPrefix(errorPrefix);
});

Then(
  /^I see Check your details as (.*)$/,
  async function (errorSummaryMessage) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertYouWillBeAbleToFindSentence(
      errorSummaryMessage
    );
  }
);

//########### Text Content Comparisions - DVA ##############

Then(
  /^I see the heading (.*)$/,
  { timeout: 2 * 5000 },
  async function (pageHeadingDVA) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAPageHeading(pageHeadingDVA);
  }
);

Then(/^I see sentence (.*)$/, async function (pageHeadingDVASentence) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAPageHeadingSentence(
    pageHeadingDVASentence
  );
});

Then(
  /^I see We will check your details as (.*)$/,
  async function (dVAPageSentence) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertdvaPageSentenceTwo(dVAPageSentence);
  }
);

Then(/^I check the page title (.*)$/, async function (dvaPageTitle) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAPageTitle(dvaPageTitle);
});

Then(
  /^I can see the DVA DoB fields titled (.*)$/,
  async function (dobFieldTitle) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVADoBFieldTitle(dobFieldTitle);
  }
);

Then(/^I can see DVA DoB example DVA as (.*)$/, async function (dobExample) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVADobExample(dobExample);
});

Then(/^I can see DVA day as (.*)$/, async function (day) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVADay(day);
});

Then(/^I can see DVA month as (.*)$/, async function (month) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAMonth(month);
});

Then(/^I can see DVA year as (.*)$/, async function (year) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAYear(year);
});

Then(
  /^I see the DVA Issue date field titled (.*)$/,
  async function (issueFieldTitle) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAIssueDateFieldTitle(issueFieldTitle);
  }
);

Then(
  /^I see DVA date section example as (.*)$/,
  async function (issueDateExample) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAIssueDateExample(issueDateExample);
  }
);

Then(/^I can see DVA Issue day as (.*)$/, async function (issueDay) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAIssueDay(issueDay);
});

Then(/^I can see DVA issue month as (.*)$/, async function (issueMonth) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAIssueMonth(issueMonth);
});

Then(/^I can see DVA issue year as (.*)$/, async function (issueYear) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAIssueYear(issueYear);
});

Then(
  /^I can see DVA licence number field titled as (.*)$/,
  async function (validLicenceTitle) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVALicenceTitle(validLicenceTitle);
  }
);

Then(
  /^I see the DVA licence sentence as (.*)$/,
  async function (validLicenceExample) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVALicenceExample(validLicenceExample);
  }
);

Then(
  /^I see the DVA Consent first sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentFirstSentence) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAConsentSentenceOne(consentFirstSentence);
  }
);

Then(
  /^I see the DVA Consent second sentence (.*)$/,
  { timeout: 2 * 5000 },
  async function (consentSecondSentence) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAConsentSentenceTwo(
      consentSecondSentence
    );
  }
);

Then(
  /^I see DVA privacy notice link (.*)$/,
  async function (consentPrivacyLink) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAConsentPrivacyLink(consentPrivacyLink);
  }
);

Then(
  /^I see DVA One Login privacy notice link (.*)$/,
  async function (consentOneLoginLink) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAConsentOneLoginLink(consentOneLoginLink);
  }
);

Given(
  /^they click Footer (.*) and assert I have been redirected correctly$/,
  async function (linkName) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);

    expect(dvaDetailsEntryPage.isCurrentPage()).to.be.true;

    await dvaDetailsEntryPage.assertFooterLink(linkName);
  }
);

Given(
  /^I see support link (.*) in the footer and assert the url is correct and live$/,
  async function (supportLink) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertFooterLink(supportLink);
    await this.page.goBack();
  }
);

Given(
  /^I assert the link in the banner is correct and live$/,
  async function () {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertBannerLink();
  }
);

Given(
  /^I assert the link on the error page is correct and live$/,
  async function () {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertErrorLink();
  }
);

Given(
  /^I assert the link on the page not found page is correct and live$/,
  async function () {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertNotFoundLink();
  }
);

Given(/^I delete the session cookie$/, async function () {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.deleteSessionCookie();
});

Given(/^I go to page not found$/, async function () {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.goToPage("not-found");
});
