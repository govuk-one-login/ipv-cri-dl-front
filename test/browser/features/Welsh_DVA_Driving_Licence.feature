@mock-api:dl-success @success @DVA
Feature: DVA Driving licence CRI Error Validations

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the DL journey
    And I click on DVA radio button and Continue
    And I add a cookie to change the language to Welsh
    #And I should be on the DVA details entry page Enter your details exactly as they appear on your UK driving licence – Prove your identity – GOV.UK

#  @mock-api:dvla-WelshBetaBanner @validation-regression
#    Scenario: Beta Banner
#    Given I view the Beta banner
#    And the beta banner reads Mae hwn yn wasanaeth newydd – bydd eich adborth (agor mewn tab newydd) yn ein helpu i'w wella.


#  @Language-regression
#  Scenario:User Selects DVA and landed in DVA page and Page title and sub-text
#    Given I click on DVA radio button and Parhau
#    Then I check the page title is Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Then I see the heading Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru
#    And I see sentence Os nad oes gennych drwydded yrru y DU neu os na allwch gofio'ch manylion, gallwch brofi pwy ydych chi mewn ffordd arall yn lle.

#  @Language-regression
#  Scenario: DVA Name fields
#    Given I click on DVA radio button and Parhau
#    When I can see the lastname as Enw olaf
#    And I can see the givenName as Enwau a roddwyd
#    And I can see the firstName as Enw cyntaf
#    And I can see the middleName as Enwau canol
#    And I can see the first name sentence Mae hwn yn adran 2 o'ch trwydded. Nid oes angen i chi gynnwys eich teitl.
#    And I can see the sentence Gadewch hyn yn wag os nad oes gennych unrhyw enwau canol
#

