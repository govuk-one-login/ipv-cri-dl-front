@mock-api:dl-dva-auth-success @success @DVA
Feature: DVA Driving licence - Auth Source

  Background:
    Given Authenticatable Anita is using the system
    And they have provided their details
    When they have started the DL Auth Source journey

  @mock-api:dl-dva-auth-success @validation-regression @build @staging
  Scenario: DVA Auth Source - User navigates through the Auth Source Journey - Check Your Details Page
    And I should be on the Driving Licence check your details page Check your UK photocard driving licence details – Prove your identity – GOV.UK
    When I click on the Yes radio button
    Then I click on the Confirm and Continue button
    And I should be on the DVA consent page We need to check your driving licence details – Prove your identity – GOV.UK
    And I click on the DVA consent checkbox
    When I click on the Continue button

  @mock-api:dl-dva-auth-success @validation-regression @build @staging
  Scenario: DVA Auth Source - User selects No on the Check Your Details Page
    And I should be on the Driving Licence check your details page Check your UK photocard driving licence details – Prove your identity – GOV.UK
    When I click on the No radio button
    Then I click on the Confirm and Continue button

  @mock-api:dl-dva-auth-success @validation-regression @build @staging
  Scenario: DVA Auth Source - User fails to provide consent on the Consent Page
    And I should be on the Driving Licence check your details page Check your UK photocard driving licence details – Prove your identity – GOV.UK
    When I click on the Yes radio button
    Then I click on the Confirm and Continue button
    And I should be on the DVA consent page We need to check your driving licence details – Prove your identity – GOV.UK
    When I click on the Continue button
    Then I see the No Consent Error Text You must give your consent to continue
