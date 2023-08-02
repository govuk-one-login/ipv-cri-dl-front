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
  { timeout: 2 * 5000 },
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

//###################Welsh Language - DVLA- Step Definition########################

Then(
  /^I view the (.*) banner$/,
  { timeout: 2 * 5000 },
  async function (betaBannerLabel) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertBetaBanner(betaBannerLabel);
  }
);

Then(
  /^the beta banner reads (.*)$/,
  async function (betaBannerTextWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertBetaBannerText(betaBannerTextWelsh);
  }
);

Then(/^I can see the lastname as (.*)$/, async function (dvlaLastNameWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertLastName(dvlaLastNameWelsh);
});

Then(/^I can see the givenName as (.*)$/, async function (dvlaGivenNameWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertGivenName(dvlaGivenNameWelsh);
});

Then(/^I can see the firstName as (.*)$/, async function (dvlaFirstNameWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertFirstName(dvlaFirstNameWelsh);
});

Then(
  /^I can see the middleName as (.*)$/,
  async function (dvlaMiddleNameWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertMiddleName(dvlaMiddleNameWelsh);
  }
);

Then(
  /^I can see the first name sentence (.*)$/,
  async function (dvlaFirstNameSentWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertFirstNameSentence(
      dvlaFirstNameSentWelsh
    );
  }
);

Then(
  /^I can see the middle name sentence (.*)$/,
  async function (dvlaMiddleNameSentenceWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertMiddleNameSentence(
      dvlaMiddleNameSentenceWelsh
    );
  }
);

Then(
  /^I can see the DoB fields titled (.*)$/,
  async function (dobFieldTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDoBFieldTitle(dobFieldTitleWelsh);
  }
);

Then(
  /^I can see example as (.*)$/,
  async function (dobExampleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDobExample(dobExampleWelsh);
  }
);

Then(
  /^I can see date as (.*)$/,
  async function (dayWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertDayWelsh(dayWelsh);
  }
);

Then(/^I can see month as (.*)$/, async function (monthWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertMonthWelsh(monthWelsh);
});

Then(/^I can see year as (.*)$/, async function (yearWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertYearWelsh(yearWelsh);
});

Then(
  /^I can see the Issue date field titled (.*)$/,
  async function (issueFieldTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueDateFieldTitleWelsh(issueFieldTitleWelsh);
  }
);

Then(
  /^I can see Issue date sentence as (.*)$/,
  async function (issueDateExampleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueDateExample(issueDateExampleWelsh);
  }
);

Then(
  /^I can see issue day as (.*)$/,
  async function (issueDayWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueDayWelsh(issueDayWelsh);
  }
);

Then(/^I can see issue month as (.*)$/, async function (issueMonthWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertIssueMonthWelsh(issueMonthWelsh);
});

Then(/^I can see issue year as (.*)$/, async function (issueYearWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertIssueYearWelsh(issueYearWelsh);
});

Then(
  /^I can see the Valid to date field titled (.*)$/,
  async function (validDateFieldTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertValidDateFieldTitleWelsh(validDateFieldTitleWelsh);
  }
);

Then(
  /^I can see Valid to date sentence as (.*)$/,
  async function (validDateExampleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertValidDateExample(validDateExampleWelsh);
  }
);

Then(
  /^I can see Valid To day as (.*)$/,
  async function (validToDayWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertValidToDayWelsh(validToDayWelsh);
  }
);

Then(/^I can see Valid To month as (.*)$/, async function (validToMonthWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertValidToMonthWelsh(validToMonthWelsh);
});

Then(/^I can see Valid To year as (.*)$/, async function (validToYearWelsh) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.assertValidToYearWelsh(validToYearWelsh);
});

Then(
  /^I can see the licence number field titled (.*)$/,
  async function (validLicenceTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertLicenceTitle(validLicenceTitleWelsh);
  }
);

Then(
  /^I see the Licence number sentence (.*)$/,
  async function (validLicenceExampleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertLicenceExample(validLicenceExampleWelsh);
  }
);

