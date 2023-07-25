const { expect: expect } = require("chai");
const TestDataCreator = require("../util/TestDataCreator");

exports.DVADetailsEntryPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/details";

    this.licenceNumber = this.page.getByLabel(" Licence number ");

    this.lastName = this.page.getByLabel(" Last name ");
    this.firstName = this.page.getByLabel(" First name ");
    this.middleNames = this.page.getByLabel(" Middle names ");

    this.dvaBirthDay = this.page.locator('xpath=//*[@id="dvaDateOfBirth-day"]');
    this.dvaBirthMonth = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-month"]'
    );
    this.dvaBirthYear = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-year"]'
    );

    this.licenceValidToDay = this.page.locator(
      'xpath=//*[@id="expiryDate-day"]'
    );
    this.licenceValidToMonth = this.page.locator(
      'xpath=//*[@id="expiryDate-month"]'
    );
    this.licenceValidToYear = this.page.locator(
      'xpath=//*[@id="expiryDate-year"]'
    );

    this.dvaLicenceIssueDay = this.page.locator(
      'xpath=//*[@id="dateOfIssue-day"]'
    );
    this.dvaLicenceIssueMonth = this.page.locator(
      'xpath=//*[@id="dateOfIssue-month"]'
    );
    this.dvaLicenceIssueYear = this.page.locator(
      'xpath=//*[@id="dateOfIssue-year"]'
    );

    this.postcode = this.page.getByLabel(" Postcode ");

    this.consentDVACheckbox = this.page.getByLabel(
      "Give DVA your consent to check your driving licence details"
    );

    // DVA Error summary items

    this.dvaErrorSummaryBoxLicenceNumber = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#dvaLicenceNumber")]'
    );

    this.invalidDobDvaErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#dvaDateOfBirth-day")]'
    );

    this.invalidDvaIssueDateErrorInSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#dateOfIssue-day")]'
    );

    this.invalidDVAConsentErrorSummary = this.page.locator("a", {
      hasText: "You must give your consent to continue",
    });

    //  DVA Field errors

    this.dvaDrivingLicenceFieldError = this.page.locator(
      'xpath=//*[@id="dvaLicenceNumber-error"]'
    );
    this.invalidDobDvaFieldError = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-error"]'
    );
    this.invalidDvaIssueDateFieldError = this.page.locator(
      'xpath=//*[@id="dateOfIssue-error"]'
    );
    this.invalidConsentDVAFieldError = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-error"]'
    );
  }

  isCurrentPage() {
    return this.page.url() === this.url;
  }

  async assertDVAPageTitle(dvaDetailsEntryPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(dvaDetailsEntryPageTitle);
  }

  async assertDVAErrorPageTitle(dvaErrorPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(dvaErrorPageTitle);
  }

  async userEntersDVAData(issuer, drivingLicenceSubjectScenario) {
    var dvaDrivingLicenceSubject = TestDataCreator.getDVATestUserFromMap(
      issuer,
      drivingLicenceSubjectScenario
    );
    if (issuer === "DVA") {
      await this.licenceNumber.fill(
        dvaDrivingLicenceSubject.getLicenceNumber()
      );
      await this.dvaBirthDay.fill(dvaDrivingLicenceSubject.getBirthDay());
      await this.dvaBirthMonth.fill(dvaDrivingLicenceSubject.getBirthMonth());
      await this.dvaBirthYear.fill(dvaDrivingLicenceSubject.getBirthYear());
      await this.dvaLicenceIssueDay.fill(
        dvaDrivingLicenceSubject.getLicenceIssueDay()
      );
      await this.dvaLicenceIssueMonth.fill(
        dvaDrivingLicenceSubject.getLicenceIssueMonth()
      );
      await this.dvaLicenceIssueYear.fill(
        dvaDrivingLicenceSubject.getLicenceIssueYear()
      );
    }
    if ((await dvaDrivingLicenceSubject.getMiddleNames()) != null) {
      await this.middleNames.fill(dvaDrivingLicenceSubject.getMiddleNames());
    }
    await this.firstName.fill(dvaDrivingLicenceSubject.getFirstName());
    await this.lastName.fill(dvaDrivingLicenceSubject.getLastName());
    await this.licenceValidToDay.fill(
      dvaDrivingLicenceSubject.getLicenceValidToDay()
    );
    await this.licenceValidToMonth.fill(
      dvaDrivingLicenceSubject.getLicenceValidToMonth()
    );
    await this.licenceValidToYear.fill(
      dvaDrivingLicenceSubject.getLicenceValidToYear()
    );
    await this.postcode.fill(dvaDrivingLicenceSubject.getPostcode());
    return await this.consentDVACheckbox.click();
  }

  // Re-enter test data

  async dvaUserReEntersDayOfBirth(InvalidDayOfBirth) {
    await this.dvaBirthDay.fill(InvalidDayOfBirth);
  }

  async dvaUserReEntersMonthOfBirth(InvalidMonthOfBirth) {
    await this.dvaBirthMonth.fill(InvalidMonthOfBirth);
  }

  async dvaUserReEntersYearOfBirth(InvalidYearOfBirth) {
    await this.dvaBirthYear.fill(InvalidYearOfBirth);
  }

  async userReEntersDVADayOfIssue(InvalidDayOfIssue) {
    await this.dvaLicenceIssueDay.fill(InvalidDayOfIssue);
  }

  async userReEntersDVAMonthOfIssue(InvalidMonthOfIssue) {
    await this.dvaLicenceIssueMonth.fill(InvalidMonthOfIssue);
  }

  async userReEntersDVAYearOfIssue(InvalidYearOfIssue) {
    await this.dvaLicenceIssueYear.fill(InvalidYearOfIssue);
  }

  // DVA Summary box errors and field errors

  async assertInvalidDVALicenceNumberInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dvaErrorSummaryBoxLicenceNumber.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDVALicenceNumberOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dvaDrivingLicenceFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidDoBInDvaErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobDvaErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDoBOnDvaField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDobDvaFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async assertInvalidDVAIssueInErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDvaIssueDateErrorInSummary.innerText()).to.equal(
      errorSummaryText
    );
  }

  async assertInvalidDVAIssueOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDvaIssueDateFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  async consentDVACheckBoxUnselect() {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    return await this.consentDVACheckbox.click();
  }

  async assertConsentDVAErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidDVAConsentErrorSummary.innerText()).to.contains(
      errorSummaryText
    );
  }

  async assertConsentDVAErrorOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidConsentDVAFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }
};
