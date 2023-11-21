const fields = require("./fieldsHelper");
const moment = require("moment");

describe("custom validation fields test", () => {
  it("should be false when first and middle name combined is greater than 38 characters and issuer is DVLA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjj",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVLA")).to.be.false;
  });

  it("should be false when first and middle name combined is 38 characters plus extra character and issuer is DVLA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjj",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVLA")).to.be.false;
  });

  it("should be false when first and middle name combined is greater than 38 characters and issuer is DVA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjj",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVA")).to.be.false;
  });

  it("should be false when first and middle name combined is 38 characters plus extra character and issuer is DVA", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjj",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVA")).to.be.false;
  });

  it("should be true when first and middle name is 37 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjj",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVA")).to.be.true;
  });

  it("should be true when middle name is empty", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jj",
        middleNames: "",
      },
    });

    expect(validator(1, 38, "firstName", "middleNames", "DVA")).to.be.true;
  });

  it("should be true when middleName is only entered and is 18 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjkl",
      },
    });

    expect(validator(1, 18, "middleNames", "DVA")).to.be.true;
  });

  it("should be true when firstname is only entered and is 18 characters", () => {
    const validator = fields.firstNameLengthValidator.bind({
      values: {
        firstName: "asdfghjklasdfghjkl",
      },
    });

    expect(validator(1, 18, "firstName", "DVA")).to.be.true;
  });

  it("should be true when surname is 25 characters", () => {
    const validator = fields.surnameLengthValidator.bind({
      values: {
        surname: "asdfghjklasdfghjklasdfghj",
      },
    });

    expect(validator(1, 25, "surname", "DVA")).to.be.true;
  });

  it("should be false when middleName is only entered and is 19 characters", () => {
    const validator = fields.middleNamesLengthValidator.bind({
      values: {
        middleNames: "asdfghjklasdfghjkla",
      },
    });

    expect(validator(1, 18, "middleNames", "DVA")).to.be.false;
  });

  it("should be false when firstname is 19 characters", () => {
    const validator = fields.firstNameLengthValidator.bind({
      values: {
        firstName: "asdfghjklasdfghjkla",
      },
    });

    expect(validator(1, 18, "firstName", "DVA")).to.be.false;
  });

  it("should be false when surname is 26 characters", () => {
    const validator = fields.surnameLengthValidator.bind({
      values: {
        surname: "asdfghjklasdfghjklasdfghjk",
      },
    });

    expect(validator(1, 25, "surname", "DVA")).to.be.false;
  });

  it("should be true when licence number matches DOB", () => {
    const licenceNo = "HARRI509146J9L31";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "John",
        middleNames: "",
        surname: "Harris",
        dob: "1956-09-14",
        licence: licenceNo,
      },
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
        licence: licenceNo,
      },
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
        licence: licenceNo,
      },
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
        licence: licenceNo,
      },
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
        issueDate: issueDate,
      },
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
        issueDate: issueDate,
      },
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be true when licence issued is issued exactly 10 years ago", () => {
    const issueDate = moment().subtract(10, "years").format("YYYY-MM-DD");
    const validator = fields.beforeNow.bind({
      values: {
        issueDate: issueDate,
      },
    });

    expect(validator(issueDate, 10, "years")).to.be.true;
  });

  it("should be true when licence number does match DOB date kenneth", () => {
    const licenceNo = "DECER607085K99LN";
    const validator = fields.dvlaValidator.bind({
      values: {
        firstName: "KENNETH",
        middleNames: "",
        surname: "DECERQUEIRA",
        dob: "1965-07-08",
        licence: licenceNo,
      },
    });

    expect(
      validator(1, "firstName", "middleNames", "surname", "dob", "licence")
    ).to.be.true;
  });
});
