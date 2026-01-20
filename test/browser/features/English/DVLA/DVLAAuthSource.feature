@QualityGateRegressionTest @QualityGateIntegrationTest
@mock-api:dl-dvla-auth-success @success @DVLA
Feature: DVLA Driving licence - Auth Source

    Background:
        Given Authenticatable Anita has started the Auth Source Driving Licence Journey
        And they have provided their details
        And I should be on the Driving Licence check your details page Check your UK photocard driving licence details – GOV.UK One Login

    @mock-api:dl-dvla-auth-success @validation-regression
    Scenario: DVLA Auth Source - User navigates through the Auth Source Journey - Check Your Details Page
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVLA consent page We need to check your driving licence details – GOV.UK One Login
        And I click on the DVLA consent checkbox
        When I click on the Continue button

    @mock-api:dl-dvla-auth-success @validation-regression
    Scenario: DVLA Auth Source - User selects No on the Check Your Details Page
        When I click on the No radio button
        Then I click on the Confirm and Continue button

    @mock-api:dl-dvla-auth-success @validation-regression
    Scenario: DVLA Auth Source - User fails to provide consent on the Consent Page
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVLA consent page We need to check your driving licence details – GOV.UK One Login
        When I click on the Continue button
        Then I see the No Consent Error Text You must give your consent to continue

    @mock-api:dl-dvla-auth-success @validation-regression
    Scenario: DVLA Auth Source - Formatting Tests - Date fields format values correctly
        Given I can see the check details formatted dob value as 08 07 1965
        And I can see the check details formatted issueDate value as 22 08 2023
        And I can see the check details formatted validTo value as 27 04 2025

    @mock-api:dl-dvla-auth-success @validation-regression
    Scenario: DVLA Auth Source - User clicks the back button
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVLA consent page We need to check your driving licence details – GOV.UK One Login
        Then I see the back button on the DVLA check your details page with text Back
        And User clicks the back button
        Then I should be on the Driving Licence check your details page Check your UK photocard driving licence details – GOV.UK One Login

    @QualityGateAccessibilityTest
    @mock-api:dl-dvla-auth-success @validation-regression @accessibility
    Scenario: DVLA Auth Source - Axe Accessibility Scan - Driving Licence Check Your Details Page
        Then I run the Axe Accessibility check against the Driving Licence check your details page

    @QualityGateAccessibilityTest
    @mock-api:dl-dvla-auth-success @validation-regression @accessibility
    Scenario: DVLA Auth Source - Axe Accessibility Scan - Driving Licence - Consent Page
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVA consent page We need to check your driving licence details – GOV.UK One Login
        And I run the Axe Accessibility check against the Driving Licence Consent page

    @mock-api:dl-dvla-auth-success @console-error-checks
    Scenario: DVLA Auth Source - User navigates through the Auth Source Journey - Check for Console Errors
        When I click on the Yes radio button
        And User starts the Console Listener
        Then I click on the Confirm and Continue button
        Then There are no console errors on the page
        And I should be on the DVLA consent page We need to check your driving licence details – GOV.UK One Login
        And I click on the DVLA consent checkbox
        When I click on the Continue button
