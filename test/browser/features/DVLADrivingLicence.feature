@mock-api:dl-success @success @DVLA
Feature: DVLA Driving licence CRI Error Validations

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the DL journey
    And I click on DVLA radio button and Continue
    And I should be on the DVLA details entry page Enter your details exactly as they appear on your UK driving licence – Prove your identity – GOV.UK

  @mock-api:dvla-unhappyPath @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence details page unhappy path when licence number date format does not match with User's Date Of Birth
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the licence number error in the summary as Enter the number exactly as it appears on your driving licence
    And I can see the licence number error in the field as Enter the number exactly as it appears on your driving licence
    Then I see the date of birth error summary as Check you have entered your date of birth correctly
    And  I see the date of birth error in the field as Check you have entered your date of birth correctly
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         12      |     08            |       1985       |

  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number less than 16 characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Your licence number should be 16 characters long
    And I can see the licence number error in the field as Your licence number should be 16 characters long
    Examples:
      |DrivingLicenceSubject          |InvalidLicenceNumber|
      |DrivingLicenceSubjectHappyPeter|PARKE610112PBF      |

  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number with special characters and spaces error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Your licence number should not include any symbols or spaces
    And I can see the licence number error in the field as Your licence number should not include any symbols or spaces
    Examples:
      |DrivingLicenceSubject          |InvalidLicenceNumber|
      |DrivingLicenceSubjectHappyPeter|12345678901112@@    |

####### DrivingLicenceNumberWithNumericChar, DrivingLicenceNumberWithAlphaChar, NoDrivingLicenceNumber #######
  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number with numeric characters or alpha characters or no licence number error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Enter the number exactly as it appears on your driving licence
    And I can see the licence number error in the field as Enter the number exactly as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidLicenceNumber|
      |DrivingLicenceSubjectHappyPeter|1234567890111213    |
      |DrivingLicenceSubjectHappyPeter|abcdefghijklomnp    |
      |DrivingLicenceSubjectHappyPeter|                    |

  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue number less than 2 characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters issue number as <InvalidIssueNumber>
    When User clicks on continue
    Then I see the issue number error in summary as Your issue number should be 2 numbers long
    And I see the issue number error in field as Your issue number should be 2 numbers long
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
      |DrivingLicenceSubjectHappyPeter|1                 |

  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue number with special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters issue number as <InvalidIssueNumber>
    When User clicks on continue
    Then I see the issue number error in summary as Your issue number should not include any symbols or spaces
    And I see the issue number error in field as Your issue number should not include any symbols or spaces
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
      |DrivingLicenceSubjectHappyPeter|A@                |

##### IssueNumberWithAlphanumericChar, IssueNumberWithAlphaChar, NoIssueNumber #####
  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue number with alphanumeric characters or alpha characters No issue number error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters issue number as <InvalidIssueNumber>
    When User clicks on continue
    Then I see the issue number error in summary as Enter the issue number as it appears on your driving licence
    And I see the issue number error in field as Enter the issue number as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
      |DrivingLicenceSubjectHappyPeter|A1                |
      |DrivingLicenceSubjectHappyPeter|AB                |
      |DrivingLicenceSubjectHappyPeter|                  |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode less than 5 characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Your postcode should be between 5 and 7 characters
    And I see the postcode error in field as Your postcode should be between 5 and 7 characters
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|E20A              |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence - No Postcode in the Postcode field error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Enter your postcode
    And I see the postcode error in field as Enter your postcode
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|                  |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence International Postcode error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Enter a UK postcode
    And I see the postcode error in field as Enter a UK postcode
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|CA 95128          |

##### PostcodeWithSpecialChar #####
  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode with special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Your postcode should only include numbers and letters
    And I see the postcode error in field as Your postcode should only include numbers and letters
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|NW* ^%G           |

###### PostcodeWithNumericChar, PostcodeWithAlphaChar #####
  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode with numeric characters or alpha characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Your postcode should include numbers and letters
    And I see the postcode error in field as Your postcode should include numbers and letters
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|123 456           |
      |DrivingLicenceSubjectHappyPeter|ABC XYZ           |

