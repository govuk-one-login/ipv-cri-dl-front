const { personInfoSchema } = require("./person-info.schema");

const validResponse = () => ({
  name: [
    {
      nameParts: [
        { type: "GivenName", value: "KENNETH" },
        { type: "FamilyName", value: "DECERQUEIRA" }
      ]
    }
  ],
  birthDate: [{ value: "1965-07-08" }],
  address: [{ postalCode: "BA2 5AA" }],
  drivingPermit: [
    {
      personalNumber: "DOE99751010AL9OD",
      expiryDate: "2022-02-02",
      issueNumber: "13",
      issuedBy: "DVLA",
      issueDate: "2012-02-02",
      fullAddress: "8 HADLEY ROAD BATH BA2 5AA"
    }
  ]
});

describe("personInfoSchema", () => {
  describe("valid responses", () => {
    it("accepts a DVLA licence with one given name", () => {
      const result = personInfoSchema.safeParse(validResponse());
      expect(result.success).to.equal(true);
    });

    it("accepts a DVA licence without an issueNumber", () => {
      const body = validResponse();
      body.drivingPermit[0].issuedBy = "DVA";
      delete body.drivingPermit[0].issueNumber;

      const result = personInfoSchema.safeParse(body);
      expect(result.success).to.equal(true);
    });

    it("accepts multiple given names", () => {
      const body = validResponse();
      body.name[0].nameParts = [
        { type: "GivenName", value: "KENNETH" },
        { type: "GivenName", value: "MiddleName" },
        { type: "FamilyName", value: "DECERQUEIRA" }
      ];

      const result = personInfoSchema.safeParse(body);
      expect(result.success).to.equal(true);
    });
  });

  describe("invalid responses", () => {
    it("rejects when name is missing", () => {
      const body = validResponse();
      delete body.name;

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when name is an empty array", () => {
      const body = validResponse();
      body.name = [];

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when nameParts is empty", () => {
      const body = validResponse();
      body.name[0].nameParts = [];

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects a namePart type outside GivenName/FamilyName", () => {
      const body = validResponse();
      body.name[0].nameParts[0].type = "Title";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects a namePart with an empty value", () => {
      const body = validResponse();
      body.name[0].nameParts[0].value = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when birthDate is missing", () => {
      const body = validResponse();
      delete body.birthDate;

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when birthDate is an empty array", () => {
      const body = validResponse();
      body.birthDate = [];

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty birthDate value", () => {
      const body = validResponse();
      body.birthDate[0].value = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when address is missing", () => {
      const body = validResponse();
      delete body.address;

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when address is an empty array", () => {
      const body = validResponse();
      body.address = [];

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty postalCode", () => {
      const body = validResponse();
      body.address[0].postalCode = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when drivingPermit is missing", () => {
      const body = validResponse();
      delete body.drivingPermit;

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects when drivingPermit is an empty array", () => {
      const body = validResponse();
      body.drivingPermit = [];

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty personalNumber", () => {
      const body = validResponse();
      body.drivingPermit[0].personalNumber = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty expiryDate", () => {
      const body = validResponse();
      body.drivingPermit[0].expiryDate = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty issueDate", () => {
      const body = validResponse();
      body.drivingPermit[0].issueDate = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects an empty issuedBy", () => {
      const body = validResponse();
      body.drivingPermit[0].issuedBy = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects a DVLA licence without an issueNumber", () => {
      const body = validResponse();
      delete body.drivingPermit[0].issueNumber;

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });

    it("rejects a DVLA licence with an empty issueNumber", () => {
      const body = validResponse();
      body.drivingPermit[0].issueNumber = "";

      expect(personInfoSchema.safeParse(body).success).to.equal(false);
    });
  });
});
