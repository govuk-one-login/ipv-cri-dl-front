const fields = require("./fieldsHelper");
const { validators } = require("hmpo-form-wizard/lib/validation");
const moment = require("moment");

describe("custom validation fields test", () => {
  it("should be false when first and middle name combined greater than 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjj",
        middleNames: "jjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.false;
  });

  it("should be true when first and middle name combined less or equal to 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjj",
        middleNames: "jjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.true;
  });

  it("should be false when firstname is only entered and is over 30 characters", () => {
    const validator = fields.firstNameMiddleNameLengthValidator.bind({
      values: {
        firstName: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
      },
    });

    expect(validator(1, 30, "firstName", "middleNames")).to.be.false;
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

describe("date validation test", () => {
  it("check before validation when date is in the past", () => {
    const result = validators.before(
      moment().subtract(1, "day").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });

  it("check before validation when date is today", () => {
    const result = validators.before(
      moment().format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check before validation when date is in the future", () => {
    const result = validators.before(
      moment().add(1, "day").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after validation when date is in the past", () => {
    const result = validators.after(
      moment().subtract(1, "day").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after validation when date is today", () => {
    const result = validators.after(
      moment().format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after validation when date is in the future", () => {
    const result = validators.after(
      moment().add(1, "day").format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });
});
