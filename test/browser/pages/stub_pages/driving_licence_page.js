const TestDataCreator = require("../../util/TestDataCreator");

class DrivingLicencePage {
  constructor(page) {
    this.page = page;
    this.licenceIssuerContinueButton = page.locator(
      'xpath=//*[@id="continue"]'
    );

    // DVLA selectors
    this.licenceNumber = page.locator('xpath=//*[@id="drivingLicenceNumber"]');
    this.lastName = page.locator('xpath=//*[@id="surname"]');
    this.firstName = page.locator('xpath=//*[@id="firstName"]');
    this.middleNames = page.locator('xpath=//*[@id="middleNames"]');
    this.birthDay = page.locator('xpath=//*[@id="dateOfBirth-day"]');
    this.birthMonth = page.locator('xpath=//*[@id="dateOfBirth-month"]');
    this.birthYear = page.locator('xpath=//*[@id="dateOfBirth-year"]');
    this.licenceValidToDay = page.locator('xpath=//*[@id="expiryDate-day"]');
    this.licenceValidToMonth = page.locator(
      'xpath=//*[@id="expiryDate-month"]'
    );
    this.licenceValidToYear = page.locator('xpath=//*[@id="expiryDate-year"]');
    this.licenceIssueDay = page.locator('xpath=//*[@id="issueDate-day"]');
    this.licenceIssueMonth = page.locator('xpath=//*[@id="issueDate-month"]');
    this.licenceIssueYear = page.locator('xpath=//*[@id="issueDate-year"]');
    this.issueNumber = page.locator('xpath=//*[@id="issueNumber"]');
    this.postcode = page.locator('xpath=//*[@id="postcode"]');
    this.consentDVLACheckbox = page.locator('xpath=//*[@id="consentCheckbox"]');
    // DVA selectors
    this.dvaLicenceNumber = page.locator('xpath=//*[@id="dvaLicenceNumber"]');
    this.dvaBirthDay = page.locator('xpath=//*[@id="dvaDateOfBirth-day"]');
    this.dvaBirthMonth = page.locator('xpath=//*[@id="dvaDateOfBirth-month"]');
    this.dvaBirthYear = page.locator('xpath=//*[@id="dvaDateOfBirth-year"]');
    this.dvaLicenceIssueDay = page.locator('xpath=//*[@id="dateOfIssue-day"]');
    this.dvaLicenceIssueMonth = page.locator(
      'xpath=//*[@id="dateOfIssue-month"]'
    );
    this.dvaLicenceIssueYear = page.locator(
      'xpath=//*[@id="dateOfIssue-year"]'
    );
    this.consentDVACheckbox = page.locator(
      'xpath=//*[@id="consentDVACheckbox"]'
    );
  }

  async clickConsentCheckbox(drivingLicenceConsent) {
    if (drivingLicenceConsent === "DVA") {
      await this.consentDVACheckbox.click();
    } else {
      await this.consentDVLACheckbox.click();
    }
  }

  async userEntersData(drivingLicenceSubject) {
    if (TestDataCreator.isDVLAUser(drivingLicenceSubject)) {
      const subject = TestDataCreator.getDVLATestUserFromMap(
        drivingLicenceSubject
      );
      await this.licenceNumber.fill(subject.getLicenceNumber());
      await this.birthDay.fill(subject.getBirthDay());
      await this.birthMonth.fill(subject.getBirthMonth());
      await this.birthYear.fill(subject.getBirthYear());
      await this.licenceIssueDay.fill(subject.getLicenceIssueDay());
      await this.licenceIssueMonth.fill(subject.getLicenceIssueMonth());
      await this.licenceIssueYear.fill(subject.getLicenceIssueYear());
      await this.issueNumber.fill(subject.getIssueNumber());
      await this.middleNames.fill(subject.getMiddleNames());
      await this.firstName.fill(subject.getFirstName());
      await this.lastName.fill(subject.getLastName());
      await this.licenceValidToDay.fill(subject.getLicenceValidToDay());
      await this.licenceValidToMonth.fill(subject.getLicenceValidToMonth());
      await this.licenceValidToYear.fill(subject.getLicenceValidToYear());
      await this.postcode.fill(subject.getPostcode());
    } else {
      const subject = TestDataCreator.getDVATestUserFromMap(
        drivingLicenceSubject
      );
      await this.dvaLicenceNumber.fill(subject.getLicenceNumber());
      await this.dvaBirthDay.fill(subject.getBirthDay());
      await this.dvaBirthMonth.fill(subject.getBirthMonth());
      await this.dvaBirthYear.fill(subject.getBirthYear());
      await this.dvaLicenceIssueDay.fill(subject.getLicenceIssueDay());
      await this.dvaLicenceIssueMonth.fill(subject.getLicenceIssueMonth());
      await this.dvaLicenceIssueYear.fill(subject.getLicenceIssueYear());
      await this.firstName.fill(subject.getFirstName());
      await this.lastName.fill(subject.getLastName());
      await this.licenceValidToDay.fill(subject.getLicenceValidToDay());
      await this.licenceValidToMonth.fill(subject.getLicenceValidToMonth());
      await this.licenceValidToYear.fill(subject.getLicenceValidToYear());
      await this.postcode.fill(subject.getPostcode());
    }
  }

  async selectLicenceIssuer(licenceIssuer) {
    const id =
      licenceIssuer === "DVLA"
        ? "licenceIssuer"
        : `licenceIssuer-${licenceIssuer}`;
    await this.page.locator(`xpath=//*[@id="${id}"]`).click();
  }

  async clickContinue() {
    await Promise.all([
      this.licenceIssuerContinueButton.click(),
      this.page.waitForNavigation({ timeout: 40000 })
    ]);
  }
}

module.exports = DrivingLicencePage;
