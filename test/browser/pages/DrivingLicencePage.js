const { expect: expect } = require("chai");
const TestDataCreator = require("../util/TestDataCreator");

exports.DrivingLicencePage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/details";

    this.licenceNumber = this.page.getByLabel(" Licence number ");

    this.lastName = this.page.getByLabel(" Last name ");
    this.firstName = this.page.getByLabel(" First name ");
    this.middleNames = this.page.getByLabel(" Middle names ");

    this.birthDay = this.page.locator('xpath=//*[@id="dateOfBirth-day"]');
    this.birthMonth = this.page.locator('xpath=//*[@id="dateOfBirth-month"]');
    this.birthYear = this.page.locator('xpath=//*[@id="dateOfBirth-year"]');

    this.licenceValidToDay = this.page.locator(
      'xpath=//*[@id="expiryDate-day"]'
    );
    this.licenceValidToMonth = this.page.locator(
      'xpath=//*[@id="expiryDate-month"]'
    );
    this.licenceValidToYear = this.page.locator(
      'xpath=//*[@id="expiryDate-year"]'
    );

    this.licenceIssueDay = this.page.locator('xpath=//*[@id="issueDate-day"]');
    this.licenceIssueMonth = this.page.locator(
      'xpath=//*[@id="issueDate-month"]'
    );
    this.licenceIssueYear = this.page.locator(
      'xpath=//*[@id="issueDate-year"]'
    );

    this.issueNumber = this.page.getByLabel(" Issue number ");

    this.postcode = this.page.getByLabel(" Postcode ");

    this.consentDVLACheckbox = this.page.getByLabel(
      "Give DVLA your consent to check your driving licence details"
    );

    // Error summary items

    this.invalidLastNameErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#surname")]'
    );

    this.invalidFirstNameErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#firstName")]'
    );

    this.invalidMiddleNamesErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#middleNames")]'
    );

    this.errorSummaryBoxLicenceNumber = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#drivingLicenceNumber")]'
    );

    this.invalidIssueNumberErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#issueNumber")]'
    );

    this.invalidPostcodeErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#postcode")]'
    );

    this.invalidDobErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#dateOfBirth-day")]'
    );

    this.invalidIssueDateErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#issueDate-day")]'
    );

    this.invalidValidToDateErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#expiryDate-day")]'
    );

    this.invalidValidToDateFieldError = this.page.locator(
      'xpath=//*[@id="expiryDate-error"]'
    );

    // Field errors

    this.invalidLastNameFieldError = this.page.locator(
      'xpath=//*[@id="surname-error"]'
    );
    this.invalidFirstNameFieldError = this.page.locator(
      'xpath=//*[@id="firstName-error"]'
    );
    this.invalidMiddleNamesFieldError = this.page.locator(
      'xpath=//*[@id="middleNames-error"]'
    );
    this.drivingLicenceFieldError = this.page.locator(
      'xpath=//*[@id="drivingLicenceNumber-error"]'
    );
    this.invalidIssueNumberFieldError = this.page.locator(
      'xpath=//*[@id="issueNumber-error"]'
    );
    this.invalidPostcodeFieldError = this.page.locator(
      'xpath=//*[@id="postcode-error"]'
    );
    this.invalidDobFieldError = this.page.locator(
      'xpath=//*[@id="dateOfBirth-error"]'
    );
    this.invalidIssueDateFieldError = this.page.locator(
      'xpath=//*[@id="issueDate-error"]'
    );
    this.invalidValidToDateFieldError = this.page.locator(
      'xpath=//*[@id="expiryDate-error"]'
    );

    this.Continue = this.page.locator("button", {
      hasText: " Continue ",
    });
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }

  async assertDVLAPageTitle(dvlaDetailsEntryPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(dvlaDetailsEntryPageTitle);
  }

  async clickOnContinue() {
    await this.Continue.click();
  }

  async userEntersData(issuer, drivingLicenceSubjectScenario) {
    var drivingLicenceSubject = TestDataCreator.getDVLATestUserFromMap(
      issuer,
      drivingLicenceSubjectScenario
    );
    if (issuer === "DVLA") {
      await this.licenceNumber.fill(drivingLicenceSubject.getLicenceNumber());
      await this.birthDay.fill(drivingLicenceSubject.getBirthDay());
      await this.birthMonth.fill(drivingLicenceSubject.getBirthMonth());
      await this.birthYear.fill(drivingLicenceSubject.getBirthYear());
      await this.licenceIssueDay.fill(
        drivingLicenceSubject.getLicenceIssueDay()
      );
      await this.licenceIssueMonth.fill(
        drivingLicenceSubject.getLicenceIssueMonth()
      );
      await this.licenceIssueYear.fill(
        drivingLicenceSubject.getLicenceIssueYear()
      );
      if ((await drivingLicenceSubject.getIssueNumber()) != null) {
        await this.issueNumber.fill(drivingLicenceSubject.getIssueNumber());
      }
    }
    if ((await drivingLicenceSubject.getMiddleNames()) != null) {
      await this.middleNames.fill(drivingLicenceSubject.getMiddleNames());
    }
    await this.firstName.fill(drivingLicenceSubject.getFirstName());
    await this.lastName.fill(drivingLicenceSubject.getLastName());
    await this.licenceValidToDay.fill(
      drivingLicenceSubject.getLicenceValidToDay()
    );
    await this.licenceValidToMonth.fill(
      drivingLicenceSubject.getLicenceValidToMonth()
    );
    await this.licenceValidToYear.fill(
      drivingLicenceSubject.getLicenceValidToYear()
    );
    await this.postcode.fill(drivingLicenceSubject.getPostcode());
    return await this.consentDVLACheckbox.click();
  }

  // Re-enter test data

  async userReEntersLastName(InvalidLastName) {
    await this.lastName.fill(InvalidLastName);
  }

  async userReEntersFirstName(InvalidFirstName) {
    await this.firstName.fill(InvalidFirstName);
  }

  async userReEntersMiddleName(InvalidMiddleNames) {
    await this.middleNames.fill(InvalidMiddleNames);
  }

  async userReEntersLicenceNumber(InvalidLicenceNumber) {
    await this.licenceNumber.fill(InvalidLicenceNumber);
  }

  async userReEntersIssueNumber(InvalidIssueNumber) {
    await this.issueNumber.fill(InvalidIssueNumber);
  }

  async userReEntersPostcode(InvalidPostcode) {
    await this.postcode.fill(InvalidPostcode);
  }

  async userReEntersDayOfBirth(InvalidDayOfBirth) {
    await this.birthDay.fill(InvalidDayOfBirth);
  }

  async userReEntersMonthOfBirth(InvalidMonthOfBirth) {
    await this.birthMonth.fill(InvalidMonthOfBirth);
  }

  async userReEntersYearOfBirth(InvalidYearOfBirth) {
    await this.birthYear.fill(InvalidYearOfBirth);
  }

  async userReEntersDayOfIssue(InvalidDayOfIssue) {
    await this.licenceIssueDay.fill(InvalidDayOfIssue);
  }

  async userReEntersMonthOfIssue(InvalidMonthOfIssue) {
    await this.licenceIssueMonth.fill(InvalidMonthOfIssue);
  }

  async userReEntersYearOfIssue(InvalidYearOfIssue) {
    await this.licenceIssueYear.fill(InvalidYearOfIssue);
  }

  async userReEntersValidToDay(InvalidValidToDay) {
    await this.licenceValidToDay.fill(InvalidValidToDay);
  }

  async userReEntersValidToMonth(InvalidValidToMonth) {
    await this.licenceValidToMonth.fill(InvalidValidToMonth);
  }

  async userReEntersValidToYear(InvalidValidToYear) {
    await this.licenceValidToYear.fill(InvalidValidToYear);
  }

  // Summary box errors and field errors

  async assertInvalidLastNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidLastNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidLastNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidFirstNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidFirstNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidFirstNameFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidMiddleNameInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidMiddleNameOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidMiddleNamesFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidLicenceNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.errorSummaryBoxLicenceNumber.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidLicenceNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.drivingLicenceFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidIssueNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueNumberErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidIssueNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueNumberFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidPostcodeInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidPostcodeErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidPostcodeOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidPostcodeFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidDoBInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDoBOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidIssueInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidIssueOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidIssueDateFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidValidToDateInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidValidToDateOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidValidToDateFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }
};