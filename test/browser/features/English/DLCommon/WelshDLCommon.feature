@mock-api:dl-success @success @DVA
Feature: Driving licence CRI - Common Tests - Welsh Translation

    Background:
        Given Authenticatable Anita has started the Driving Licence Journey
        And they have provided their details
        And I add a cookie to change the language to Welsh

    @mock-api:driving-licence-PageHeading @language-regression
    Scenario: Driving Licence - Landing Page - Title and Text
        Given I should be on the Landing Page with Page Title A oedd eich trwydded yrru cerdyn-llun y DU wedi'i chyhoeddi gan DVLA neu DVA?
        And I see the Landing Page Title Summary Text Mae hwn i'w weld yn adran 4c o'ch trwydded yrru. Bydd naill ai’n dweud DVLA (Asiantaeth Trwyddedu Gyrru a Cherbydau) neu DVA (Asiantaeth Gyrwyr a Cherbydau).

    @mock-api:driving-licence-RadioButtons @language-regression
    Scenario: Driving Licence - Landing Page - Displays correct radio button options for DVA and DVLA
        Given I see the radio button for DVLA
        Then The DVLA Radio button label reads DVLA
        And The DVLA Hint text reads Trwyddedau gyrru a chyhoeddwyd yng Nghymru, Lloegr a'r Alban.
        And I see the radio button for DVA
        Then The DVA Radio button label reads DVA
        And The DVA Hint text reads Trwyddedau gyrru a chyhoeddwyd yng Ngogledd Iwerddon.
        And I see the radio button for I do not have a UK photocard driving licence
        Then The third Radio button label reads Nid oes gennyf drwydded yrru cerdyn-llun y DU

    @mock-api:driving-licence-InvalidRadioSelection @language-regression
    Scenario: Driving Licence - Landing Page - There is a problem error displays when no radio button is selected
        Given I click the continue button without selecting a radio button option
        Then I see the Error Text Mae problem
        And I see the Error Summary Text Mae'n rhaid i chi ddewis opsiwn i barhau
        And I see the Hint Error Summary Text Mae'n rhaid i chi ddewis opsiwn i barhau

    @mock-api:driving-licence-DropDownLink @language-regression
    Scenario: Driving Licence - Landing Page - Drop Down - 'Why we need to know this'
        Given I see the Drop Down link for Pam mae angen i ni wybod hyn
        And User clicks the Drop Down button
        Then I see the drop down text as Mae angen i ni sicrhau ein bod yn gwirio manylion eich trwydded yrru gyda'r sefydliad cywir.

    @mock-api:driving-licence-Cookies @language-regression
    Scenario: Driving Licence - User Clicks the Accept Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Accept Cookie Button
        Then I see the Cookie Banner Accept text as Rydych wedi derbyn cwcis ychwanegol. Gallwch newid eich gosodiadau cwcis unrhyw bryd.
        Then User clicks on the Accept Hide this message button

    @mock-api:driving-licence-Cookies @language-regression
    Scenario: Driving Licence - User Clicks the Reject Cookies on the Cookie Banner
        Given The cookie banner is displayed
        When User clicks on the Reject Cookie Button
        Then I see the Cookie Banner Reject text as Rydych wedi gwrthod cwcis ychwanegol. Gallwch newid eich gosodiadau cwcis unrhyw bryd.
        Then User clicks on the Reject Hide this message button

    @mock-api:driving-licence-BetaBanner @language-regression
    Scenario: Driving Licence - GOV.UK Beta Banner
        Given The beta banner is displayed
        And The beta banner reads Mae hwn yn wasanaeth newydd. Helpwch ni i'w wella a rhoi eich adborth (agor mewn tab newydd).

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Accessibility statement
        Given I see the Accessibility statement footer link with the text Datganiad hygyrchedd
        When User clicks the Accessibiliy statement Link
        And I check the Accessibiliy statement page Title Accessibility statement for GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Cookies
        Given I see the Cookies footer link with the text Cwcis
        When User clicks the Cookies Link
        And I check the Cookies page Title GOV.UK One Login cookies policy – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Terms and Conditions
        Given I see the Terms and conditions footer link with the text Telerau ac amodau
        When User clicks the Terms and conditions Link
        And I check the Terms and conditions page Title GOV.UK One Login terms and conditions – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Privacy Notice
        Given I see the Privacy notice footer link with the text Hysbysiad preifatrwydd
        When User clicks the Privacy notice Link
        And I check the Privacy notice page Title GOV.UK One Login privacy notice – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Support (opens in new tab)
        Given I see the Support footer link with the text Cymorth (agor mewn tab newydd)
        When User clicks the Support Link
        And I check the Support page Title Contact GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Crown Copyright
        Given I see the Crown Copyright footer link with the text © Hawlfraint y goron
        When User clicks the Crown Copyright Link
        And I check the Crown Copyright page Title Contact GOV.UK One Login – GOV.UK One Login

    @mock-api:driving-licence-PageFooter @language-regression
    Scenario: Driving Licence - Footer - Open Government Licence v3.0
        Given I see the OGL footer link with the text Mae'r holl gynnwys ar gael o dan Trwydded Llywodraeth Agored v3.0, oni nodir yn wahanol
        When User clicks the OGL Link
        And I check the OGL page Title Open Government Licence for public sector information

    @mock-api:DVA-success-ErrorPageSupportLinks @language-regression
    Scenario: Driving Licence - Error Page - Contact GOV.UK One Login Link
        Then I delete the session cookie
        And I refresh the page
        Then I see the error page heading Mae'n ddrwg gennym, mae problem
        And I see the Contact the One Login team link which reads Cysylltu â thîm GOV.UK One Login (agor mewn tab newydd)
        And I assert the link on the error page is correct and live