Then(
  /^I can see the issue number field titled (.*)$/,
  async function (issueNumberTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueNumberTitle(issueNumberTitleWelsh);
  }
);

Then(
  /^I can see issue sentence as (.*)$/,
  async function (issueNumberSentenceWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertIssueSentenceExample(issueNumberSentenceWelsh);
  }
);

Then(
  /^I can see the postcode field titled (.*)$/,
  async function (postcodeTitleWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertPostcodeTitle(postcodeTitleWelsh);
  }
);

Then(
  /^I can see postcode sentence as (.*)$/,
  async function (postcodeSentenceWelsh) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.assertPostcodeSentence(postcodeSentenceWelsh);
  }
);

//########### Welsh - DVA ##############

Then(
   /^I see the heading (.*)$/,
   { timeout: 2 * 5000 },
    async function (pageHeadingDVA) {
      const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
       await dvaDetailsEntryPage.assertDVAPageHeading(pageHeadingDVA);
  }
 );

 Then(
     /^I see sentence (.*)$/,
      async function (pageHeadingDVASentence) {
      const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
      await dvaDetailsEntryPage.assertDVAPageHeadingSentence(pageHeadingDVASentence);
    }
  );

  Then(
      /^I see We will check your details as (.*)$/,
       async function (dVAPageSentence) {
       const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
       await dvaDetailsEntryPage.assertdvaPageSentenceTwo(dVAPageSentence);
     }
   );

  Then(
    /^I check the page title (.*)$/,
    async function (dvaPageTitle) {
      const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
      await dvaDetailsEntryPage.assertDVAPageTitleWelsh(dvaPageTitle);
    }
    );

Then(
  /^I can see the DVA DoB fields titled (.*)$/,
  async function (dobFieldTitleWelsh) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
     await dvaDetailsEntryPage.assertDVADoBFieldTitle(dobFieldTitleWelsh);
   }
 );

Then(
  /^I can see DVA DoB example DVA as (.*)$/,
  async function (dobExampleWelsh) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
      await dvaDetailsEntryPage.assertDVADobExample(dobExampleWelsh);
   }
);

Then(
  /^I can see DVA day as (.*)$/,
  async function (dayWelsh) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVADayWelsh(dayWelsh);
   }
);

Then(/^I can see DVA month as (.*)$/, async function (monthWelsh) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAMonthWelsh(monthWelsh);
 });

Then(/^I can see DVA year as (.*)$/, async function (yearWelsh) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAYearWelsh(yearWelsh);
});

Then(
   /^I see the DVA Issue date field titled (.*)$/,
   async function (issueFieldTitleWelsh) {
    const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAIssueDateFieldTitleWelsh(issueFieldTitleWelsh);
   }
);

Then(
 /^I see DVA date section example as (.*)$/,
 async function (issueDateExampleWelsh) {
   const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
    await dvaDetailsEntryPage.assertDVAIssueDateExample(issueDateExampleWelsh);
 }
);

Then(
  /^I can see DVA Issue day as (.*)$/,
  async function (issueDayWelsh) {
   const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
   await dvaDetailsEntryPage.assertDVAIssueDayWelsh(issueDayWelsh);
 }
);

Then(/^I can see DVA issue month as (.*)$/, async function (issueMonthWelsh) {
  const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
  await dvaDetailsEntryPage.assertDVAIssueMonthWelsh(issueMonthWelsh);
 });

    Then(/^I can see DVA issue year as (.*)$/, async function (issueYearWelsh) {
      const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
      await dvaDetailsEntryPage.assertDVAIssueYearWelsh(issueYearWelsh);
    });

    Then(
      /^I can see DVA licence number field titled as (.*)$/,
      async function (validLicenceTitleWelsh) {
        const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
        await dvaDetailsEntryPage.assertDVALicenceTitle(validLicenceTitleWelsh);
      }
    );

 Then(
   /^I see the DVA licence sentence as (.*)$/,
   async function (validLicenceExampleWelsh) {
   const dvaDetailsEntryPage = new DVADetailsEntryPage(this.page);
   await dvaDetailsEntryPage.assertDVALicenceExample(validLicenceExampleWelsh);
  }
 );
