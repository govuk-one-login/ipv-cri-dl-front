@mock-api:dl-success @success @DVA
Feature: Driving licence CRI - Common Tests

    Background:
        Given Authenticatable Anita is using the system
        And they have provided their details
        And they have started the DL journey

    @mock-api:driving-licence-PageHeading @validation-regression
    Scenario: Driving Licence - Landing Page Title and Text
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        And I see the Landing Page Title Summary Text You can find this in section 4c of your driving licence. It will either say DVLA (Driving and vehicle Licensing Agency) or DVA (Driver and Vehicle Agency).

    @mock-api:driving-licence-RadioButtons @validation-regression
    Scenario: Driving Licence - Landing Page displays correct radio button options for DVA and DVLA
        Given I see the radio button for DVLA
        Then The DVLA Radio button label reads DVLA
        And The DVLA Hint text reads Driving licences issued in England, Scotland and Wales.
        And I see the radio button for DVA
        Then The DVA Radio button label reads DVA
        And The DVA Hint text reads Driving licences issued in Northern Ireland.
        And I see the radio button for I do not have a UK photocard driving licence
        Then The third Radio button label reads I do not have a UK photocard driving licence

    @mock-api:driving-licence-InvalidRadioSelection @validation-regression
    Scenario: Driving Licence - Landing Page - There is a problem error displays when no radio button is selected
        Given I click the continue button without selecting a radio button option
        Then I see the Error Text There is a problem
        And I see the Error Summary Text You must choose an option to continue
        And I see the Hint Error Summary Text You must choose an option to continue

    @mock-api:driving-licence-DropDownLink @validation-regression
    Scenario: Driving Licence - Landing Page Drop Down - 'Why we need to know this'
        Given I see the Drop Down link for Why we need to know this
        And User clicks the Drop Down button
        Then I see the drop down text as We need to make sure we check your driving licence details with the right organisation.

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the Accept Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Accept Cookie Button
        Then I see the Cookie Banner Accept text as You’ve accepted additional cookies. You can change your cookie settings at any time.
        Then User clicks on the Accept Hide this message button

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the Reject Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Reject Cookie Button
        Then I see the Cookie Banner Reject text as You’ve rejected additional cookies. You can change your cookie settings at any time.
        Then User clicks on the Reject Hide this message button

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the View Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the View Cookies Link
        And I check the Cookies page Title GOV.UK One Login cookies policy – GOV.UK One Login

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the change your cookie settings after Accepting Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Accept Cookie Button
        Then User click the change your cookie settings link
        And I check the Cookies page Title GOV.UK One Login cookies policy – GOV.UK One Login

    @mock-api:driving-licence-BetaBanner @validation-regression
    Scenario: Driving Licence - GOV.UK Beta Banner
        Given The beta banner is displayed
        And The beta banner reads This is a new service – your feedback (opens in new tab) will help us to improve it.
        When User clicks on the Feedback Link
        And I check the Feedback page Title Contact GOV.UK One Login

    @mock-api:driving-licence-PageHeading @validation-regression
    Scenario: Driving Licence - Header - GOV.UK Link
        Given I see the GOV.UK footer link with the text GOV.UK
        When User clicks the GOV.UK Link
        And I check the GOV.UK page Title GOV.UK

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Accessibility statement
        Given I see the Accessibility statement footer link with the text Accessibility statement
        When User clicks the Accessibiliy statement Link
        And I check the Accessibiliy statement page Title Accessibility statement for GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Cookies
        Given I see the Cookies footer link with the text Cookies
        When User clicks the Cookies Link
        And I check the Cookies page Title GOV.UK One Login cookies policy – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Terms and Conditions
        Given I see the Terms and conditions footer link with the text Terms and conditions
        When User clicks the Terms and conditions Link
        And I check the Terms and conditions page Title GOV.UK One Login terms and conditions – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Privacy Notice
        Given I see the Privacy notice footer link with the text Privacy notice
        When User clicks the Privacy notice Link
        And I check the Privacy notice page Title GOV.UK One Login privacy notice – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Support (opens in new tab)
        Given I see the Support footer link with the text Support (opens in new tab)
        When User clicks the Support Link
        And I check the Support page Title Contact GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Crown Copyright
        Given I see the Crown Copyright footer link with the text © Crown copyright
        When User clicks the Crown Copyright Link
        And I check the Crown Copyright page Title Contact GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario: Driving Licence - Footer - Open Government Licence v3.0
        Given I see the OGL footer link with the text All content is available under the Open Government Licence v3.0, except where otherwise stated.
        When User clicks the OGL Link
        And I check the OGL page Title Open Government Licence for public sector information

    @mock-api:driving-licence-PageCookies @validation-regression
    Scenario: Driving Licence - Cookies - Device Intelligence
        Given I see the Device Intelligence Cookie <DeviceIntelligenceCookieName>
        Examples:
            | DeviceIntelligenceCookieName |
            | di-device-intelligence       |

    @mock-api:driving-licence-Accessibility @validation-regression
    Scenario: Driving Licence - Axe Accessibility Scan - DL Landing Page
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        And I run the Axe Accessibility check against the DL Landing page