######  InvalidLastNameWithNumbers, InvalidLastNameWithSpecialCharacters, NoLastName #####
  @mock-api:dvla-invalidLastName @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Last name with numbers or special characters or no last name error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Enter your last name as it appears on your driving licence
    And I see the Lastname error in the error field as Enter your last name as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidLastName |
      |DrivingLicenceSubjectHappyPeter|KYLE123         |
      |DrivingLicenceSubjectHappyPeter|KYLE^&(         |
      |DrivingLicenceSubjectHappyPeter|                |

######  InvalidFirstNameWithNumbers, InvalidFirstNameWithSpecialCharacters, NoFirstName #####
  @mock-api:dvla-invalidFirstName @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence First name with numbers or special characters or no first name error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the Firstname error summary as Enter your first name as it appears on your driving licence
    And I see the Firstname error in the error field as Enter your first name as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidFirstName|
      |DrivingLicenceSubjectHappyPeter|SELINA987       |
      |DrivingLicenceSubjectHappyPeter|SELINA%$@       |
      |DrivingLicenceSubjectHappyPeter|                |

    ######  InvalidMiddleNamesWithNumbers, InvalidMiddleNamesWithSpecialCharacters #####
  @mock-api:dvla-invalidMiddleNames @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Middle names with numbers or special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters middle names as <InvalidMiddleNames>
    When User clicks on continue
    Then I see the middlenames error summary as Enter any middle names as they appear on your driving licence
    And I see the middlenames error in the error field as Enter any middle names as they appear on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidMiddleNames|
      |DrivingLicenceSubjectHappyPeter|SELINA987       |
      |DrivingLicenceSubjectHappyPeter|SELINA%$@       |

#####  DateOfBirthWithSpecialCharacters, DateOfBirthNotReal, NoDateOfBirth #####
  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Date of birth that are not real or with special characters or no date of birth error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Enter your date of birth as it appears on your driving licence
    And I see the date of birth error in the field as Enter your date of birth as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         @       |     *&            |       19 7     |
      |DrivingLicenceSubjectHappyPeter|         51      |     71            |       198      |
#      DVLA Driving licence with no date of birth scenario is not displaying the expected error message and has been raised as a bug LIME-694
#      |DrivingLicenceSubjectHappyPeter|                 |                   |                |

  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Date of birth in the future error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Your date of birth must be in the past
    And I see the date of birth error in the field as Your date of birth must be in the past
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         10      |     10            |         2042     |

#####  InvalidIssueDate, NoIssueDate #####
  @mock-api:dvla-invalidIssueDate @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue date that are not real or with special characters or no issue date error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of issue as <InvalidDayOfIssue>
    And User re-enters month of issue as <InvalidMonthOfIssue>
    And User re-enters year of issue as <InvalidYearOfIssue>
    When User clicks on continue
    Then I see issue date error in summary as Enter the date as it appears on your driving licence
    And I see invalid issue date field error as Enter the date as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
      |DrivingLicenceSubjectHappyPeter|         AA      |     BB            |         AABC     |
      |DrivingLicenceSubjectHappyPeter|         &       |     ^%            |         £$ ^     |
      |DrivingLicenceSubjectHappyPeter|                 |                   |                  |

  @mock-api:dvla-invalidIssueDate @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue date in the future error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of issue as <InvalidDayOfIssue>
    And User re-enters month of issue as <InvalidMonthOfIssue>
    And User re-enters year of issue as <InvalidYearOfIssue>
    When User clicks on continue
    Then I see issue date error in summary as The issue date must be in the past
    And I see invalid issue date field error as The issue date must be in the past
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
      |DrivingLicenceSubjectHappyPeter|         01      |     10            |         2043     |

#####  InvalidValidToDate, ValidToDateWithSpecialCharacters, NoValidToDate  #####
  @mock-api:dvla-invalidExpiryDate @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Valid to date that are not real or with special characters or no valid to date error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters valid to day as <InvalidValidToDay>
    And User re-enters valid to month as <InvalidValidToMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Enter the date as it appears on your driving licence
    And I can see the Valid to date field error as Enter the date as it appears on your driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
      |DrivingLicenceSubjectHappyPeter|         AA      |     BC            |         AABD     |
      |DrivingLicenceSubjectHappyPeter|         !@      |     £$            |         %^ *     |
      |DrivingLicenceSubjectHappyPeter|                 |                   |                  |

  @mock-api:dvla-invalidExpiryDate @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Valid to date in the past error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters valid to day as <InvalidValidToDay>
    And User re-enters valid to month as <InvalidValidToMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as You cannot use an expired driving licence
    And I can see the Valid to date field error as You cannot use an expired driving licence
    Examples:
      |DrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
      |DrivingLicenceSubjectHappyPeter|         10      |     01            |         2010     |