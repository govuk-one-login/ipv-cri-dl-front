const BaseController = require("hmpo-form-wizard").Controller;
const ValidateController = require("./validate");

describe("validate controller", () => {
  const validate = new ValidateController({ route: "/test" });

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

    req.session.JWTData = { authParams: {}, user_id: "a-users-id" };
    req.session.id = "some-session-id";
  });
  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(validate).to.be.an.instanceof(BaseController);
  });

  it("should retrieve redirect url from cri-driving-permit-api and store in session", async () => {
    const sessionId = "drivingLicence123";

    req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
    req.sessionModel.set("issueNumber", "12");
    req.sessionModel.set("postcode", "SW1 EQR");
    req.session.tokenId = sessionId;
    req.sessionModel.set("surname", "Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.sessionModel.set("issueDate", "10/02/2005");
    req.sessionModel.set("dateOfIssue", "10/02/2005");
    req.sessionModel.set("licenceIssuer", "DVLA");

    const data = {
      redirectUrl:
        "https://client.example.com/cb?id=DrivingLicenceIssuer&code=1234",
      retry: false,
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    let stub = sandbox.stub(req.axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    sandbox.assert.calledWith(
      stub,
      "check-driving-licence",
      {
        drivingLicenceNumber: "SMITH9702105LN99",
        issueNumber: "12",
        postcode: "SW1 EQR",
        surname: "Smith",
        forenames: ["Dan", "Joe"],
        dateOfBirth: "10/02/1975",
        expiryDate: "15/01/2035",
        issueDate: "10/02/2005",
        licenceIssuer: "DVLA",
      },
      {
        headers: {
          session_id: sessionId,
        },
      }
    );

    expect(req.sessionModel.get("redirect_url")).to.eq(data.redirectUrl);
  });

  it("should set an error object in the session if redirect url is missing", async () => {
    req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
    req.sessionModel.set("issueNumber", "12");
    req.sessionModel.set("postcode", "SW1 EQR");
    req.sessionModel.set("surname", "Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.sessionModel.set("issueDate", "10/02/2005");
    req.sessionModel.set("licenceIssuer", "DVLA");

    const data = {
      redirectUrl: undefined,
      retry: false,
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(req.axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.error).to.eq("server_error");
    expect(sessionError.error_description).to.eq(
      "Failed to retrieve authorization redirect url"
    );
  });

  it("should save error in session when error caught from cri-back", async () => {
    req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
    req.sessionModel.set("issueNumber", "12");
    req.sessionModel.set("postcode:", "SW1 EQR");
    req.sessionModel.set("surname", "Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.sessionModel.set("issueDate", "10/02/2005");
    req.sessionModel.set("licenceIssuer", "DVLA");
    req.sessionModel.set("dateOfIssue", "10/02/2005");

    const testError = {
      name: "Test error name",
      response: {
        data: {
          code: "access_denied",
          error_description: "Permission denied to token endpoint",
        },
      },
    };
    const resolvedPromise = new Promise((resolve, error) => error(testError));
    sandbox.stub(req.axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    const sessionError = req.sessionModel.get("error");
    expect(sessionError.code).to.eq(testError.response.data.code);
    expect(sessionError.error_description).to.eq(
      testError.response.data.error_description
    );
  });

  it("should have showRetryMessage in sessionModel when api response 'retry' is true", async () => {
    req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
    req.sessionModel.set("issueNumber", "12");
    req.sessionModel.set("postcode:", "SW1 EQR");
    req.sessionModel.set("surname", "Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.sessionModel.set("issueDate", "10/02/2005");
    req.sessionModel.set("licenceIssuer", "DVLA");
    req.sessionModel.set("dateOfIssue", "10/02/2005");

    const data = {
      redirectUrl:
        "https://client.example.com/cb?id=DrivingLicenceIssuer&code=1234",
      retry: true,
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(req.axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.eq(true);
  });

  it("should not have showRetryMessage in sessionModel when api response 'retry' is false", async () => {
    req.sessionModel.set("drivingLicenceNumber:", "SMITH9702105LN99");
    req.sessionModel.set("issueNumber", "12");
    req.sessionModel.set("postcode:", "SW1 EQR");
    req.sessionModel.set("surname", "Smith");
    req.sessionModel.set("firstName", "Dan");
    req.sessionModel.set("middleNames", "Joe");
    req.sessionModel.set("dateOfBirth", "10/02/1975");
    req.sessionModel.set("expiryDate", "15/01/2035");
    req.sessionModel.set("issueDate", "10/02/2005");
    req.sessionModel.set("licenceIssuer", "DVLA");
    req.sessionModel.set("dateOfIssue", "10/02/2005");

    const data = {
      redirectUrl:
        "https://client.example.com/cb?id=DrivingLicenceIssuer&code=1234",
      retry: false,
    };
    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    sandbox.stub(req.axios, "post").returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.eq(undefined);
  });
});
