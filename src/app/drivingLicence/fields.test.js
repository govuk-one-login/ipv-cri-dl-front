const validators = require("hmpo-form-wizard/lib/validation/validators");

describe("before date", () => {
  it("is in past", () => {
    const result = validators.before(
        "2023-07-01",
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.true;
  });

  it("is in future", () => {
    const result = validators.before(
        "2038-01-19",
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.false;
  });

  it("is today", () => {
    const result = validators.before(
      new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate()
        )
      )
        .toISOString()
        .split("T")[0],
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.false;
  });
});

describe("after date", () => {
  it("is in past", () => {
    const result = validators.after(
        "2023-07-01",
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.false;
  });

  it("is in future", () => {
    const result = validators.after(
        "2038-01-19",
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.true;
  });

  it("is today", () => {
    const result = validators.after(
      new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate()
        )
      )
        .toISOString()
        .split("T")[0],
        new Date(
          Date.UTC(
            new Date().getUTCFullYear(),
            new Date().getUTCMonth(),
            new Date().getUTCDate()
          )
        )
          .toISOString()
          .split("T")[0]
    );

    expect(result).to.be.false;
  });
});
