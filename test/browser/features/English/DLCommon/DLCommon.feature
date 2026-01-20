@QualityGateRegressionTest @QualityGateIntegrationTest
@mock-api:dl-success @success
Feature: Driving licence CRI - Common Tests

    Background:
        Given Authenticatable Anita has started the Driving Licence Journey
        And they have provided their details

    @mock-api:driving-licence-PageHeading @validation-regression
    Scenario: Driving Licence - Landing Page - Title and Text
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        And I see the Landing Page Title Summary Text You can find this in section 4c of your driving licence. It will either say DVLA (Driver and Vehicle Licensing Agency) or DVA (Driver and Vehicle Agency).

    @mock-api:driving-licence-RadioButtons @validation-regression
    Scenario: Driving Licence - Landing Page - Skip to Main Content
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        Then I see the Skip to main content Link Text

    @mock-api:driving-licence-RadioButtons @validation-regression
    Scenario: Driving Licence - Landing Page - Displays correct radio button options for DVA and DVLA
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
    Scenario: Driving Licence - Landing Page - Drop Down - 'Why we need to know this'
        Given I see the Drop Down link for Why we need to know this
        And User clicks the Drop Down button
        Then I see the drop down text as We need to make sure we check your driving licence details with the right organisation.

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the Accept Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Accept Cookie Button
        Then I see the Cookie Banner Accept text as You've accepted additional cookies. You can change your cookie settings at any time.
        Then User clicks on the Accept Hide this message button

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the Reject Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Reject Cookie Button
        Then I see the Cookie Banner Reject text as You've rejected additional cookies. You can change your cookie settings at any time.
        Then User clicks on the Reject Hide this message button

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the View Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the View Cookies Link
        And I check the Cookies page Title GOV.UK One Login cookies policy

    @mock-api:driving-licence-Cookies @validation-regression
    Scenario: Driving Licence - User Clicks the change your cookie settings after Accepting Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Accept Cookie Button
        Then User click the change your cookie settings link
        And I check the Cookies page Title GOV.UK One Login cookies policy

    @mock-api:driving-licence-BetaBanner @validation-regression
    Scenario Outline: Driving Licence - GOV.UK Beta Banner
        Given The beta banner is displayed
        And The beta banner reads This is a new service. Help us improve it and give your feedback (opens in a new tab).
        Then I assert the feedback URL <expectedPageUrl> is correct and live
        Examples:
            | expectedPageUrl                          |
            | https://signin.account.gov.uk/contact-us |


    @mock-api:driving-licence-PageHeading @validation-regression
    Scenario: Driving Licence - Header - GOV.UK Link
        Given I see the GOV.UK header link with the text GOV.UK
        When User clicks the GOV.UK Link
        And I check the GOV.UK page Title GOV.UK

    @mock-api:driving-licence-PageFooter @validation-regression
    Scenario Outline: Fraud CRI - Footer Links
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        Then they click Footer <link> and assert I have been redirected correctly
        Examples:
            | link           |
            | Accessibility  |
            | Cookies        |
            | TsAndCs        |
            | Privacy        |
            | Support        |
            | OGL            |
            | CrownCopyright |

    @mock-api:driving-licence-PageCookies @cookies
    Scenario Outline: Driving Licence - Cookies - Device Intelligence
        Given I see the Device Intelligence Cookie <DeviceIntelligenceCookieName>
        Examples:
            | DeviceIntelligenceCookieName |
            | di-device-intelligence       |

    @QualityGateAccessibilityTest
    @mock-api:driving-licence-Accessibility @accessibility
    Scenario: Driving Licence - Axe Accessibility Scan - DL Landing Page
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        And I run the Axe Accessibility check against the DL Landing page

    @mock-api:driving-licence-ErrorPageSupportLinks
    Scenario: Driving Licence - Error Page - Contact GOV.UK One Login Link
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        And I delete the session cookie
        And User clicks continue on the licence issuer page
        Then they should see an error page
        And I see the Contact the One Login team link which reads Contact the GOV.UK One Login team (opens in a new tab)
        Then I assert the link on the error page is correct and live

    @mock-api:driving-licence-PageNotFoundSupportLinks
    Scenario: Driving Licence - Page Not Found - Contact GOV.UK One Login Link
        Given I should be on the Landing Page with Page Title Was your UK photocard driving licence issued by DVLA or DVA?
        Then I go to the page not found URL
        Then I assert the link on the page not found page is correct and live
