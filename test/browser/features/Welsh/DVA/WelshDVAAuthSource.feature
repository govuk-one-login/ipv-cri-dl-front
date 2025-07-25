@mock-api:dl-dva-auth-success @success @DVA
Feature: DVA Driving licence - Auth Source - Welsh Translation

    Background:
        Given Authenticatable Anita has started the Auth Source Driving Licence Journey
        And they have provided their details
        And I add a cookie to change the language to Welsh

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Check Your Answers Page
        And I should be on the Driving Licence check your details page Gwirio manylion eich trwydded yrru cerdyn-llun yn y DU – GOV.UK One Login

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Consent Page
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVA consent page Rydym angen gwirio manylion eich trwydded yrru – GOV.UK One Login
        And I click on the DVA consent checkbox
        When I click on the Continue button

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Beta Banner
        Given I view the BETA banner on the check your answers page
        And the beta banner on the check your answers page reads Mae hwn yn wasanaeth newydd. Helpwch ni i'w wella a rhoi eich adborth (agor mewn tab newydd).

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Footer Links and Text
        Given I see the check your answers accessibility statement link Datganiad hygyrchedd
        And I see the check your answers cookies link Cwcis
        And I see the check your answers terms and conditions link Telerau ac amodau
        And I see the check your answers privacy notice link Hysbysiad preifatrwydd
        And I see the check your answers support link Cymorth (agor mewn tab newydd)
        And I see the check your answers OLG link Trwydded Llywodraeth Agored v3.0
        And I see the check your answers crown copyright link © Hawlfraint y goron

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Details fields show correct text
        Given I can see the check details lastName as Enw olaf
        And I can see the check details givenNames as Enwau a roddwyd
        And I can see the check details dob as Dyddiad geni
        And I can see the check details issueDate as Dyddiad cyhoeddi
        And I can see the check details validTo as Yn ddilys tan
        And I can see the check details licenceNumber as Rhif trwydded
        And I can see the DVA check details postcode as Cod post

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Check your Answers Page Text
        Given I can see the DVA check details warning text as Gwnewch yn siŵr bod eich atebion yn gywir cyn i chi barhau.
        And I can see the check details driving licence details correct as A yw manylion eich trwydded yrru cerdyn-llun yn y DU yn gywir?
        And I can see the check details hint text as Gallwch geisio sganio'ch trwydded yrru eto neu brofi eich hunaniaeth mewn ffordd arall

    @mock-api:dl-dva-auth-success @language-regression
    Scenario: DVA Auth Source - Welsh Translation Tests - Consent Page Text
        When I click on the Yes radio button
        Then I click on the Confirm and Continue button
        And I should be on the DVA consent page Rydym angen gwirio manylion eich trwydded yrru – GOV.UK One Login
        And I can see the consent page title as Rydym angen gwirio manylion eich trwydded yrru gyda'r DVA
        And I can see the consent page text as Caniatau DVA i wirio eich manylion trwydded yrru
