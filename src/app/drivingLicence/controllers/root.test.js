const RootController = require("./root");
const { Controller: BaseController } = require("hmpo-form-wizard");
let personInfoApiResponse = {
  data: {
    name: [
      {
        nameParts: [
          { type: "GivenName", value: "KENNETH" },
          { type: "FamilyName", value: "DECERQUEIRA" }
        ]
      }
    ],
    birthDate: [{ value: "1965-07-08" }],
    address: [
      {
        postalCode: "BA2 5AA"
      }
    ],
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
  }
};

describe("root controller", () => {
  const root = new RootController({ route: "/test" });
  let req;
  let res;
  let next;
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    const setup = setupDefaultMocks();
    req = setup.req;
    res = setup.res;
    next = setup.next;

    process.env.AUTH_SOURCE_ENABLED = "false";
    next = sinon.fake();
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(root).to.be.an.instanceof(BaseController);
  });

  it("should updated SessionModel when middleName is Present", async () => {
    process.env.AUTH_SOURCE_ENABLED = "true";

    personInfoApiResponse = {
      data: {
        name: [
          {
            nameParts: [
              { type: "GivenName", value: "KENNETH" },
              { type: "GivenName", value: "MiddleName" },
              { type: "FamilyName", value: "DECERQUEIRA" }
            ]
          }
        ],
        birthDate: [{ value: "1965-07-08" }],
        address: [
          {
            postalCode: "BA2 5AA"
          }
        ],
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
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );
    sandbox.stub(req.axios, "get").returns(resolvedPromise);

    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].personalNumber
    );
    expect(req.sessionModel.get("expiryDate")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].expiryDate
    );
    expect(req.sessionModel.get("issueDate")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issueDate
    );
    expect(req.sessionModel.get("licenceIssuer")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issuedBy
    );
    expect(req.sessionModel.get("postcode")).to.equal(
      personInfoApiResponse.data.address[0].postalCode
    );
    expect(req.sessionModel.get("issueNumber")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issueNumber
    );
    expect(req.sessionModel.get("firstName")).to.equal(
      personInfoApiResponse.data.name[0].nameParts[0].value
    );
    expect(req.sessionModel.get("middleNames")).to.equal(
      personInfoApiResponse.data.name[0].nameParts[1].value
    );
    expect(req.sessionModel.get("surname")).to.equal(
      personInfoApiResponse.data.name[0].nameParts[2].value
    );
    expect(req.sessionModel.get("dateOfBirth")).to.equal(
      personInfoApiResponse.data.birthDate[0].value
    );
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(true);
  });

  it("should retrieve shared_claims from session and store it in the sessionModel", async () => {
    personInfoApiResponse = {
      data: {
        name: [
          {
            nameParts: [
              { type: "GivenName", value: "KENNETH" },
              { type: "FamilyName", value: "DECERQUEIRA" }
            ]
          }
        ],
        birthDate: [{ value: "1965-07-08" }],
        address: [
          {
            postalCode: "BA2 5AA"
          }
        ],
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
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );
    sandbox.stub(req.axios, "get").returns(resolvedPromise);

    process.env.AUTH_SOURCE_ENABLED = "true";

    await root.saveValues(req, res, next);

    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(true);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].personalNumber
    );
    expect(req.sessionModel.get("expiryDate")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].expiryDate
    );
    expect(req.sessionModel.get("issueDate")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issueDate
    );
    expect(req.sessionModel.get("licenceIssuer")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issuedBy
    );
    expect(req.sessionModel.get("postcode")).to.equal(
      personInfoApiResponse.data.address[0].postalCode
    );
    expect(req.sessionModel.get("issueNumber")).to.equal(
      personInfoApiResponse.data.drivingPermit[0].issueNumber
    );
    expect(req.sessionModel.get("firstName")).to.equal(
      personInfoApiResponse.data.name[0].nameParts[0].value
    );
    expect(req.sessionModel.get("surname")).to.equal(
      personInfoApiResponse.data.name[0].nameParts[1].value
    );
    expect(req.sessionModel.get("dateOfBirth")).to.equal(
      personInfoApiResponse.data.birthDate[0].value
    );
  });

  it("should not update sessionModel if personInfo response is empty", async () => {
    personInfoApiResponse = {};

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );

    sandbox.stub(req.axios, "get").returns(resolvedPromise);
    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });

  it("should not update sessionModel if personInfo response is empty", async () => {
    personInfoApiResponse = {
      data: {
        name: [
          {
            nameParts: []
          }
        ],
        address: [],
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
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );

    sandbox.stub(req.axios, "get").returns(resolvedPromise);
    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });

  it("should not update sessionModel if personInfo response is empty", async () => {
    personInfoApiResponse = {
      data: {
        name: [
          {
            nameParts: []
          }
        ],
        birthDate: [],
        address: [],
        drivingPermit: []
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );

    sandbox.stub(req.axios, "get").returns(resolvedPromise);
    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });

  it("should not update sessionModel if personInfo response is empty", async () => {
    personInfoApiResponse = {
      data: {
        birthDate: [],
        drivingPermit: []
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );

    sandbox.stub(req.axios, "get").returns(resolvedPromise);
    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });

  it("should retrieve shared_claims from session and store it in the sessionModel", async () => {
    personInfoApiResponse = {
      data: {
        name: [
          {
            nameParts: []
          }
        ],
        birthDate: [{ value: "1965-07-08" }],
        address: [
          {
            postalCode: "BA2 5AA"
          }
        ],
        drivingPermit: [
          {
            personalNumber: "DOE99751010AL9OD",
            expiryDate: "2022-02-02",
            issueNumber: "13",
            issuedBy: "DVA",
            issueDate: "2012-02-02",
            fullAddress: "8 HADLEY ROAD BATH BA2 5AA"
          }
        ]
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );
    sandbox.stub(req.axios, "get").returns(resolvedPromise);

    process.env.AUTH_SOURCE_ENABLED = "true";

    await root.saveValues(req, res, next);

    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });

  it("should not update sessionModel if personInfo response is empty", async () => {
    personInfoApiResponse = {
      data: {
        name: [],
        birthDate: undefined,
        address: [
          {
            postalCode: "BA2 5AA"
          }
        ],
        drivingPermit: [
          {
            personalNumber: "",
            expiryDate: "2022-02-02",
            issueNumber: "13",
            issuedBy: "DVLA",
            issueDate: "2012-02-02",
            fullAddress: "8 HADLEY ROAD BATH BA2 5AA"
          }
        ]
      }
    };

    const resolvedPromise = new Promise((resolve) =>
      resolve(personInfoApiResponse)
    );

    sandbox.stub(req.axios, "get").returns(resolvedPromise);
    await root.saveValues(req, res, next);
    expect(req.sessionModel.get("isAuthSourceRoute")).to.equal(false);
    expect(req.sessionModel.get("drivingLicenceNumber")).to.equal(undefined);
    expect(req.sessionModel.get("expiryDate")).to.equal(undefined);
    expect(req.sessionModel.get("issueDate")).to.equal(undefined);
    expect(req.sessionModel.get("licenceIssuer")).to.equal(undefined);
    expect(req.sessionModel.get("postcode")).to.equal(undefined);
    expect(req.sessionModel.get("issueNumber")).to.equal(undefined);
    expect(req.sessionModel.get("firstName")).to.equal(undefined);
    expect(req.sessionModel.get("surname")).to.equal(undefined);
    expect(req.sessionModel.get("dateOfBirth")).to.equal(undefined);
  });
});