#  @Language-regression
#  Scenario: DVA DoB Field
#    Given I click on DVA radio button and Parhau
#    When I can see the DoB fields for DVA titled Dyddiad geni
#    Then I can see example  for DVA as Er enghraifft, 5 9 1973
#    Then I can see date for DVA as Diwrnod
#    And I can see month for DVA as Mis
#    And I can see year for DVA as Blwyddyn
#    And The test is complete and I close the driver
#
#  @Language-regression
#  Scenario: DVA Issue date field
#    Given I click on DVA radio button and Parhau
#    When I see the Issue date field titled Dyddiad cyhoeddi for DVA
#    Then I see date section example as Dyma'r dyddiad yn adran 4a o'ch trwydded, er enghraifft 27 5 2019
#    Then I can see date for DVA as Diwrnod
#    And I can see month for DVA as Mis
#    And I can see year for DVA as Blwyddyn
#    And The test is complete and I close the driver
#
#  @Language-regression
#  Scenario: DVA Valid until field
#    Given I click on DVA radio button and Parhau
#    When I can see the Valid to date field titled Yn ddilys tan
#    And I see valid until example for DVA as Dyma'r dyddiad yn adran 4b o'ch trwydded, er enghraifft 27 5 2019
#    Then I can see date for DVA as Diwrnod
#    And I can see month for DVA as Mis
#    And I can see year for DVA as Blwyddyn
#    And The test is complete and I close the driver
#
#  @Language-regression
#  Scenario: DVA Licence number
#    Given I click on DVA radio button and Parhau
#    When I can see the licence number field for DVA titled Rhif trwydded
#    And I see the DVA licence sentence Dyma'r rhif hir yn adran 5 ar eich trwydded
#    And The test is complete and I close the driver
#
#  @Language-regression
#  Scenario: DVA Postcode
#    Given I click on DVA radio button and Parhau
#    Then I can see the postcode field titled Cod post
#    Then I can see postcode sentence as Rhowch y cod post yn y cyfeiriad yn adran 8 o'ch trwydded
#
#    ##### Summary Error Validation ######
#
#  @mock-api:dva-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence number less than 8 characters error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the DVA licence number error in the summary as Dylai rhif eich trwydded fod yn 8 nod o hyd
#    And I can see the DVA licence number error in the field as Dylai rhif eich trwydded fod yn 8 nod o hyd
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidLicenceNumber|
#      |DrivingLicenceSubjectHappyBilly|5566778             |
#
#  @mock-api:dva-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence number with special characters and spaces error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the DVA licence number error in the summary as Ni ddylai rhif eich trwydded gynnwys unrhyw symbolau neu ofodau
#    And I can see the DVA licence number error in the field as Ni ddylai rhif eich trwydded gynnwys unrhyw symbolau neu ofodau
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidLicenceNumber|
#      |DrivingLicenceSubjectHappyBilly|55667^&*            |
#
###### DrivingLicenceNumberWithAlphaNumericChar, DrivingLicenceNumberWithAlphaChar, NoDrivingLicenceNumber #####
#  @mock-api:dva-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence number with alpha numeric characters or alpha characters or no licence number error validation
#    Given DVA User re-enters drivingLicenceNumber as <DVADrivingLicenceSubject>
#    And DVA User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the DVA licence number error in the summary as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
#    And I can see the DVA licence number error in the field as Rhowch y rhif yn union fel mae’n ymddangos ar eich trwydded yrru
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidLicenceNumber|
##      |DrivingLicenceSubjectHappyBilly|55667ABC            | - bug raised
##      |DrivingLicenceSubjectHappyBilly|XYZabdAB            | - bug raised
#       |DrivingLicenceSubjectHappyBilly |                   |
#
#  @mock-api:dva-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Postcode less than 5 characters error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Dylai eich rhowch eich cod post fod rhwng 5 a 7 nod
#    And I see the postcode error in field as Dylai eich rhowch eich cod post fod rhwng 5 a 7 nod
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyBilly|E20A              |
#
#  @mock-api:dva-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence - No Postcode in the Postcode field error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Rhowch eich cod post
#    And I see the postcode error in field as Rhowch eich cod post
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyBilly|                  |
#
#  @mock-api:dva-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence International Postcode error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Rhowch god post yn y DU
#    And I see the postcode error in field as Rhowch god post yn y DU
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyBilly|CA 95128          |
#
####### PostcodeWithSpecialChar #####
#  @mock-api:dva-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Postcode with special characters error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau yn unig
#    And I see the postcode error in field as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau yn unig
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyBilly|NW* ^%G           |
#
######## PostcodeWithNumericChar, PostcodeWithAlphaChar #####
#  @mock-api:dva-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Postcode with numeric characters or alpha characters error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau
#    And I see the postcode error in field as Dylai eich rhowch eich cod post ond cynnwys rhifau a llythrennau
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidPostcode   |
#     # |DrivingLicenceSubjectHappyBilly|123 456          |  Bug raised -LIME-750
#      |DrivingLicenceSubjectHappyBilly|ABC XYZ           |
#
#######  InvalidLastNameWithNumbers, InvalidLastNameWithSpecialCharacters, NoLastName #####
#  @mock-api:dva-invalidLastName @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Last name with numbers or special characters or no last name error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters last name as <InvalidLastName>
#    When User clicks on continue
#    Then I see the Lastname error in the error summary as Rhowch eich enw olaf fel y mae'n ymddangos ar eich trwydded yrru
#    And I see the Lastname error in the error field as Rhowch eich enw olaf fel y mae'n ymddangos ar eich trwydded yrru
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidLastName |
#      |DrivingLicenceSubjectHappyBilly|KYLE123         |
#      |DrivingLicenceSubjectHappyBilly|KYLE^&(         |
#      |DrivingLicenceSubjectHappyBilly|                |
#
#######  InvalidFirstNameWithNumbers, InvalidFirstNameWithSpecialCharacters, NoFirstName #####
#  @mock-api:dva-invalidFirstName @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence First name with numbers or special characters or no first name error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters first name as <InvalidFirstName>
#    When User clicks on continue
#    Then I see the Firstname error summary as Rhowch eich enw cyntaf fel y mae'n ymddangos ar eich trwydded yrru
#    And I see the Firstname error in the error field as Rhowch eich enw cyntaf fel y mae'n ymddangos ar eich trwydded yrru
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidFirstName|
#      |DrivingLicenceSubjectHappyBilly|SELINA987       |
#      |DrivingLicenceSubjectHappyBilly|SELINA%$@       |
#      |DrivingLicenceSubjectHappyBilly|                |
#
########  InvalidMiddleNamesWithNumbers, InvalidMiddleNamesWithSpecialCharacters #####
#  @mock-api:dva-invalidMiddleNames @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Middle names with numbers or special characters error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters middle names as <InvalidMiddleNames>
#    When User clicks on continue
#    Then I see the middlenames error summary as Rhowch unrhyw enwau canol fel y maent yn ymddangos ar eich trwydded yrru
#    And I see the middlenames error in the error field as Rhowch unrhyw enwau canol fel y maent yn ymddangos ar eich trwydded yrru
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject          |InvalidMiddleNames|
#      |DrivingLicenceSubjectHappyBilly|SELINA987       |
#      |DrivingLicenceSubjectHappyBilly|SELINA%$@       |
#
######  DateOfBirthNotReal, DateOfBirthWithSpecialCharacters, NoDateOfBirth ##### Need confirmation with summary
#  @mock-api:dva-invalidDateOfBirth @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Date of birth that are not real or with special characters or no date of birth error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA user re-enters day of birth as <InvalidDayOfBirth>
#    And DVA user re-enters month of birth as <InvalidMonthOfBirth>
#    And DVA user re-enters year of birth as <InvalidYearOfBirth>
#    When User clicks on continue
#    Then DVA user can see the date of birth error summary as Rhowch eich dyddiad geni fel y mae'n ymddangos ar eich trwydded yrru
#    And DVA user can see the date of birth error in the field as Rhowch eich dyddiad geni fel y mae'n ymddangos ar eich trwydded yrru
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
#      |DrivingLicenceSubjectHappyBilly|         51      |     71            |         198      |
#      |DrivingLicenceSubjectHappyBilly|         @       |     *&            |         19 7     |
#      |DrivingLicenceSubjectHappyBilly|                 |                   |                  |
#
#  @mock-api:dva-invalidDateOfBirth @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Date of birth in the future error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA user re-enters day of birth as <InvalidDayOfBirth>
#    And DVA user re-enters month of birth as <InvalidMonthOfBirth>
#    And DVA user re-enters year of birth as <InvalidYearOfBirth>
#    When User clicks on continue
#    Then DVA user can see the date of birth error summary as Rhaid i'ch dyddiad geni fod yn y gorffennol
#    And DVA user can see the date of birth error in the field as Rhaid i'ch dyddiad geni fod yn y gorffennol
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
#      |DrivingLicenceSubjectHappyBilly|         10      |     10            |         2042     |
#
######  IssueDateWithAlphaCharacters, IssueDateWithSpecialCharacters, NoIssueDate #####
#  @mock-api:dva-invalidIssueDate @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Issue date that are not real or with special characters or no issue date error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA user re-enters day of issue as <InvalidDayOfIssue>
#    And DVA user re-enters month of issue as <InvalidMonthOfIssue>
#    And DVA user re-enters year of issue as <InvalidYearOfIssue>
#    When User clicks on continue
#    Then I see DVA issue date error in summary as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
#    And I see DVA invalid issue date field error as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
# #   And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
#      |DrivingLicenceSubjectHappyBilly|         AA      |     BB            |         AABC     |
#      |DrivingLicenceSubjectHappyBilly|         &       |     ^%            |         £$ ^     |
#      |DrivingLicenceSubjectHappyBilly|                 |                   |                  |
#
#  @mock-api:dva-invalidIssueDate @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Issue date in the future error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And DVA user re-enters day of issue as <InvalidDayOfIssue>
#    And DVA user re-enters month of issue as <InvalidMonthOfIssue>
#    And DVA user re-enters year of issue as <InvalidYearOfIssue>
#    When User clicks on continue
#    Then I see DVA issue date error in summary as Rhaid i ddyddiad cyhoeddi fod yn y gorffennol
#    And I see DVA issue date error in summary as Rhaid i ddyddiad cyhoeddi fod yn y gorffennol
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
#      |DrivingLicenceSubjectHappyBilly|         01      |     10            |         2043     |
#
######  InvalidValidToDate, ValidToDateWithSpecialCharacters, NoValidToDate  #####
#  @mock-api:dva-invalidExpiryDate @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Valid to date that are not real or with special characters or no valid to date error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters valid to day as <InvalidValidToDay>
#    And User re-enters valid to month as <InvalidValidToMonth>
#    And User re-enters valid to year <InvalidValidToYear>
#    When User clicks on continue
#    Then I can see the valid to date error in the error summary as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
#    And I can see the Valid to date field error as Rhowch y dyddiad fel y mae'n ymddangos ar eich trwydded yrru
#   # And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
#      |DrivingLicenceSubjectHappyBilly|         AA      |     BC            |         AABD     |
#      |DrivingLicenceSubjectHappyBilly|         !@      |     £$            |         %^ *     |
#      |DrivingLicenceSubjectHappyBilly|                 |                   |                  |
#
#  @mock-api:dva-invalidExpiryDate @validation-regression @build @staging
#  Scenario Outline: DVA Driving Licence Valid to date in the past error validation
#    Given User enters DVA data as a <DVADrivingLicenceSubject>
#    And User re-enters valid to day as <InvalidValidToDay>
#    And User re-enters valid to month as <InvalidValidToMonth>
#    And User re-enters valid to year <InvalidValidToYear>
#    When User clicks on continue
#    Then I can see the valid to date error in the error summary as Ni allwch ddefnyddio trwydded yrru sydd wedi dod i ben
#    And I can see the Valid to date field error as Ni allwch ddefnyddio trwydded yrru sydd wedi dod i ben
#  #  And I check the page Title Gwall: Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    Examples:
#      |DVADrivingLicenceSubject       |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
#      |DrivingLicenceSubjectHappyBilly|         10      |     01            |         2010     |
