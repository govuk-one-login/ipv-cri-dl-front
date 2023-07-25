const fields = require("./fieldsHelper");
const validators = require("hmpo-form-wizard/lib/validation/validators");
const moment = require("moment");

const pastBst = moment.utc("2023-07-01T00:00:00.000+0100");
const todayBst = moment.utc("2023-07-02T00:00:00.000+0100");
const futureBst = moment.utc("2023-07-03T00:00:00.000+0100");

const pastUtc = moment.utc("2023-07-01T00:00:00.000Z");
const todayUtc = moment.utc("2023-07-02T00:00:00.000Z");
const futureUtc = moment.utc("2023-07-03T00:00:00.000Z");

const pastAbsBst = moment(fields.getToday()).subtract(1, "days").format("YYYY-MM-DD");
const todayAbsBst = fields.getToday();
const futureAbsBst = moment(fields.getToday()).add(1, "days").format("YYYY-MM-DD");

const pastAbsUtc = moment.utc(fields.getTodayUtc()).subtract(1, "days").format("YYYY-MM-DD");
const todayAbsUtc = fields.getTodayUtc();
const futureAbsUtc = moment.utc(fields.getTodayUtc()).add(1, "days").format("YYYY-MM-DD");

console.log(pastBst.toLocaleString());
console.log(todayBst.toLocaleString());
console.log(futureBst.toLocaleString());
console.log("");
console.log(pastUtc.toLocaleString());
console.log(todayUtc.toLocaleString());
console.log(futureUtc.toLocaleString());
console.log("");
console.log(pastAbsBst.toLocaleString());
console.log(todayAbsBst.toLocaleString());
console.log(futureAbsBst.toLocaleString());
console.log("");
console.log(pastAbsUtc.toLocaleString());
console.log(todayAbsUtc.toLocaleString());
console.log(futureAbsUtc.toLocaleString());

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

describe("get today - supplied date - BST", () => {
  it("check before - past", () => {
    const result = validators.before(
      pastBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });

  it("check before - today", () => {
    const result = validators.before(
      todayBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check before - future", () => {
    const result = validators.before(
      futureBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - past", () => {
    const result = validators.after(
      pastBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - today", () => {
    const result = validators.after(
      todayBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - future", () => {
    const result = validators.after(
      futureBst.format("YYYY-MM-DD"),
      todayBst.format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });
});

describe("get today - supplied date - UTC", () => {
  it("check before - past", () => {
    const result = validators.before(
      pastUtc.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });

  it("check before - today", () => {
    const result = validators.before(
      todayUtc.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check before - future", () => {
    const result = validators.before(
      futureUtc.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - past", () => {
    const result = validators.after(
      pastUtc.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - today", () => {
    const result = validators.after(
      todayBst.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.false;
  });

  it("check after - future", () => {
    const result = validators.after(
      futureUtc.format("YYYY-MM-DD"),
      todayUtc.format("YYYY-MM-DD")
    );

    expect(result).to.be.true;
  });
});

describe("get today - HMPO date - BST", () => {
  it("check before - past", () => {
    const result = validators.before(pastBst.format("YYYY-MM-DD"));

    expect(result).to.be.true;
  });

  it("check before - today", () => {
    const result = validators.before(todayAbsBst);

    expect(result).to.be.false;
  });

  it("check before - future", () => {
    const result = validators.before(futureAbsBst);

    expect(result).to.be.false;
  });

  it("check after - past", () => {
    const result = validators.after(pastAbsBst);

    expect(result).to.be.false;
  });

  it("check after - today", () => {
    const result = validators.after(todayAbsBst);

    expect(result).to.be.false;
  });

  it("check after - future", () => {
    const result = validators.after(futureAbsBst);

    expect(result).to.be.true;
  });
});

describe("get today - HMPO date - UTC", () => {
  it("check before - past", () => {
    const result = validators.before(pastAbsUtc);

    expect(result).to.be.true;
  });

  it("check before - today", () => {
    const result = validators.before(todayAbsUtc);

    expect(result).to.be.false;
  });

  it("check before - future", () => {
    const result = validators.before(futureAbsUtc);

    expect(result).to.be.false;
  });

  it("check after - past", () => {
    const result = validators.after(pastAbsUtc);

    expect(result).to.be.false;
  });

  it("check after - today", () => {
    const result = validators.after(todayAbsUtc);

    expect(result).to.be.false;
  });

  it("check after - future", () => {
    const result = validators.after(futureAbsUtc);

    expect(result).to.be.true;
  });
});
