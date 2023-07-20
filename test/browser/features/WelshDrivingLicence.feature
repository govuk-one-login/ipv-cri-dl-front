@mock-api:dl-success @success @DVLA
Feature: DVLA Driving licence CRI Error Validations

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    And they have started the DL journey
    And I click on DVLA radio button and Continue
    And I add a cookie to change the language to Welsh

#  @mock-api:dvlaWelsh @validation-regression
#  Scenario: Beta Banner
#    Given I view the Beta banner
#    When the beta banner reads Mae hwn yn wasanaeth newydd – bydd eich adborth (agor mewn tab newydd) yn ein helpu i'w wella.

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
    Examples:
      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
      |DrivingLicenceSubjectHappyPeter|         12      |     08            |       1985       |

  @Language-regression
#  Scenario: DVLA Name fields
#    Given I click on DVLA radio button and Parhau
#    When I can see the lastname as Enw olaf
#    And I can see the givenName as Enwau a roddwyd
#    And I can see the firstName as Enw cyntaf
#    And I can see the middleName as Enwau canol
#    And I can see the first name sentence Mae hwn yn adran 2 o'ch trwydded. Nid oes angen i chi gynnwys eich teitl.
#    And I can see the sentence Gadewch hyn yn wag os nad oes gennych unrhyw enwau canol
#
#  @Language-regression
#  Scenario: DVLA DoB Fields
#    Given I click on DVLA radio button and Parhau
#    When I can see the DoB fields titled Dyddiad geni
#    When I can see example as Er enghraifft, 5 9 1973
#    Then I can see date as Diwrnod
#    And I can see month as Mis
#    And I can see year as Blwyddyn
#
#
#  @Language-regression
#  Scenario: DVLA Issue date fields
#    Given I click on DVLA radio button and Parhau
#    When I can see the Issue date field titled Dyddiad cyhoeddi
#    Then I can see Issue date sentence as Dyma'r dyddiad yn adran 4a o'ch trwydded, er enghraifft 27 5 2019
#    And I can see date as Diwrnod
#    Then I can see month as Mis
#    And I can see year as Blwyddyn

#
#  @Language-regression
#  Scenario: DVLA Valid to date field
#    Given I click on DVLA radio button and Parhau
#    When I can see the Valid to date field titled Yn ddilys tan
#    And I can see Valid to date sentence as Dyma'r dyddiad yn adran 4b o'ch trwydded, er enghraifft 27 5 2019
#    Then I can see date as Diwrnod
#    And I can see month as Mis
#    Then I can see year as Blwyddyn

#English Translate to Welsh

