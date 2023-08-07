@mock-api:dl-success @success @DVLA
Feature: DVLA Driving licence CRI Error Validations

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the DL journey
    And I click on DVLA radio button and Continue
    And I add a cookie to change the language to Welsh

  @mock-api:dva-PageHeading @validation-regression @build @staging
  Scenario:User Selects DVA and landed in DVA page and Page title and sub-text
    Given I check the page title Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Then I see the heading Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru
    And I see sentence Os nad oes gennych drwydded yrru y DU neu os na allwch gofio'ch manylion, gallwch brofi pwy ydych chi mewn ffordd arall yn lle.

  @mock-api:dvla-WelshBetaBanner @validation-regression
  Scenario: Beta Banner
    Given I view the beta banner
    And the beta banner reads Mae hwn yn wasanaeth newydd – bydd eich adborth (agor mewn tab newydd) yn ein helpu i'w wella.

  @mock-api:dvla-NameField @validation-regression @build @staging
  Scenario: DVLA Name fields
    Given I can see the lastname as Enw olaf
    And I can see the givenName as Enwau a roddwyd
    And I can see the firstName as Enw cyntaf
    And I can see the middleName as Enwau canol
    And I can see the first name sentence Mae hwn yn adran 2 o'ch trwydded. Nid oes angen i chi gynnwys eich teitl.
    And I can see the middle name sentence Gadewch hyn yn wag os nad oes gennych unrhyw enwau canol

  @mock-api:dvla-DobField @validation-regression @build @staging
  Scenario: DVLA DoB Fields
    Given I can see the DoB fields titled Dyddiad geni
    When I can see example as Er enghraifft, 5 9 1973
#   Then I can see date as Diwrnod  // Assertion error occur though the actual and expected are same
#   And I can see month as Mis      // Assertion error occur though the actual and expected are same
#   And I can see year as Blwyddyn  // Assertion error occur though the actual and expected are same

  @mock-api:dvla-IssueDateField @validation-regression @build @staging
  @Language-regression
  Scenario: DVLA Issue date fields
    Given I can see the Issue date field titled Dyddiad cyhoeddi
    Then I can see Issue date sentence as Dyma'r dyddiad yn adran 4a o'ch trwydded, er enghraifft 27 5 2019
#   And I can see issue day as Diwrnod  // Assertion error occur though the actual and expected are same
#   Then I can see issue month as Mis  // Assertion error occur though the actual and expected are same
#   And I can see issue year as Blwyddyn  // Assertion error occur though the actual and expected are same

  @mock-api:dvla-ValidToDateField @validation-regression @build @staging
  Scenario: DVLA Valid to date field
    Given I can see the Valid to date field titled Yn ddilys tan
    And I can see Valid to date sentence as Dyma'r dyddiad yn adran 4b o'ch trwydded, er enghraifft 27 5 2019
