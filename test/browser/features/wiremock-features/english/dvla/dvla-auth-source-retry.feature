@QualityGateRegressionTest @QualityGateIntegrationTest
@mock-api:dl-dvla-auth-retry @auth-source-retry @DVLA
Feature: DVLA Driving licence - Auth Source retry response

  Background:
    Given Authenticatable Anita has started the Auth Source Driving Licence Journey
    And they have provided their details
    And I should be on the Driving Licence check your details page Check your UK photocard driving licence details – GOV.UK One Login

  Scenario: DVLA Auth Source - API returns retry but user bypasses details form
    When I click on the Yes radio button
    Then I click on the Confirm and Continue button
    And I should be on the DVLA consent page We need to check your driving licence details – GOV.UK One Login
    And I click on the DVLA consent checkbox
    When I click on the Continue button
    Then the user is redirected to the relying party callback
