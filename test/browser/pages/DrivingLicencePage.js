const { expect: expect } = require("chai");
const moment = require("moment");
const TestDataCreator = require("../util/TestDataCreator");

exports.DrivingLicencePage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/details";

    this.licenceNumber = this.page.locator(
      'xpath=//*[@id="drivingLicenceNumber"]'
    );

    this.lastName = this.page.locator('xpath=//*[@id="surname"]');
    this.firstName = this.page.locator('xpath=//*[@id="firstName"]');
    this.middleNames = this.page.locator('xpath=//*[@id="middleNames"]');

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

    this.issueNumber = this.page.locator('xpath=//*[@id="issueNumber"]');

    this.postcode = this.page.locator('xpath=//*[@id="postcode"]');

    this.consentDVLACheckbox = this.page.locator(
      'xpath=//*[@id="consentCheckbox"]'
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
    this.invalidConsentErrorSummary = this.page.locator(
      'xpath=//*[@class="govuk-error-summary error-summary"]//*[@class="govuk-error-summary__body"]//*[@class="govuk-list govuk-error-summary__list"]//*[contains(@href,"#consentCheckbox")]'
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

    this.drivingLicenceRetryMessageHeading = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div[1]/div[2]'
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

    //    this.Continue = this.page.locator("button", {
    //      hasText: " Continue ",
    //    });

    this.invalidConsentErrorFieldError = this.page.locator(
      'xpath=//*[@id="consentCheckbox-error"]'
    );

    this.Continue = this.page.locator('xpath=//*[@id="continue"]');

    // Content Fields

    this.betaBannerReads = this.page.locator(
      "xpath=/html/body/div[2]/div/p/span"
    );

    this.betaBanner = this.page.locator("xpath=/html/body/div[2]/div/p/strong");

    this.lastNameLabel = this.page.locator('xpath=//*[@id="surname-label"]');

    this.givenNameLegend = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/div[2]/fieldset/legend'
    );

    this.firstNameLabel = this.page.locator('xpath=//*[@id="firstName-label"]');

    this.middleNames = this.page.locator('xpath=//*[@id="middleNames-label"]');

    this.firstNameSentence = this.page.locator(
      'xpath=//*[@id="firstName-hint"]'
    );
    this.middleNameSentence = this.page.locator(
      'xpath=//*[@id="middleNames-hint"]'
    );

    this.dobFieldTitleLegend = this.page.locator(
      'xpath=//*[@id="dateOfBirth-fieldset"]/legend'
    );

    this.dobExample = this.page.locator('xpath=//*[@id="dateOfBirth-hint"]');

    this.dayLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[1]/div/label'
    );

    this.monthLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[2]/div/label'
    );

    this.yearLabel = this.page.locator(
      'xpath=//*[@id="dateOfBirth"]/div[3]/div/label'
    );

    this.issueFieldTitleLegend = this.page.locator(
      'xpath=//*[@id="issueDate-fieldset"]/legend'
    );
    this.issueFieldHint = this.page.locator('xpath=//*[@id="issueDate-hint"]');

    this.issueDayLabel = this.page.locator(
      'xpath=//*[@id="issueDate"]/div[1]/div/label'
    );

    this.issueMonthLabel = this.page.locator(
      'xpath=//*[@id="issueDate"]/div[2]/div/label'
    );
    this.issueYearLabel = this.page.locator(
      'xpath=//*[@id="issueDate"]/div[3]/div/label'
    );

    this.validToFieldTitleLegend = this.page.locator(
      'xpath=//*[@id="expiryDate-fieldset"]/legend'
    );

    this.validToFieldHint = this.page.locator(
      'xpath=//*[@id="expiryDate-hint"]'
    );

    this.validTodayLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[1]/div/label'
    );

    this.validToMonthLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[2]/div/label'
    );

    this.validToYearLabel = this.page.locator(
      'xpath=//*[@id="expiryDate"]/div[3]/div/label'
    );

    this.licenceNumberLabel = this.page.locator(
      'xpath=//*[@id="drivingLicenceNumber-label"]'
    );

    this.licenceNumberHint = this.page.locator(
      'xpath=//*[@id="drivingLicenceNumber-hint"]'
    );

    this.issueNumberLabel = this.page.locator(
      'xpath=//*[@id="issueNumber-label"]'
    );

    this.issueNumberHint = this.page.locator(
      'xpath=//*[@id="issueNumber-hint"]'
    );

    this.postcodeLabel = this.page.locator('xpath=//*[@id="postcode-label"]');

    this.postcodeHint = this.page.locator('xpath=//*[@id="postcode-hint"]');

    this.consentSectionTitle = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/form/h2'
    );

    this.consentSectionSentenceOne = this.page.locator(
      'xpath=//*[@id="consentCheckbox-hint"]/p[1]'
    );

    this.consentSectionSentenceTwo = this.page.locator(
      'xpath=//*[@id="consentCheckbox-hint"]/p[2]'
    );

    this.oneLoginLink = this.page.locator(
      'xpath=//*[@id="consentCheckbox-hint"]/ul/li[1]/a'
    );

    this.privacyPolicyDVLALink = this.page.locator(
      'xpath=//*[@id="consentCheckbox-hint"]/ul/li[2]/a'
    );

    this.retryCheckDetailsTitleLabel = this.page.locator(
      'xpath=//*[@id="header"]'
    );

    this.errorText = this.page.locator(
      'xpath=//*[@id="govuk-notification-banner-title"]'
    );

    this.thereWasAProblemFirstSentence = this.page.locator(
      'xpath=//*[@id="main-content"]/div/div/div[1]/div[2]/p[1]'
    );
  }

  isCurrentPage() {
    return (
      this.page.url() === this.url || this.page.url() === this.url + "?lang=cy"
    );
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

  async userReEntersDayOfIssueAsCurrentDateMinus(days) {
    var subtractedDate = moment().subtract(days, "days");
    await this.licenceIssueDay.fill(subtractedDate.format("DD"));
    await this.licenceIssueMonth.fill(subtractedDate.format("MM"));
    await this.licenceIssueYear.fill(subtractedDate.format("YYYY"));
  }

  async userReEntersDayOfIssueAsCurrentDatePlus(days) {
    await this.licenceIssueDay.fill(moment().add(days, "days").format("DD"));
  }

  async userReEntersMonthOfIssue(InvalidMonthOfIssue) {
    await this.licenceIssueMonth.fill(InvalidMonthOfIssue);
  }

  async userReEntersMonthOfIssueAsCurrentDateMinus(months) {
    await this.licenceIssueMonth.fill(
      moment().subtract(months, "months").format("MM")
    );
  }

  async userReEntersYearOfIssue(InvalidYearOfIssue) {
    await this.licenceIssueYear.fill(InvalidYearOfIssue);
  }

  async userReEntersYearOfIssueAsCurrentDateMinus(years) {
    await this.licenceIssueYear.fill(
      moment().subtract(years, "years").format("YYYY")
    );
  }

  async userReEntersIssueDateAsCurrentDate() {
    await this.licenceIssueYear.fill(moment().format("YYYY"));
    await this.licenceIssueMonth.fill(moment().format("MM"));
    await this.licenceIssueDay.fill(moment().format("DD"));
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

  async assertRetryErrorMessage(retryMessageHeading) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(
      await this.drivingLicenceRetryMessageHeading.innerText()
    ).to.contains(retryMessageHeading);
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

  async consentCheckBoxUnselect() {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    return await this.consentDVLACheckbox.click();
  }

  async assertConsentErrorSummary(errorSummaryText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidConsentErrorSummary.innerText()).to.contains(
      errorSummaryText
    );
  }

  async assertConsentErrorOnField(fieldErrorText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.invalidConsentErrorFieldError.innerText()).to.contains(
      fieldErrorText
    );
  }

  //  Language
  async assertBetaBanner(betaBannerLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBanner.textContent()).to.contains(
      betaBannerLabel
    );
  }

  async assertBetaBannerText(assertBetaBannerText) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.betaBannerReads.textContent()).to.contains(
      assertBetaBannerText
    );
  }

  async assertLastName(dvlalastNameLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.lastNameLabel.textContent()).to.contains(
      dvlalastNameLabel
    );
  }

  async assertGivenName(dvlagivenNameLegend) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.givenNameLegend.textContent()).to.contain(
      dvlagivenNameLegend
    );
  }

  async assertFirstName(dvlaFirstName) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.firstNameLabel.textContent()).to.contain(dvlaFirstName);
  }

  async assertMiddleName(dvlaMiddleName) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.middleNames.textContent()).to.contain(dvlaMiddleName);
  }

  async assertFirstNameSentence(dvlaFirstNameSent) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.firstNameSentence.innerText()).to.equal(
      dvlaFirstNameSent
    );
  }

  async assertMiddleNameSentence(dvlaMiddleNameSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.middleNameSentence.innerText()).to.equal(
      dvlaMiddleNameSentence
    );
  }

  async assertDoBFieldTitle(dobFieldTitleLegend) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dobFieldTitleLegend.innerText()).to.equal(
      dobFieldTitleLegend
    );
  }

  async assertDobExample(dobExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.dobExample.innerText()).to.equal(dobExample);
  }

  async assertDay(day) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.dayLabel.innerText()).to.contains(day);
  }

  async assertMonth(month) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.monthLabel.innerText()).to.contains(month);
  }

  async assertYear(year) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    await expect(await this.yearLabel.innerText()).to.contains(year);
  }

  async assertIssueDateFieldTitle(issueFieldTitleLegend) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueFieldTitleLegend.innerText()).to.equal(
      issueFieldTitleLegend
    );
  }

  async assertIssueDateExample(issueDateExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueFieldHint.innerText()).to.equal(issueDateExample);
  }

  async assertValidDateFieldTitle(validDateFieldTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToFieldTitleLegend.innerText()).to.equal(
      validDateFieldTitle
    );
  }

  async assertValidDateExample(validDateExample) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToFieldHint.innerText()).to.equal(validDateExample);
  }

  async assertLicenceTitle(validlicenceNumberLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberLabel.innerText()).to.equal(
      validlicenceNumberLabel
    );
  }

  async assertLicenceExample(validlicenceNumberHint) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.licenceNumberHint.innerText()).to.equal(
      validlicenceNumberHint
    );
  }

  async assertIssueNumberTitle(issueNumberLabel) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueNumberLabel.innerText()).to.equal(issueNumberLabel);
  }

  async assertIssueSentenceExample(issueNumberSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueNumberHint.innerText()).to.equal(
      issueNumberSentence
    );
  }

  async assertPostcodeTitle(postcodeTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.postcodeLabel.innerText()).to.equal(postcodeTitle);
  }

  async assertPostcodeSentence(postcodeSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.postcodeHint.innerText()).to.equal(postcodeSentence);
  }

  async assertIssueDay(issueDay) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueDayLabel.innerText()).to.contains(issueDay);
  }

  async assertIssueMonth(issueMonth) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueMonthLabel.innerText()).to.contains(issueMonth);
  }

  async assertIssueYear(issueYear) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.issueYearLabel.innerText()).to.contains(issueYear);
  }

  async assertValidToDay(validToDay) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validTodayLabel.innerText()).to.contains(validToDay);
  }

  async assertValidToMonth(validToMonth) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToMonthLabel.innerText()).to.contains(validToMonth);
  }

  async assertValidToYear(validToYear) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.validToYearLabel.innerText()).to.contains(validToYear);
  }

  async assertDVLAConsent(consentTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionTitle.innerText()).to.equal(consentTitle);
  }

  async assertDVLAConsentSentenceOne(consentFirstSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceOne.innerText()).to.contains(
      consentFirstSentence
    );
  }

  async assertDVLAConsentSentenceTwo(consentSecondSentence) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.consentSectionSentenceTwo.innerText()).to.contains(
      consentSecondSentence
    );
  }

  async assertConsentOneLoginLink(consentOneLoginLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.oneLoginLink.innerText()).to.equal(consentOneLoginLink);
  }

  async assertConsentPrivacyLink(consentPrivacyLink) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.privacyPolicyDVLALink.innerText()).to.equal(
      consentPrivacyLink
    );
  }

  async assertRetryTitle(checkDetailsTitle) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.retryCheckDetailsTitleLabel.innerText()).to.contains(
      checkDetailsTitle
    );
  }

  async assertErrorPrefix(errorPrefix) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.errorText.innerText()).to.equal(errorPrefix);
  }

  async assertYouWillBeAbleToFindSentence(errorSummaryMessage) {
    await this.page.waitForLoadState("domcontentloaded");
    expect(await this.isCurrentPage()).to.be.true;
    expect(await this.thereWasAProblemFirstSentence.innerText()).to.contains(
      errorSummaryMessage
    );
  }
};
