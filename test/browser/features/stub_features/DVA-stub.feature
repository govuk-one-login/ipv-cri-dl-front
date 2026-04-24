@QualityGateSmokeTest @QualityGateRegressionTest @QualityGateIntegrationTest
Feature: Driving Licence CRI - DVA - IPV Core Stub - Happy Path Tests

    Background:
        Given I navigate to the IPV Core Stub
        And I click the Driving Licence CRI for the testEnvironment

    @stub-test
    Scenario Outline: Driving Licence CRI - DVA - IPV Core Stub - Happy Path - Run DVA Driving Licence Journey by userId <expectedGivenName> <expectedFamilyName>
        Given I search for user number <userId> in the ThirdParty table
        Then User is navigated to the Licence Issuer <page> Page
        Then I select the <licenceIssuer> radio button
        Then User clicks the driving licence continue button
        Then User enter data as a <drivingLicenceSubject>
        Then I click the <drivingLicenceConsent> consent checkbox
        Then User clicks the driving licence continue button
        Then User is navigated to the Verifiable Credential Issuers Page
        Then The VC contains the expected response for <expectedGivenName> <expectedFamilyName> with <expectedStrengthScoreMasked> <expectedValidityScoreMasked>
        Examples:
            | userId | page           | licenceIssuer | drivingLicenceSubject                | drivingLicenceConsent | expectedGivenName | expectedFamilyName | expectedStrengthScoreMasked | expectedValidityScoreMasked |
            | 197    | licence-issuer | DVA           | DVADrivingLicenceSubjectHappyKenneth | DVA                   | KENNETH           | DECERQUEIRA        | MASKED                      | MASKED                      |

    @stub-test
    Scenario Outline: Driving Licence CRI - DVA Auth Source - IPV Core Stub - Happy Path - Run DVA Auth Source Driving Licence Journey for userId <expectedGivenName> <expectedFamilyName>
        Given I provide the <contextValue> for Auth Source Journey
        Then I provide the raw JSON for <drivingLicenceSubjectRawJSON>
        And I click the Go to Driving Licence CRI button
        Then User is navigated to the Check Your Details <page> Page
        Then User selects the <confirmCorrectDetails> button to confirm their details are correct
        And I click the Confirm and Continue button
        Then User is navigated to the Consent <consentPage> Page
        Then I click the consent page <drivingLicenceConsent> checkbox
        Then I click the consent page continue button
        Then User is navigated to the Verifiable Credential Issuers Page
        Then The VC contains the expected response for <expectedGivenName> <expectedFamilyName> with <expectedStrengthScoreMasked> <expectedValidityScoreMasked>
        Examples:
            | contextValue  | drivingLicenceSubjectRawJSON  | page               | confirmCorrectDetails | consentPage | drivingLicenceConsent | expectedGivenName | expectedFamilyName | expectedStrengthScoreMasked | expectedValidityScoreMasked |
            | check_details | DVAAuthSourceValidJsonPayload | check-your-details | Yes                   | consent     | DVA                   | KENNETH           | DECERQUEIRA        | MASKED                      | MASKED                      |