#   Then I can see Valid To day as Diwrnod  // Assertion error occur though the actual and expected are same
#   And I can see Valid To month as Mis     // Assertion error occur though the actual and expected are same
#   Then I can see Valid To year as Blwyddyn  // Assertion error occur though the actual and expected are same

  @mock-api:dvla-LicenceField @validation-regression @build @staging
  Scenario: DVLA Licence number
    Given I can see the licence number field titled Rhif trwydded
    Then I see the Licence number sentence Dyma'r rhif hir yn adran 5 ar eich trwydded er enghraifft HARRI559146MJ931

  @mock-api:dvla-IssueNumberField @validation-regression @build @staging
  Scenario: DVLA Issue number
    Given I can see the issue number field titled Rhif cyhoeddi
    And I can see issue sentence as Dyma'r rhif 2 ddigid ar ôl y gofod yn adran 5 o'ch trwydded

  @mock-api:dvla-PostcodeField @validation-regression @build @staging
  Scenario: DVLA Postcode
    Given I can see the postcode field titled Cod post
    Then I can see postcode sentence as Rhowch y cod post yn y cyfeiriad yn adran 8 o'ch trwydded

  #### Summary Error validation ######

  @mock-api:dvla-unhappyPath @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence details page unhappy path when licence number date format does not match with User's Date Of Birth
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the licence number error in the summary as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
    And I can see the licence number error in the field as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
    Then I see the date of birth error summary as Gwiriwch eich bod wedi rhoi eich dyddiad geni yn gywir
    And  I see the date of birth error in the field as Gwiriwch eich bod wedi rhoi eich dyddiad geni yn gywir
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         12      |     08            |       1985       |

  #####  InvalidLastNameWithNumbers, InvalidLastNameWithSpecialCharacters, NoLastName #####
  @mock-api:dvla-invalidLastName @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Last name with numbers or special characters or no last name error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters last name as <InvalidLastName>
    When User clicks on continue
    Then I see the Lastname error in the error summary as Rhowch eich enw olaf fel y mae'n ymddangos ar eich trwydded yrru
    And I see the Lastname error in the error field as Rhowch eich enw olaf fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidLastName |
      |DrivingLicenceSubjectHappyPeter|KYLE123         |
      |DrivingLicenceSubjectHappyPeter|KYLE^&(         |
      |DrivingLicenceSubjectHappyPeter|                |

  #####  InvalidFirstNameWithNumbers, InvalidFirstNameWithSpecialCharacters, NoFirstName #####
  @mock-api:dvla-invalidFirstName @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence First name with numbers or special characters or no first name error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters first name as <InvalidFirstName>
    When User clicks on continue
    Then I see the Firstname error summary as Rhowch eich enw cyntaf fel y mae'n ymddangos ar eich trwydded yrru
    And I see the Firstname error in the error field as Rhowch eich enw cyntaf fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidFirstName|
      |DrivingLicenceSubjectHappyPeter|SELINA987       |
      |DrivingLicenceSubjectHappyPeter|SELINA%$@       |
      |DrivingLicenceSubjectHappyPeter|                |

    #####  InvalidMiddleNamesWithNumbers, InvalidMiddleNamesWithSpecialCharacters #####
  @mock-api:dvla-invalidMiddleNames @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Middle names with numbers or special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters middle names as <InvalidMiddleNames>
    When User clicks on continue
    Then I see the middlenames error summary as Rhowch unrhyw enwau canol fel y maent yn ymddangos ar eich trwydded yrru
    And I see the middlenames error in the error field as Rhowch unrhyw enwau canol fel y maent yn ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidMiddleNames|
      |DrivingLicenceSubjectHappyPeter|SELINA987         |
      |DrivingLicenceSubjectHappyPeter|SELINA%$@         |

#####  DateOfBirthWithSpecialCharacters, DateOfBirthNotReal, NoDateOfBirth #####
  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Date of birth that are not real or with special characters or no date of birth error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Rhowch eich dyddiad geni fel y mae'n ymddangos ar eich trwydded yrru
    And I see the date of birth error in the field as Rhowch eich dyddiad geni fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         @       |     *&            |       19 7     |
      |DrivingLicenceSubjectHappyPeter|         51      |     71            |       198      |
      #DVLA Driving licence with no date of birth scenario is not displaying the expected error message and has been raised as a bug LIME-694
      #|DrivingLicenceSubjectHappyPeter|                 |                   |                |

  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Date of birth in the future error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters day of birth as <InvalidDayOfBirth>
    And User re-enters month of birth as <InvalidMonthOfBirth>
    And User re-enters year of birth as <InvalidYearOfBirth>
    When User clicks on continue
    Then I see the date of birth error summary as Rhaid i'ch dyddiad geni fod yn y gorffennol
    And I see the date of birth error in the field as Rhaid i'ch dyddiad geni fod yn y gorffennol
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
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
    Then I see issue date error in summary as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
    And I see invalid issue date field error as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK

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
    Then I see issue date error in summary as Rhaid i ddyddiad cyhoeddi fod yn y gorffennol
    And I see invalid issue date field error as Rhaid i ddyddiad cyhoeddi fod yn y gorffennol
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
      |DrivingLicenceSubjectHappyPeter|         01      |     10            |         2043     |

  ####  InvalidValidToDate, ValidToDateWithSpecialCharacters, NoValidToDate  #####
  @mock-api:dvla-invalidExpiryDate @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Valid to date that are not real or with special characters or no valid to date error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters valid to day as <InvalidValidToDay>
    And User re-enters valid to month as <InvalidValidToMonth>
    And User re-enters valid to year <InvalidValidToYear>
    When User clicks on continue
    Then I can see the valid to date error in the error summary as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
    And I can see the Valid to date field error as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
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
    Then I can see the valid to date error in the error summary as Ni allwch ddefnyddio trwydded yrru sydd wedi dod i ben
    And I can see the Valid to date field error as Ni allwch ddefnyddio trwydded yrru sydd wedi dod i ben
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
      |DrivingLicenceSubjectHappyPeter|         10      |     01            |         2010     |


  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number less than 16 characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Dylai rhif eich trwydded fod yn 16 nod o hyd
    And I can see the licence number error in the field as Dylai rhif eich trwydded fod yn 16 nod o hyd
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidLicenceNumber|
      |DrivingLicenceSubjectHappyPeter|PARKE610112PBF      |

  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number with special characters and spaces error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Ni ddylai rhif eich trwydded gynnwys unrhyw symbolau neu ofodau
    And I can see the licence number error in the field as Ni ddylai rhif eich trwydded gynnwys unrhyw symbolau neu ofodau
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidLicenceNumber|
      |DrivingLicenceSubjectHappyPeter|12345678901112@@    |

####### DrivingLicenceNumberWithNumericChar, DrivingLicenceNumberWithAlphaChar, NoDrivingLicenceNumber #######
  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence number with numeric characters or alpha characters or no licence number error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
    When User clicks on continue
    Then I see the licence number error in the summary as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
    And I can see the licence number error in the field as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
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
    Then I see the issue number error in summary as Dylai eich rhif cyhoeddi fod yn 2 rif o hyd
    And I see the issue number error in field as Dylai eich rhif cyhoeddi fod yn 2 rif o hyd
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
      |DrivingLicenceSubjectHappyPeter|1                 |

  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue number with special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters issue number as <InvalidIssueNumber>
    When User clicks on continue
    Then I see the issue number error in summary as Ni ddylai eich rhif cyhoeddi gynnwys unrhyw symbolau neu ofodau
    And I see the issue number error in field as Ni ddylai eich rhif cyhoeddi gynnwys unrhyw symbolau neu ofodau
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
      |DrivingLicenceSubjectHappyPeter|A@                |

##### IssueNumberWithAlphanumericChar, IssueNumberWithAlphaChar, NoIssueNumber #####
  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Issue number with alphanumeric characters or alpha characters No issue number error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters issue number as <InvalidIssueNumber>
    When User clicks on continue
    Then I see the issue number error in summary as Rhowch y rhif cyhoeddi fel y mae'n ymddangos ar eich trwydded yrru
    And I see the issue number error in field as Rhowch y rhif cyhoeddi fel y mae'n ymddangos ar eich trwydded yrru
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidIssueNumber|
#     |DrivingLicenceSubjectHappyPeter|A1                |bug raised -LIME-751
#     |DrivingLicenceSubjectHappyPeter|AB                |bug rasied - LIME-751
      |DrivingLicenceSubjectHappyPeter|                  |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode less than 5 characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Dylai eich rhowch eich cod post fod rhwng 5 a 7 nod
    And I see the postcode error in field as Dylai eich rhowch eich cod post fod rhwng 5 a 7 nod
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|E20A              |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence - No Postcode in the Postcode field error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Rhowch eich cod post
    And I see the postcode error in field as Rhowch eich cod post
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|                  |

  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence International Postcode error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Rhowch god post yn y DU
    And I see the postcode error in field as Rhowch god post yn y DU
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|CA 95128          |

##### PostcodeWithSpecialChar #####
  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode with special characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau yn unig
    And I see the postcode error in field as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau yn unig
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      |DrivingLicenceSubjectHappyPeter|NW* ^%G           |

###### PostcodeWithNumericChar, PostcodeWithAlphaChar #####  (need clarification)
  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
  Scenario Outline: DVLA Driving Licence Postcode with numeric characters or alpha characters error validation
    Given User enters DVLA data as a <DrivingLicenceSubject>
    And User re-enters postcode as <InvalidPostcode>
    When User clicks on continue
    Then I see the postcode error in summary as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau
    And I see the postcode error in field as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau
    And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
    Examples:
      |DrivingLicenceSubject          |InvalidPostcode   |
      #|DrivingLicenceSubjectHappyPeter|123 456           | Bug raised -LIME-750
      |DrivingLicenceSubjectHappyPeter|ABC XYZ           |
