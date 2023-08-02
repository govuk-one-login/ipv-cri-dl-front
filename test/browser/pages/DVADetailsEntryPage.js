const { expect: expect } = require("chai");
const TestDataCreator = require("../util/TestDataCreator");

exports.DVADetailsEntryPage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/details";

    this.licenceNumber = this.page.locator('xpath=//*[@id="dvaLicenceNumber"]');

    this.lastName = this.page.locator('xpath=//*[@id="surname"]');
    this.firstName = this.page.locator('xpath=//*[@id="firstName"]');
    this.middleNames = this.page.locator('xpath=//*[@id="middleNames"]');

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

    this.postcode = this.page.locator('xpath=//*[@id="postcode"]');

    this.consentDVACheckbox = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox"]'
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

   //Welsh - DVA
    this.headingDVAWelsh = this.page.locator(
      'xpath=//*[@id="header"]'
     );

    this.dVADobFieldTitleWelsh = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-fieldset"]/legend'
    );

    this.dVADobHintWelsh = this.page.locator(
     'xpath=//*[@id="dvaDateOfBirth-hint"]'
    );

    this.dayInWelshDVA = this.page.locator(
     'xpath=//*[@id="dvaDateOfBirth"]/div[1]/div/label'
    );

    this.monthInWelshDVA = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth"]/div[2]/div/label'
    );

    this.yearInWelshDVA = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth"]/div[3]/div/label'
    );

    this.issueDVAFieldTitleWelsh = this.page.locator(
      'xpath=//*[@id="dateOfIssue-fieldset"]/legend'
    );

    this.issueDVAFieldHint = this.page.locator(
      'xpath=//*[@id="dateOfIssue-hint"]'
    );

    this.issueDVADayInWelsh = this.page.locator(
     'xpath=//*[@id="dateOfIssue"]/div[1]/div/label'
    );

    this.issueDVAMonthInWelsh = this.page.locator(
      'xpath=//*[@id="dateOfIssue"]/div[2]/div/label'
    );

    this.issueDVAYearInWelsh = this.page.locator(
      'xpath=//*[@id="dateOfIssue"]/div[3]/div/label'
    );

    this.licenceDVATitleWelsh = this.page.locator(
      'xpath=//*[@id="dvaLicenceNumber-label"]'
    );

    this.licenceDVAExampleWelsh = this.page.locator(
      'xpath=//*[@id="dvaLicenceNumber-hint"]'
    );

    this.headingDVASentenceWelsh = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div'
    );
  }

  isCurrentPage() {
    return this.page.url() === this.url || this.page.url() === this.url + "?lang=cy";
  }

  async assertDVAPageTitle(dvaDetailsEntryPageTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.page.title()).to.equal(dvaDetailsEntryPageTitle);
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

  async dvaUserReEntersLicenceNumber(InvalidLicenceNumber) {
    await this.licenceNumber.fill(InvalidLicenceNumber);
  }

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

  // Welsh DVA

  async assertDVAPageTitleWelsh(dvaPageTitle) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.page.title()).to.equal(dvaPageTitle);
  }

  async assertDVAPageHeading(pageHeadingDVA) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.headingDVAWelsh.innerText()).to.equal(
       pageHeadingDVA);
  }

  async assertDVAPageHeadingSentence(pageHeadingDVASentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.headingDVASentenceWelsh.innerText()).to.equal(
       pageHeadingDVASentence);
  }

  async assertDVADoBFieldTitle(dobFieldTitleWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.dVADobFieldTitleWelsh.innerText()).to.equal(
       dobFieldTitleWelsh);
  }

  async assertDVADobExample(dobExampleWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.dVADobHintWelsh.innerText()).to.equal(
        dobExampleWelsh);
  }

  async assertDVADayWelsh(dayWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     await expect(await this.dayInWelshDVA.innerText()).to.equal(
       dayWelsh);
  }

  async assertDVAMonthWelsh(monthWelsh) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.monthInWelshDVA.innerText()).to.equal(
       monthWelsh);
  }

  async assertDVAYearWelsh(yearWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     await expect(await this.yearInWelshDVA.innerText()).to.equal(
         yearWelsh);
  }

  async assertDVAIssueDateFieldTitleWelsh(issueFieldTitleWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.issueDVAFieldTitleWelsh.innerText()).to.equal(
        issueFieldTitleWelsh);
  }

  async assertDVAIssueDateExample(issueDateExampleWelsh) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueDVAFieldHint.innerText()).to.equal(
       issueDateExampleWelsh);
  }

  async assertDVAIssueDayWelsh(issueDayWelsh) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueDVADayInWelsh.innerText()).to.equal(
       issueDayWelsh);
  }

  async assertDVAIssueMonthWelsh(issueMonthWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.issueDVAMonthInWelsh.innerText()).to.equal(
      issueMonthWelsh);
  }

  async assertDVAIssueYearWelsh(issueYearWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.issueDVAYearInWelsh.innerText()).to.equal(
        issueYearWelsh);
  }

  async assertDVALicenceTitle(validLicenceTitleWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.licenceDVATitleWelsh.innerText()).to.equal(
       validLicenceTitleWelsh);
  }

  async assertDVALicenceExample(validLicenceExampleWelsh) {
     await this.page.waitForLoadState("domcontentloaded");
     expect(await this.isCurrentPage()).to.be.true;
     expect(await this.licenceDVAExampleWelsh.innerText()).to.equal(
          validLicenceExampleWelsh);
  }
};
