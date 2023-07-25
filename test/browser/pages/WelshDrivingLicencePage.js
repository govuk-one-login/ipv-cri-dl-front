const { expect: expect } = require("chai");
const TestDataCreator = require("../util/TestDataCreator");

exports.WelshDrivingLicencePage = class PlaywrightDevPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:5030/details";

        this.lastNameWelsh = this.page.locator('xpath=//*[@id="surname-label"]');
        this.givenNameWelsh = this.page.locator('xpath=//*[@id="main-content"]/div/div/form/div[2]/fieldset/legend');
        this.firstName = this.page.locator('xpath=//*[@id="firstName-label"]');
        this.middleNames = this.page.locator('xpath=//*[@id="middleNames-label"]');
        this.firstNameSentence = this.page.locator('xpath=//*[@id="firstName-hint"]');
        this.middleNameSentence = this.page.locator('xpath=//*[@id="middleNames-hint"]')
   }

  isCurrentPage() {
    return this.page.url() === this.url;
  }

  async assertLastName(dvlaLastNameWelsh) {
      await this.page.waitForLoadState("domcontentloaded");
      expect(await this.isCurrentPage()).to.be.true;
      expect(await this.lastNameWelsh.innerText()).to.equal(dvlaLastNameWelsh);
    }

    async assertGivenName(dvlaGivenNameWelsh) {
        await this.page.waitForLoadState("domcontentloaded");
        expect(await this.isCurrentPage()).to.be.true;
        expect(await this.givenNameWelsh.innerText()).to.equal(
          dvlaGivenNameWelsh
        );
      }

    async assertFirstName(dvlaFirstNameWelsh) {
        await this.page.waitForLoadState("domcontentloaded");
        expect(await this.isCurrentPage()).to.be.true;
        expect(await this.firstName.innerText()).to.equal(
          dvlaFirstNameWelsh
        );
      }

      async assertMiddleName(dvlaMiddleNameWelsh) {
            await this.page.waitForLoadState("domcontentloaded");
            expect(await this.isCurrentPage()).to.be.true;
            expect(await this.middleNames.innerText()).to.equal(
              dvlaMiddleNameWelsh
            );
          }

      async assertFirstNameSentence(dvlaFirstNameSentWelsh) {
            await this.page.waitForLoadState("domcontentloaded");
            expect(await this.isCurrentPage()).to.be.true;
            expect(await this.firstNameSentence.innerText()).to.equal(
                  dvlaFirstNameSentWelsh
              );
          }

       async assertMiddleNameSentence(dvlaMiddleNameSentenceWelsh) {
            await this.page.waitForLoadState("domcontentloaded");
            expect(await this.isCurrentPage()).to.be.true;
            expect(await this.middleNameSentence.innerText()).to.equal(
              dvlaMiddleNameSentenceWelsh
            );
          }
};
