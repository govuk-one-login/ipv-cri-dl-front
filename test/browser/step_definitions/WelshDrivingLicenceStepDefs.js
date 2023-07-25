const { Given, When, Then } = require("@cucumber/cucumber");

const { DVADetailsEntryPage } = require("../pages/DVADetailsEntryPage");
const { DrivingLicencePage } = require("../pages/DrivingLicencePage");
const { WelshDrivingLicencePage } = require("../pages/WelshDrivingLicencePage");

Then(
  /^I can see the lastname as (.*)$/,
  async function (dvlaLastNameWelsh) {
    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
    await welshDrivingLicencePage.assertLastName(dvlaLastNameWelsh);
  }
);

Then(
  /^I can see the givenName as (.*)$/,
  async function (dvlaGivenNameWelsh) {
    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
    await welshDrivingLicencePage.assertGivenName(dvlaGivenNameWelsh);
  }
);

Then(
  /^I can see the firstName as (.*)$/,
  async function (dvlaFirstNameWelsh) {
    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
    await welshDrivingLicencePage.assertFirstName(dvlaFirstNameWelsh);
  }
);


Then(
  /^I can see the middleName as (.*)$/,
  async function (dvlaMiddleNameWelsh) {
    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
    await welshDrivingLicencePage.assertMiddleName(dvlaMiddleNameWelsh);
  }
);

Then(/^I can see the first name sentence (.*)$/, async function (dvlaFirstNameSentWelsh) {
  const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
  await welshDrivingLicencePage.assertFirstNameSentence(dvlaFirstNameSentWelsh);
});

Then(/^I can see the middle name sentence (.*)$/, async function (dvlaMiddleNameSentenceWelsh) {
  const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
  await welshDrivingLicencePage.assertMiddleNameSentence(dvlaMiddleNameSentenceWelsh);
});

//Then(
//  /^I can see the DoB fields titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertDoBFieldTitle(dobFieldTitleWelsh);
//  }
//);

//Then(
//  /^I can see example as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertDobExample(DobExampleWelsh);
//  }
//);

//Then(
//  /^I can see date as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertDateWelsh(dateWelsh);
//  }
//);
//
//Then(/^I can see month as (.*)$/, async function () {
//  const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//  await welshDrivingLicencePage.assertMonthWelsh(monthWelsh);
//});

//Then(/^I can see year as (.*)$/, async function () {
//  const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//  await welshDrivingLicencePage.assertyearWelsh(yearWelsh);
//});

//Then(
//  /^I can see the Issue date field titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertIssueDateFieldTitleWelsh(issueFieldTitleWelsh);
//  }
//);

//Then(
//  /^I can see Issue date sentence as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertIssueDateExample(issueDateExampleWelsh);
//  }
//);

//Then(
//  /^ I can see the Valid to date field titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertValidDateFieldTitleWelsh(validDateFieldTitleWelsh);
//  }
//);

//Then(
//  /^I can see Valid to date sentence as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertValidDateExample(validDateExampleWelsh);
//  }
//);

//Then(
//  /^I can see the licence number field titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertLicenceTitle(validLicenceTitleWelsh);
//  }
//);

//Then(
//  /^I can see the issue number field titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertIssueNumberTitle(issueNumberTitleWelsh);
//  }
//);

//Then(
//  /^I can see issue sentence as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertIssueSentenceExample(issueSentenceWelsh);
//  }
//);

//Then(
//  /^I can see the postcode field titled (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertPostcodeTitle(postcodeTitleWelsh);
//  }
//);

//Then(
//  /^I can see postcode sentence as (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertPostcodeSentence(postcodeSentenceWelsh);
//  }
//);

//Then(
//  /^I view the Beta banner (.*)$/,
//  async function () {
//    const welshDrivingLicencePage = new WelshDrivingLicencePage(this.page);
//    await welshDrivingLicencePage.assertPostcodeSentence(postcodeSentenceWelsh);
//  }
//);




















Then(/^User clicks on continue$/,
  { timeout: 3 * 5000 },
  async function () {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.clickOnContinue();
});