#  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence number less than 16 characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the licence number error in the summary as Your licence number should be 16 characters long
#    And I can see the licence number error in the field as Your licence number should be 16 characters long
#    Examples:
#      |DrivingLicenceSubject          |InvalidLicenceNumber|
#      |DrivingLicenceSubjectHappyPeter|PARKE610112PBF      |
#
#  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence number with special characters and spaces error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the licence number error in the summary as Your licence number should not include any symbols or spaces
#    And I can see the licence number error in the field as Your licence number should not include any symbols or spaces
#    Examples:
#      |DrivingLicenceSubject          |InvalidLicenceNumber|
#      |DrivingLicenceSubjectHappyPeter|12345678901112@@    |
#
######## DrivingLicenceNumberWithNumericChar, DrivingLicenceNumberWithAlphaChar, NoDrivingLicenceNumber #######
#  @mock-api:dvla-invalidDrivingLicenceNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence number with numeric characters or alpha characters or no licence number error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters drivingLicenceNumber as <InvalidLicenceNumber>
#    When User clicks on continue
#    Then I see the licence number error in the summary as Enter the number exactly as it appears on your driving licence
#    And I can see the licence number error in the field as Enter the number exactly as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidLicenceNumber|
#      |DrivingLicenceSubjectHappyPeter|1234567890111213    |
#      |DrivingLicenceSubjectHappyPeter|abcdefghijklomnp    |
#      |DrivingLicenceSubjectHappyPeter|                    |
#
#  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Issue number less than 2 characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters issue number as <InvalidIssueNumber>
#    When User clicks on continue
#    Then I see the issue number error in summary as Your issue number should be 2 numbers long
#    And I see the issue number error in field as Your issue number should be 2 numbers long
#    Examples:
#      |DrivingLicenceSubject          |InvalidIssueNumber|
#      |DrivingLicenceSubjectHappyPeter|1                 |
#
#  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Issue number with special characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters issue number as <InvalidIssueNumber>
#    When User clicks on continue
#    Then I see the issue number error in summary as Your issue number should not include any symbols or spaces
#    And I see the issue number error in field as Your issue number should not include any symbols or spaces
#    Examples:
#      |DrivingLicenceSubject          |InvalidIssueNumber|
#      |DrivingLicenceSubjectHappyPeter|A@                |
#
###### IssueNumberWithAlphanumericChar, IssueNumberWithAlphaChar, NoIssueNumber #####
#  @mock-api:dvla-invalidIssueNumber @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Issue number with alphanumeric characters or alpha characters No issue number error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters issue number as <InvalidIssueNumber>
#    When User clicks on continue
#    Then I see the issue number error in summary as Enter the issue number as it appears on your driving licence
#    And I see the issue number error in field as Enter the issue number as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidIssueNumber|
#      |DrivingLicenceSubjectHappyPeter|A1                |
#      |DrivingLicenceSubjectHappyPeter|AB                |
#      |DrivingLicenceSubjectHappyPeter|                  |
#
#  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Postcode less than 5 characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Your postcode should be between 5 and 7 characters
#    And I see the postcode error in field as Your postcode should be between 5 and 7 characters
#    Examples:
#      |DrivingLicenceSubject          |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyPeter|E20A              |
#
#  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence - No Postcode in the Postcode field error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Enter your postcode
#    And I see the postcode error in field as Enter your postcode
#    Examples:
#      |DrivingLicenceSubject          |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyPeter|                  |
#
#  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence International Postcode error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Enter a UK postcode
#    And I see the postcode error in field as Enter a UK postcode
#    Examples:
#      |DrivingLicenceSubject          |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyPeter|CA 95128          |
#
###### PostcodeWithSpecialChar #####
#  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Postcode with special characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Your postcode should only include numbers and letters
#    And I see the postcode error in field as Your postcode should only include numbers and letters
#    Examples:
#      |DrivingLicenceSubject          |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyPeter|NW* ^%G           |
#
####### PostcodeWithNumericChar, PostcodeWithAlphaChar #####
#  @mock-api:dvla-invalidPostcode @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Postcode with numeric characters or alpha characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters postcode as <InvalidPostcode>
#    When User clicks on continue
#    Then I see the postcode error in summary as Your postcode should include numbers and letters
#    And I see the postcode error in field as Your postcode should include numbers and letters
#    Examples:
#      |DrivingLicenceSubject          |InvalidPostcode   |
#      |DrivingLicenceSubjectHappyPeter|123 456           |
#      |DrivingLicenceSubjectHappyPeter|ABC XYZ           |
#
#######  InvalidLastNameWithNumbers, InvalidLastNameWithSpecialCharacters, NoLastName #####
#  @mock-api:dvla-invalidLastName @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Last name with numbers or special characters or no last name error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters last name as <InvalidLastName>
#    When User clicks on continue
#    Then I see the Lastname error in the error summary as Enter your last name as it appears on your driving licence
#    And I see the Lastname error in the error field as Enter your last name as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidLastName |
#      |DrivingLicenceSubjectHappyPeter|KYLE123         |
#      |DrivingLicenceSubjectHappyPeter|KYLE^&(         |
#      |DrivingLicenceSubjectHappyPeter|                |
#
#######  InvalidFirstNameWithNumbers, InvalidFirstNameWithSpecialCharacters, NoFirstName #####
#  @mock-api:dvla-invalidFirstName @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence First name with numbers or special characters or no first name error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters first name as <InvalidFirstName>
#    When User clicks on continue
#    Then I see the Firstname error summary as Enter your first name as it appears on your driving licence
#    And I see the Firstname error in the error field as Enter your first name as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidFirstName|
#      |DrivingLicenceSubjectHappyPeter|SELINA987       |
#      |DrivingLicenceSubjectHappyPeter|SELINA%$@       |
#      |DrivingLicenceSubjectHappyPeter|                |
#
#    ######  InvalidMiddleNamesWithNumbers, InvalidMiddleNamesWithSpecialCharacters #####
#  @mock-api:dvla-invalidMiddleNames @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Middle names with numbers or special characters error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters middle names as <InvalidMiddleNames>
#    When User clicks on continue
#    Then I see the middlenames error summary as Enter any middle names as they appear on your driving licence
#    And I see the middlenames error in the error field as Enter any middle names as they appear on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidMiddleNames|
#      |DrivingLicenceSubjectHappyPeter|SELINA987       |
#      |DrivingLicenceSubjectHappyPeter|SELINA%$@       |
#
######  DateOfBirthWithSpecialCharacters, DateOfBirthNotReal, NoDateOfBirth #####
#  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Date of birth that are not real or with special characters or no date of birth error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters day of birth as <InvalidDayOfBirth>
#    And User re-enters month of birth as <InvalidMonthOfBirth>
#    And User re-enters year of birth as <InvalidYearOfBirth>
#    When User clicks on continue
#    Then I see the date of birth error summary as Enter your date of birth as it appears on your driving licence
#    And I see the date of birth error in the field as Enter your date of birth as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
#      |DrivingLicenceSubjectHappyPeter|         @       |     *&            |       19 7     |
#      |DrivingLicenceSubjectHappyPeter|         51      |     71            |       198      |
##      DVLA Driving licence with no date of birth scenario is not displaying the expected error message and has been raised as a bug LIME-694
##      |DrivingLicenceSubjectHappyPeter|                 |                   |                |
#
#  @mock-api:dvla-invalidDateOfBirth @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Date of birth in the future error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters day of birth as <InvalidDayOfBirth>
#    And User re-enters month of birth as <InvalidMonthOfBirth>
#    And User re-enters year of birth as <InvalidYearOfBirth>
#    When User clicks on continue
#    Then I see the date of birth error summary as Your date of birth must be in the past
#    And I see the date of birth error in the field as Your date of birth must be in the past
#    Examples:
#      |DrivingLicenceSubject          |InvalidDayOfBirth|InvalidMonthOfBirth|InvalidYearOfBirth|
#      |DrivingLicenceSubjectHappyPeter|         10      |     10            |         2042     |
#
######  InvalidIssueDate, NoIssueDate #####
#  @mock-api:dvla-invalidIssueDate @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Issue date that are not real or with special characters or no issue date error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters day of issue as <InvalidDayOfIssue>
#    And User re-enters month of issue as <InvalidMonthOfIssue>
#    And User re-enters year of issue as <InvalidYearOfIssue>
#    When User clicks on continue
#    Then I see issue date error in summary as Enter the date as it appears on your driving licence
#    And I see invalid issue date field error as Enter the date as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
#      |DrivingLicenceSubjectHappyPeter|         AA      |     BB            |         AABC     |
#      |DrivingLicenceSubjectHappyPeter|         &       |     ^%            |         £$ ^     |
#      |DrivingLicenceSubjectHappyPeter|                 |                   |                  |
#
#  @mock-api:dvla-invalidIssueDate @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Issue date in the future error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters day of issue as <InvalidDayOfIssue>
#    And User re-enters month of issue as <InvalidMonthOfIssue>
#    And User re-enters year of issue as <InvalidYearOfIssue>
#    When User clicks on continue
#    Then I see issue date error in summary as The issue date must be in the past
#    And I see invalid issue date field error as The issue date must be in the past
#    Examples:
#      |DrivingLicenceSubject          |InvalidDayOfIssue|InvalidMonthOfIssue|InvalidYearOfIssue|
#      |DrivingLicenceSubjectHappyPeter|         01      |     10            |         2043     |
#
######  InvalidValidToDate, ValidToDateWithSpecialCharacters, NoValidToDate  #####
#  @mock-api:dvla-invalidExpiryDate @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Valid to date that are not real or with special characters or no valid to date error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters valid to day as <InvalidValidToDay>
#    And User re-enters valid to month as <InvalidValidToMonth>
#    And User re-enters valid to year <InvalidValidToYear>
#    When User clicks on continue
#    Then I can see the valid to date error in the error summary as Enter the date as it appears on your driving licence
#    And I can see the Valid to date field error as Enter the date as it appears on your driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
#      |DrivingLicenceSubjectHappyPeter|         AA      |     BC            |         AABD     |
#      |DrivingLicenceSubjectHappyPeter|         !@      |     £$            |         %^ *     |
#      |DrivingLicenceSubjectHappyPeter|                 |                   |                  |
#
#  @mock-api:dvla-invalidExpiryDate @validation-regression @build @staging
#  Scenario Outline: DVLA Driving Licence Valid to date in the past error validation
#    Given User enters DVLA data as a <DrivingLicenceSubject>
#    And User re-enters valid to day as <InvalidValidToDay>
#    And User re-enters valid to month as <InvalidValidToMonth>
#    And User re-enters valid to year <InvalidValidToYear>
#    When User clicks on continue
#    Then I can see the valid to date error in the error summary as You cannot use an expired driving licence
#    And I can see the Valid to date field error as You cannot use an expired driving licence
#    Examples:
#      |DrivingLicenceSubject          |InvalidValidToDay|InvalidValidToMonth|InvalidValidToYear|
#      |DrivingLicenceSubjectHappyPeter|         10      |     01            |         2010     |
#
#    ##### have to
#  @mock-api:dvlaWelsh @validation-regression
#  Scenario: Beta Banner Reject Analysis button
#    Given I view the Beta banner
#    When I select Gwrthod cwcis dadansoddi cookie
#    Then I see the Reject Analysis sentence Rydych wedi gwrthod cwcis ychwanegol. Gallwch newid eich gosodiadau cwcis unrhyw bryd.
#    And  I select the newid eich gosodiadau cwcis link
#    Then I check the page to change cookie preferences opens
#
#  @Language-regression
#  Scenario:3 options and Radio button available in Driving Licence page
#    Given I check the page title is Pwy wnaeth gyhoeddi eich trwydded yrru y DU? – Profi pwy ydych chi – GOV.UK
#    When I assert the URL is valid in Welsh
#    Then I can see a radio button titled “DVLA”
#    Then I can see a radio button titled “DVA”
#    And I can see a I do not have a UK driving licence radio button titled Nid oes gennyf drwydded yrru y DU
#    And I can see OR options as neu
#    Then I can see CTA as Parhau
#    And I see the licence Selection sentence starts with Gallwch ddod o hyd i hwn yn adran 4c o'ch trwydded yrru. Bydd naill ai'n dweud DVLA (Asiantaeth Trwyddedu Gyrru a Cherbydau) neu DVA (Asiantaeth Gyrrwyr a Cherbydau).
#
#  @Language-regression
#  Scenario:User Selects DVLA and landed in DVLA page and Validate the title and sentences
#    Given I click on DVLA radio button and Parhau
#    Then I check the page title is Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru – Profi pwy ydych chi – GOV.UK
#    And I see the heading Rhowch eich manylion yn union fel maent yn ymddangos ar eich trwydded yrru
#    And I see We will check your details as Byddwn yn gwirio eich manylion gydar DVLA i sicrhau nad yw eich trwydded yrru wedi cael ei chanslo na'i hadrodd fel un sydd ar goll neu wedi ei dwyn.
#    And I see sentence Os nad oes gennych drwydded yrru y DU neu os na allwch gofio'ch manylion, gallwch brofi pwy ydych chi mewn ffordd arall yn lle.
#
#  @Language-regression
#  Scenario Outline:Retry message
#    Given I click on DVLA radio button and Parhau
#    When User enters DVLA data as a <DrivingLicenceSubject>
#    Then User clicks on continue
#    And I can see Check your details as Gwiriwch bod eich manylion yn paru gyda beth sydd ar eich trwydded yrru y DU
#    Then I see error word as Gwall
#    And I see We could not find your details as Nid oeddem yn gallu dod o hyd i'ch manylion
#    And I see you will not be able to change your details as Ni fyddwch yn gallu newid eich manylion eto os byddwch yn gwneud camgymeriad.
#    And I see Check your details as Roedd yna broblem wrth i ni wirio eich manylion gyda'r DVLA.
#
#    Examples:
#      |DrivingLicenceSubject |
#      |IncorrectIssueNumber|
#
