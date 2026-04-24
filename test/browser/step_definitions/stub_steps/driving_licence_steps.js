const { Given, When, Then, And } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {
  IpvCoreStubCredentialIssuerPage,
  IpvCoreStubUserSearchPage,
  IpvCoreStubUserEditPage,
  DrivingLicencePage,
  CheckYourDetailsPage,
  ConsentPage,
  IpvCoreStubVerfiyVcPage
} = require("../../pages/stub_pages");
const { assertUrlPathContains } = require("../../util/browserUtils");
const ConfigurationReader = require("../../support/configuration-reader");

require("dotenv").config();

Given("I navigate to the IPV Core Stub", async function () {
  await this.context.clearCookies();

  let coreStubUrl = ConfigurationReader.get("CORE_STUB_URL");
  const coreStubUsername = ConfigurationReader.get("CORE_STUB_USERNAME");
  const coreStubPassword = ConfigurationReader.get("CORE_STUB_PASSWORD");

  if (coreStubUsername && coreStubPassword) {
    const urlRegex = /^(https?:\/\/)?(.*)$/;
    const urlParts = urlRegex.exec(coreStubUrl);
    const protocol = urlParts[1] || "https://";
    const domain = urlParts[2];
    coreStubUrl = `${protocol}${coreStubUsername}:${coreStubPassword}@${domain}`;
  }

  await this.page.goto(coreStubUrl);
  const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
    this.page
  );
  await ipvCoreStubCredentialIssuerPage.assertOnIpvCoreStubPage();
});

Given(
  "I click the Driving Licence CRI for the testEnvironment",
  async function () {
    const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
      this.page
    );
    const testEnvironment = ConfigurationReader.get("ENVIRONMENT");
    await ipvCoreStubCredentialIssuerPage.clickVisitCredentialIssuers();
    await ipvCoreStubCredentialIssuerPage.clickCRIForEnvironment(
      testEnvironment
    );
    await expect(this.page).toHaveURL(
      /credential-issuer\?cri=driving-licence-cri/
    );
  }
);

Given(
  "I search for user number {int} in the ThirdParty table",
  async function (userNumber) {
    const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
      this.page
    );
    await ipvCoreStubCredentialIssuerPage.searchForUATUser(String(userNumber));
  }
);

Given(
  /^I search for user name (.*) in the ThirdParty table$/,
  async function (userName) {
    const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
      this.page
    );
    await ipvCoreStubCredentialIssuerPage.searchForUATUserByUserName(
      String(userName)
    );
  }
);

When(
  /^I provide the (.*) for Auth Source Journey$/,
  async function (contextValue) {
    const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
      this.page
    );
    await ipvCoreStubCredentialIssuerPage.enterContext(contextValue);
  }
);

When(
  /^I provide the raw JSON for (.*)$/,
  async function (drivingLicenceSubjectRawJSON) {
    const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
      this.page
    );
    await ipvCoreStubCredentialIssuerPage.enterRawJSON(
      drivingLicenceSubjectRawJSON
    );
  }
);

When(/^I click the Go to Driving Licence CRI button$/, async function () {
  const ipvCoreStubCredentialIssuerPage = new IpvCoreStubCredentialIssuerPage(
    this.page
  );
  await ipvCoreStubCredentialIssuerPage.clickGoToDrivingLicenceCRI();
});

When(/^User clicks the Go to Driving Licence CRI button$/, async function () {
  const ipvCoreStubUserSearchPage = new IpvCoreStubUserSearchPage(this.page);
  await ipvCoreStubUserSearchPage.userSearchGoToCri();
});

When(/^User clicks Edit User button$/, async function () {
  const ipvCoreStubUserSearchPage = new IpvCoreStubUserSearchPage(this.page);
  await ipvCoreStubUserSearchPage.userSearchEditUser();
});

When(
  /^I update the user details with given name (.*), family name (.*)$/,
  async function (givenName, familyName) {
    const ipvCoreStubUserEditPage = new IpvCoreStubUserEditPage(this.page);
    const detailsToUpdate = {
      givenName: givenName,
      familyName: familyName
    };
    await ipvCoreStubUserEditPage.updateUserDetails(detailsToUpdate);
  }
);

Then(
  /^User is navigated to the Licence Issuer (.*) Page$/,
  async function (page) {
    await assertUrlPathContains(this.page, page);
  }
);

Then(/^I select the (.*) radio button$/, async function (licenceIssuer) {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.selectLicenceIssuer(licenceIssuer);
});

Then(/^User clicks the driving licence continue button$/, async function () {
  const drivingLicencePage = new DrivingLicencePage(this.page);
  await drivingLicencePage.clickContinue();
});

Then(
  /^User enter data as a (.*)$/,
  { timeout: 2 * 5000 },
  async function (drivingLicenceSubject) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.userEntersData(drivingLicenceSubject);
  }
);

Then(
  /^I click the (.*) consent checkbox$/,
  async function (drivingLicenceConsent) {
    const drivingLicencePage = new DrivingLicencePage(this.page);
    await drivingLicencePage.clickConsentCheckbox(drivingLicenceConsent);
  }
);

Then(
  /^User is navigated to the Check Your Details (.*) Page$/,
  async function (page) {
    await assertUrlPathContains(this.page, page);
  }
);

Then(
  /^User selects the (.*) button to confirm their details are correct$/,
  async function (confirmCorrectDetails) {
    const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
    await checkYourDetailsPage.confirmLicenceDetails(confirmCorrectDetails);
  }
);

Then(/^I click the Confirm and Continue button$/, async function () {
  const checkYourDetailsPage = new CheckYourDetailsPage(this.page);
  await checkYourDetailsPage.clickConfirmAndContinue();
});

Then(/^User is navigated to the Consent (.*) Page$/, async function (page) {
  await assertUrlPathContains(this.page, page);
});

Then(
  /^I click the consent page (.*) checkbox$/,
  async function (drivingLicenceConsent) {
    const consentPage = new ConsentPage(this.page);
    await consentPage.clickConsentCheckbox(drivingLicenceConsent);
  }
);

Then(/^I click the consent page continue button$/, async function () {
  const consentPage = new ConsentPage(this.page);
  await consentPage.clickConsentPageContinue();
});

Then(
  /^User is navigated to the Verifiable Credential Issuers Page$/,
  async function () {
    const ipvCoreStubVerifyVcPage = new IpvCoreStubVerfiyVcPage(this.page);
    const expectedSubstring = "callback";
    await ipvCoreStubVerifyVcPage.verifyCurrentUrlContains(expectedSubstring);
  }
);

Then(
  /^The VC contains the expected response for (.+) (.+) with (.*) (.*)$/,
  async function (
    expectedGivenName,
    expectedFamilyName,
    expectedStrengthScore,
    expectedValidityScore
  ) {
    const ipvCoreStubVerifyVcPage = new IpvCoreStubVerfiyVcPage(this.page);
    await ipvCoreStubVerifyVcPage.validateJsonResponseFromDrivingLicenceCri(
      expectedGivenName,
      expectedFamilyName,
      expectedStrengthScore,
      expectedValidityScore
    );
    await expect(this.page).toHaveURL(/callback\?client_id=/);
  }
);
