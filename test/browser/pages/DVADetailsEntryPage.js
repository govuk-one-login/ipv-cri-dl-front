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
    this.supportLink = this.page.locator(
      "xpath=/html/body/footer/div/div/div[1]/ul/li[5]/a"
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

    this.invalidDVAConsentErrorSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#consentDVACheckbox")]'
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

    this.invalidConsentDVAFieldError = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-error"]'
    );

    //Page Content - DVA
    this.header = this.page.locator('xpath=//*[@id="header"]');

    this.dateOfBirthLegend = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-fieldset"]/legend'
    );

    this.dateOfBirthHint = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth-hint"]'
    );

    this.dayLabel = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth"]/div[1]/div/label'
    );

    this.monthLabel = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth"]/div[2]/div/label'
    );

    this.yearLabel = this.page.locator(
      'xpath=//*[@id="dvaDateOfBirth"]/div[3]/div/label'
    );

    this.dateOfIssueLegend = this.page.locator(
      'xpath=//*[@id="dateOfIssue-fieldset"]/legend'
    );

    this.dateOfIssueHint = this.page.locator(
      'xpath=//*[@id="dateOfIssue-hint"]'
    );

    this.dateOfIssueDayLabel = this.page.locator(
      'xpath=//*[@id="dateOfIssue"]/div[1]/div/label'
    );

    this.dateOfIssueMonthLabel = this.page.locator(
      'xpath=//*[@id="dateOfIssue"]/div[2]/div/label'
    );

    this.dateOfIssueYearLabel = this.page.locator(
      'xpath=//*[@id="dateOfIssue"]/div[3]/div/label'
    );

    this.licenceNumberLabel = this.page.locator(
      'xpath=//*[@id="dvaLicenceNumber-label"]'
    );

    this.licenceNumberHint = this.page.locator(
      'xpath=//*[@id="dvaLicenceNumber-hint"]'
    );

    this.serviceDescription = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div'
    );

    this.consentSectionSentenceOneDVA = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-hint"]/p[1]'
    );

    this.consentSectionSentenceTwoDVA = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-hint"]/p[2]'
    );
    this.privacyPolicyDVALink = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-hint"]/ul/li[2]/a'
    );

    this.oneLoginLinkDVA = this.page.locator(
      'xpath=//*[@id="consentDVACheckbox-hint"]/ul/li[1]/a'
    );
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lang=cy"
    );
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

  // DVA text content

  async assertDVAPageHeading(pageHeadingDVA) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.header.innerText()).to.equal(pageHeadingDVA);
  }

  async assertDVAPageHeadingSentence(pageHeadingDVASentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.serviceDescription.innerText()).to.equal(
      pageHeadingDVASentence
    );
  }

  async assertDVADoBFieldTitle(dobFieldTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfBirthLegend.innerText()).to.equal(dobFieldTitle);
  }

  async assertDVADobExample(dobExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfBirthHint.innerText()).to.equal(dobExample);
  }

  async assertDVADay(day) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dayLabel.innerText()).to.contains(day);
  }

  async assertDVAMonth(month) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.monthLabel.innerText()).to.contains(month);
  }

  async assertDVAYear(year) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.yearLabel.innerText()).to.contains(year);
  }

  async assertDVAIssueDateFieldTitle(issueFieldTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfIssueLegend.innerText()).to.equal(issueFieldTitle);
  }

  async assertDVAIssueDateExample(issueDateExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfIssueHint.innerText()).to.equal(issueDateExample);
  }

  async assertDVAIssueDay(issueDay) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfIssueDayLabel.innerText()).to.contains(issueDay);
  }

  async assertDVAIssueMonth(issueMonth) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfIssueMonthLabel.innerText()).to.contains(
      issueMonth
    );
  }

  async assertDVAIssueYear(issueYear) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dateOfIssueYearLabel.innerText()).to.contains(issueYear);
  }

  async assertDVALicenceTitle(validLicenceTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberLabel.innerText()).to.equal(
      validLicenceTitle
    );
  }

  async assertDVALicenceExample(validLicenceExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberHint.innerText()).to.equal(
      validLicenceExample
    );
  }

  async assertDVAConsentSentenceOne(consentFirstSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceOneDVA.innerText()).to.contains(
      consentFirstSentence
    );
  }

  async assertDVAConsentSentenceTwo(consentSecondSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceTwoDVA.innerText()).to.contains(
      consentSecondSentence
    );
  }

  async assertDVAConsentPrivacyLink(consentPrivacyLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.privacyPolicyDVALink.innerText()).to.equal(
      consentPrivacyLink
    );
  }

  async assertDVAConsentOneLoginLink(consentOneLoginLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.oneLoginLinkDVA.innerText()).to.equal(
      consentOneLoginLink
    );
  }

  async assertFooterLink() {
    await this.supportLink.click();
    await this.page.waitForTimeout(2000); //waitForNavigation and waitForLoadState do not work in this case
    expect(await this.page.url()).to.equal(
      "https://home.account.gov.uk/contact-gov-uk-one-login"
    );
  }
};
