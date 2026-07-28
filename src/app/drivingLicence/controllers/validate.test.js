const BaseController = require("hmpo-form-wizard").Controller;
const ValidateController = require("./validate");

const SESSION_ID = "drivingLicence123";

const buildSessionModel = (req) => {
  req.sessionModel.set("drivingLicenceNumber", "SMITH9702105LN99");
  req.sessionModel.set("issueNumber", "12");
  req.sessionModel.set("postcode", "SW1 EQR");
  req.sessionModel.set("surname", "Smith");
  req.sessionModel.set("firstName", "Dan");
  req.sessionModel.set("middleNames", "Joe");
  req.sessionModel.set("dateOfBirth", "10/02/1975");
  req.sessionModel.set("expiryDate", "15/01/2035");
  req.sessionModel.set("issueDate", "10/02/2005");
  req.sessionModel.set("dateOfIssue", "10/02/2005");
  req.sessionModel.set("licenceIssuer", "DVLA");
};

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

    req.session.tokenId = SESSION_ID;
  });

  afterEach(() => sandbox.restore());

  it("should be an instance of BaseController", () => {
    expect(validate).to.be.an.instanceof(BaseController);
  });

  it("should POST API with session model data", async () => {
    buildSessionModel(req);

    const data = {
      retry: false
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
        licenceIssuer: "DVLA"
      },
      {
        headers: {
          session_id: SESSION_ID
        }
      }
    );
  });

  it("should add a document check routing header if a feature set has been set", async () => {
    buildSessionModel(req);
    req.session.featureSet = "direct";

    const data = {
      retry: false
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
        licenceIssuer: "DVLA"
      },
      {
        headers: {
          "document-checking-route": "direct",
          session_id: SESSION_ID
        }
      }
    );
  });

  it("should forward errors to the callback", async () => {
    buildSessionModel(req);

    const axiosError = new Error("self-destruct sequence initiated");
    axiosError.stack =
      "Error: self-destruct sequence initiated\n    at validate (test)"; // reduce noisy test output
    req.axios.post = sandbox.stub().rejects(axiosError);

    await validate.saveValues(req, res, next);

    expect(next).to.have.been.calledOnceWithExactly(axiosError);
  });

  it("should have showRetryMessage in sessionModel when api response 'retry' is true", async () => {
    buildSessionModel(req);

    const data = {
      retry: true
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    req.axios.post = sandbox.stub().returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.eq(true);
  });

  it("should not have showRetryMessage in sessionModel when api response 'retry' is false", async () => {
    buildSessionModel(req);

    const data = {
      retry: false
    };

    const resolvedPromise = new Promise((resolve) => resolve({ data }));
    req.axios.post = sandbox.stub().returns(resolvedPromise);

    await validate.saveValues(req, res, next);

    expect(req.sessionModel.get("showRetryMessage")).to.eq(undefined);
  });
});
