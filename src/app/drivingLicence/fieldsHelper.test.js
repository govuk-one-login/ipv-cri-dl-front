const fields = require("./fieldsHelper");

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
    const licenceNo = "HARRI559146MJ931"
    const validator = fields.dvlaValidator.bind({
      values: {
        dob: "1956-09-14",
        licence: licenceNo
      },
    });

    expect(validator(1, "dob", "licence")).to.be.true;
  });

  it("should be false when licence number does not match DOB year", () => {
    const licenceNo = "HARRI559146MJ931"
    const validator = fields.dvlaValidator.bind({
      values: {
        dob: "1958-09-14",
        licence: licenceNo
      },
    });

    expect(validator(1, "dob", "licence")).to.be.false;
  });

  it("should be false when licence number does not match DOB month", () => {
    const licenceNo = "HARRI559146MJ931"
    const validator = fields.dvlaValidator.bind({
      values: {
        dob: "1956-10-14",
        licence: licenceNo
      },
    });

    expect(validator(1, "dob", "licence")).to.be.false;
  });

  it("should be false when licence number does not match DOB date", () => {
    const licenceNo = "HARRI559146MJ931"
    const validator = fields.dvlaValidator.bind({
      values: {
        dob: "1956-09-16",
        licence: licenceNo
      },
    });

    expect(validator(1, "dob", "licence")).to.be.false;
  });
});
