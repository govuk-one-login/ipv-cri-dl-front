const fields = require("./fieldsHelper");
const moment = require("moment");

describe("custom validation fields test", () => {
  it("should be false when first and middle name combined is greater than 38 characters and issuer is DVLA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjj",
        licenceIssuer: "DVLA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .false;
  });

  it("should be false when first and middle name combined is 38 characters plus extra character and issuer is DVLA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjj",
        licenceIssuer: "DVLA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .false;
  });

  it("should be false when first and middle name combined is greater than 38 characters and issuer is DVA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjj",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .false;
  });

  it("should be false when first and middle name combined is 38 characters plus extra character and issuer is DVA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjj",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .false;
  });

  it("should be true when first and middle name is 37 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjj",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .true;
  });

  it("should be true when middle name is empty", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jj",
        middleNames: "",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 38, "firstName", "middleNames", "licenceIssuer")).to.be
      .true;
  });

  it("should be false when undefined value is entered", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        surname: "undefinedFirstAndMiddleName"
      }
    });

    expect(validator(1, 25, "firstName")).to.be.false;
  });

  it("should be true when DVA middleName is only entered and is 18 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjkl",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 18, "middleNames", "licenceIssuer")).to.be.true;
  });

  it("should be false when DVA middleName is only entered and is 19 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjkla",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 18, "middleNames", "licenceIssuer")).to.be.false;
  });

  it("should be false when DVLA middleName is only entered and is 44 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjklaasdfghjklasdfghjklasdfghj",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 43, "middleNames", "licenceIssuer")).to.be.false;
  });

  it("should be true when DVLA middleName is only entered and is 43 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjklaasdfghjklasdfghjklasdfgh",
        licenceIssuer: "DVLA"
      }
    });

    expect(validator(1, 43, "middleNames", "licenceIssuer")).to.be.true;
  });

  it("should be true when firstname is only entered and is 18 characters", () => {
    const validator = fields.firstNameLengthValidator.bind({
      values: {
        firstName: "asdfghjklasdfghjkl",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 18, "firstName", "licenceIssuer")).to.be.true;
  });

  it("should be false when firstname is 19 characters", () => {
    const validator = fields.firstNameLengthValidator.bind({
      values: {
        firstName: "asdfghjklasdfghjkla",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 18, "firstName", "licenceIssuer")).to.be.false;
  });

  it("should be false when undefined value is entered", () => {
    const validator = fields.firstNameLengthValidator.bind({
      values: {
        middleName: "undefinedFirstName"
      }
    });

    expect(validator(1, 25, "firstName")).to.be.false;
  });

  it("should be true when surname is 25 characters", () => {
    const validator = fields.surnameLengthValidator.bind({
      values: {
        surname: "asdfghjklasdfghjklasdfghj",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 25, "surname", "licenceIssuer")).to.be.true;
  });

  it("should be false when surname is 26 characters", () => {
    const validator = fields.surnameLengthValidator.bind({
      values: {
        surname: "asdfghjklasdfghjklasdfghjk",
        licenceIssuer: "DVA"
      }
    });

    expect(validator(1, 25, "surname", "licenceIssuer")).to.be.false;
  });

  it("should be false when undefined value is entered", () => {
    const validator = fields.surnameLengthValidator.bind({
      values: {
        middleName: "undefinedSurname"
      }
    });

    expect(validator(1, 25, "surname")).to.be.false;
  });

  it("should be false when DVLALicenceNumber value is under 16 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "DECER607085KE9L",
        dvaLicenceNumber: "",
        licenceIssuer: "DVLA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.false;
  });

  it("should be false when DVLALicenceNumber value is over 16 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "DECER607085KE9LNY",
        dvaLicenceNumber: "",
        licenceIssuer: "DVLA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.false;
  });

  it("should be true when DVLALicenceNumber value is exactly 16 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "DECER607085KE9LN",
        dvaLicenceNumber: "",
        licenceIssuer: "DVLA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.true;
  });

  it("should be false when dvaLicenceNumber value is under 8 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "",
        dvaLicenceNumber: "1234567",
        licenceIssuer: "DVA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.false;
  });

  it("should be false when dvaLicenceNumber value is over 8 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "",
        dvaLicenceNumber: "123456789",
        licenceIssuer: "DVA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.false;
  });

  it("should be true when dvaLicenceNumber value is exactly 8 characters", () => {
    const validator = fields.licenceLengthValidator.bind({
      values: {
        drivingLicenceNumber: "",
        dvaLicenceNumber: "12345678",
        licenceIssuer: "DVA"
      }
    });

    expect(
      validator(
        1,
        16,
        "drivingLicenceNumber",
        "dvaLicenceNumber",
        "licenceIssuer"
      )
    ).to.be.true;
  });

  it("should be false when postcode is only entered and is over 8 characters", () => {
    const validator = fields.postCodeLengthValidator.bind({
      values: {
        postcode: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
      }
    });

    expect(validator(1, 8, "postcode")).to.be.false;
  });

  it("should be true when postcode is only entered and is under 8 characters", () => {
    const validator = fields.postCodeLengthValidator.bind({
      values: {
        postcode: "BA2 5AA"
      }
    });

    expect(validator(1, 8, "postcode")).to.be.true;
  });

  it("should be true when postcode is only entered and is exactly 7 characters", () => {
    const validator = fields.postCodeLengthValidator.bind({
      values: {
        postcode: "BA2 5AAA"
      }
    });

    expect(validator(1, 8, "postcode")).to.be.true;
  });

  it("should be false when undefined value is entered", () => {
    const validator = fields.postCodeLengthValidator.bind({
      values: {
        middleName: "undefinedPostcode"
      }
    });

    expect(validator(1, 8, "postcode")).to.be.false;
  });

  it("should be true when licence number matches DOB", () => {
    const licenceNo = "HARRI509146J9L31";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "John",
        middleNames: "",
        surname: "Harris",
        dob: "1956-09-14",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.true;
  });

  it("should be false when licence number does not match DOB year", () => {
    const licenceNo = "HARRI509146J9L31";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "john",
        middleNames: "",
        surname: "Harris",
        dob: "1958-09-14",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when licence number does not match DOB month", () => {
    const licenceNo = "HARRI509146J9L31";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "john",
        middleNames: "",
        surname: "Harris",
        dob: "1956-10-14",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when licence number does not match DOB date", () => {
    const licenceNo = "HARRI509146J9L31";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "john",
        middleNames: "",
        surname: "Harris",
        dob: "1956-09-16",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when licence issued greater than 10 years ago", () => {
    const issueDate = moment()
      .subtract(10, "years")
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    const validator = fields.beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.false;
  });

  it("should be true when licence issued less than 10 years ago", () => {
    const issueDate = moment()
      .subtract(10, "years")
      .add(1, "days")
      .format("YYYY-MM-DD");
    const validator = fields.beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be true when licence issued is issued exactly 10 years ago", () => {
    const issueDate = moment().subtract(10, "years").format("YYYY-MM-DD");
    const validator = fields.beforeNow.bind({
      values: {
        issueDate: issueDate
      }
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be false when No DOB", () => {
    const licenceNo = "DECER607085K99LN";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "KENNETH",
        middleNames: "",
        surname: "DECERQUEIRA",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when No firstName", () => {
    const licenceNo = "DECER607085K99LN";
    const validator = fields.dvlaValidator.bind({
      values: {
        middleNames: "",
        surname: "DECERQUEIRA",
        dob: "1965-07-08",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when No surname", () => {
    const licenceNo = "DECER607085K99LN";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "KENNETH",
        middleNames: "",
        dob: "1965-07-08",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be false when No licence", () => {
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "KENNETH",
        middleNames: "",
        surname: "DECERQUEIRA",
        dob: "1965-07-08"
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.false;
  });

  it("should be true when licence number does match DOB date kenneth", () => {
    const licenceNo = "DECER607085K99LN";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "KENNETH",
        middleNames: "",
        surname: "DECERQUEIRA",
        dob: "1965-07-08",
        licence: licenceNo
      }
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.true;
  });
});
